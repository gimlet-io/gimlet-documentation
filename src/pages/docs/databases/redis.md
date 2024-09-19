---
title: Redis
description: This page shows you how you can deploy and run a Redis next to your application.
---

We all like Redis alongside our applications. This page shows how you can deploy and run a Redis next to your application.

## Deploy a Redis next to your app

The Redis instance will be dedicated to your application, and this guide assumes that Redis is used as a pure in-memory cache, without persistence. You may enable persistence to make keys survive restarts.

## Gimlet Manifest

To deploy Redis, you are going to add manifests to your application's Gimlet manifest.

{% callout %}
- You can find an introduction to the Gimlet Manifest [here](/docs/deployment-settings/deployment-configuration),
- and this is the [extension point](/docs/reference/gimlet-manifest-reference#using-raw-manifests) we are using.
- We are also going to use Helm charts to install Redis. Here is an intro to them. TODO
{% /callout %}

### Helm Repository

The following manifest specifies where the Redis Helm chart is located.

```diff
# .gimlet/staging.yaml
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 1
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true
+manifests: |
+  ---
+  apiVersion: source.toolkit.fluxcd.io/v1
+  kind: HelmRepository
+  metadata:
+    name: bitnami
+    namespace: my-team
+  spec:
+    interval: 60m
+    url: https://charts.bitnami.com/bitnami
```

### Helm Release

The `HelmRelease` resource is a declarative way of telling Kubernetes to install a Helm chart. The `values` field specify the Helm chart valuues. These are specific to the Redis chart. You can find the [full list of options](https://github.com/bitnami/charts/blob/main/bitnami/redis/values.yaml) in the chart.

```diff
# .gimlet/staging.yaml
...
manifests: |
  ---
  apiVersion: source.toolkit.fluxcd.io/v1
  kind: HelmRepository
  metadata:
    name: bitnami
    namespace: my-team
  spec:
    interval: 60m
    url: https://charts.bitnami.com/bitnami
+  ---
+  apiVersion: helm.toolkit.fluxcd.io/v2
+  kind: HelmRelease
+  metadata:
+    name: my-redis
+    namespace: my-team
+  spec:
+    interval: 60m
+    releaseName: my-redis
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
+        existingSecret: my-redis
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
```

### Authentication

The Helm chart values point to a `Secret` resource where you can specify the Redis password.

This is in clear text for the time being. But you can encrypt it later on.

```diff
...
manifests: |
+  ---
+  apiVersion: v1
+  kind: Secret
+  metadata:
+    name: my-redis
+    namespace: default
+  type: Opaque
+  stringData:
+    redis-password: super-secret-password
  ---
  apiVersion: source.toolkit.fluxcd.io/v1
  kind: HelmRepository
...
```

## Verify and Set Connection Parameters

Once you deployed the manifests, you can verify Redis with the following commands:

```
$ kubectl exec -it my-redis-master-0 --namespace my-team -- bash
I have no name!@my-redis-master-0:/$ redis-cli
127.0.0.1:6379> auth super-secret-password
OK
127.0.0.1:6379> keys *
(empty array) 
```

The last step is to set the Redis connection parameters in your application.

The best practice is to use environment variables to configure your application. You can set them in the deployment configuration, and you can also use [secrets](/docs/deployment-settings/secrets).

* Connection URL: `my-redis-master.my-team.svc.cluster.local`
* Password: the one you set earlier
