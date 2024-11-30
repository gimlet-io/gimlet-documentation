---
title: The Redis and PostgreSQL Megapost
date: '2024-11-30'
description: |
  Learn everything about deploying Redis and PostgreSQL alongside your app.
---

Right after someone deploys their first application with Gimlet comes the question of how to deploy a Redis next to the app?

In this post I am going to walk you through
- how to deploy a containerized Redis next to your app,
- how to deploy a containerized PostgreSQL next to your application,
- and examine the pros and cons of this approach.
- Plus, I am going to introduce the concept of a multi-tenant PostgreSQL deployment and taking a peak into platform engineering.

## How to deploy a containerized Redis next to your app?

### Step #1 - Start with deploying a default app

This will give you a Gimlet manifest file that you can modify to your needs, eg.: deploying a Redis container.

- Navigate to your application repository in Gimlet
- Click *New Deployment..*
- Set *Name* as redis
- Add an secret under *Encrypted Secrets*
  - Set `redis-password` as key
  - Set a strong password as value. Make a not of this password
  - Hit *Encrypt* 
  - `openssl rand -hex 20` is a command I often use to generate passwords
- Leave everything else on default
- Push *Deploy*, and after the confetti *Write Configuration to Git* 

This creates a Gimlet manifest file in your source codde repository under the `.gimlet/` folder.

You will edit this file by hand to make it a Redis container.

### Gimlet Manifest intro

Even though you can create deployments on the Gimlet UI, everything you do is captured into a yaml file stored under the `.gimlet/` path in your application repository, called the Gimlet manifest file. You create one manifest file per application deployed in an environment.

This is how it looks normally, when you deploy Gimlet's web application template with default settings, plus the `redis-password` secret you set, but it does not support Redis as of yet.

```diff
app: redis
env: lasting-frost
namespace: default
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.70.0
values:
  gitRepository: laszlocph/streamlit-app
  gitSha: '{{ .SHA }}'
  image:
    registry: public
    strategy: static
    repository: nginx
    tag: "1.27"
  ingress:
    annotations:
      cert-manager.io/cluster-issuer: letsencrypt
      kubernetes.io/ingress.class: nginx
    host: laszlocph-streamlit-app-eyujopnt.gimlet.app
    tlsEnabled: true
  resources:
    ignoreLimits: true
  sealedSecrets:
    redis-password: AgADJwpDBgGxxxxxxxxxxxxxxx
```

### Step #2 - Extending Gimlet Manifest with Redis

The default deployment uses a web-application template (the `chart` field). It takes a container image (`values.image`) and deploys it on an URL (`values.ingress.host`).

For Redis you are going to use an open-source template, the Bitnami Redis Helm chart. To do that, do a cleanup first in the Gimlet manifest, and use the `manifests` field to break out of the usual paradigms Gimlet uses, and deploy plain kubernetes resources.

```diff
app: redis
env: tidy-field
namespace: default
-chart:
-  repository: https://chart.onechart.dev
-  name: onechart
-  version: 0.70.0
-values:
-  gitRepository: laszlocph/streamlit-app
-  gitSha: '{{ .SHA }}'
-  image:
-    registry: public
-    strategy: static
-    repository: nginx
-    tag: "1.27"
-  ingress:
-    annotations:
-      cert-manager.io/cluster-issuer: letsencrypt
-      kubernetes.io/ingress.class: nginx
-    host: laszlocph-streamlit-app-eyujopnt.gimlet.app
-    tlsEnabled: true
-  resources:
-    ignoreLimits: true
-  sealedSecrets:
-    redis-password: AgADJwpDBgGxxxxxxxxxxxxxxx
+manifests: |
+  ---
+  apiVersion: source.toolkit.fluxcd.io/v1
+  kind: HelmRepository
+  metadata:
+    name: bitnami
+    namespace: default
+  spec:
+    interval: 60m
+    url: https://charts.bitnami.com/bitnami
+  ---
+  apiVersion: helm.toolkit.fluxcd.io/v2
+  kind: HelmRelease
+  metadata:
+    name: redis
+    namespace: default
+  spec:
+    interval: 60m
+    releaseName: redis
+    chart:
+      spec:
+        chart: redis
+        version: 20.1.3
+        sourceRef:
+          kind: HelmRepository
+          name: bitnami
+        interval: 10m
+    values:
+      architecture: standalone
+      #Uncomment the next 3 lines if you want your Redis to be highly available
+      #architecture: replication
+      #replica:
+      #  replicaCount: 1
+      auth:
+        existingSecret: redis
+      commonConfiguration: |-
+        # Enable AOF https://redis.io/topics/persistence#append-only-file
+        appendonly yes
+        # Disable RDB persistence, AOF persistence already enabled.
+        save ""
+        # https://redis.io/docs/latest/operate/oss_and_stack/management/config/#configuring-redis-as-a-cache
+        maxmemory 100mb
+      master:
+        persistence:
+          enabled: false
+          #Uncomment the following two lines to enable persistence 
+          #enabled: true
+          #size: 1Gi
+        resources:
+          limits:
+            memory: 128Mi
+            cpu: 250m
+          requests:
+            memory: 128Mi
+            cpu: 10m
+  ---
+  apiVersion: bitnami.com/v1alpha1
+  kind: SealedSecret
+  metadata:
+    name: redis
+    namespace: default
+    annotations:
+      sealedsecrets.bitnami.com/cluster-wide: "true"
+  spec:
+    encryptedData:
+      redis-password: AgADJwpDBgGxxxxxxxxxxxxxxx
+    template:
+      metadata:
+        name: redis
+        namespace: default
```

It is quite a yaml file. The full power of Kubernetes is at your fingertips if you use the `manifests` field, but that also comes with the excess configuration need compared to the built in web-application template.

But essentially, you create three Kubernetes resources above:

- a `HelmRepository`
- a `HelmRelease`
- and a `SealedSecret`.

The `HelmRepository` resource is a mapping of the `https://charts.bitnami.com/bitnami` chart location to Kubernetes. If you are familiar with Helm, it correspondes to the `helm repo add` command.

The `HelmRelease` resource is the deployment parameters of the Helm chart template. If you are familiar with Helm, it correspondes to the `helm install` command. The `spec.values` field is where you do all Redis specific configuration. I provided a set of defaults, but you can configure it to your needs following the [chart documentation](https://artifacthub.io/packages/helm/bitnami/redis).

The `SealedSecret` resource is an encrypted representation of the password you made note in Step 1) of this blog post. Notice that `spec.encryptedData.redis-password` is the same value as the one you deleted in `values.sealedSecrets.redis-password`. Make sure to copy over the encrypted value.

