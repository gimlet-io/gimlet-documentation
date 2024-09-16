---
title: Redis
description: This page shows you how you can deploy and run a Redis next to your application.
---

We all like Redis alongside our applications. This page shows you how you can deploy and run a Redis next to your application.

## Deploy a Redis next to your app

In this section you learn the simplest way to run a Redis next to your application.

This instance will be dedicated to your application, and this guide assumes that Redis is used as a pure in-memory cache, without persistence.

{% callout %}
If you need to persist state, you want your data to survive Redis restarts, we recommend you use a [shared Redis](#use-a-shared-redis), where backup and availbility concerns are centralized.
{% /callout %}

### Gimlet Manifest

To deploy Redis, you are going to add manifests to your application's Gimlet manifest.



{% callout %}
- You can find an introduction to the Gimlet Manifest [here](/docs/deployment-settings/deployment-configuration),
- and this is the [extension point](/docs/reference/gimlet-manifest-reference#using-raw-manifests) we are using.
- We are also going to use Helm charts to install Redis. Here is an intro to them. TODO
{% /callout %}

#### Helm Repository

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
+  apiVersion: source.toolkit.fluxcd.io/v1beta1
+  kind: HelmRepository
+  metadata:
+    name: bitnami
+    namespace: my-team
+  spec:
+    interval: 60m
+    url: https://charts.bitnami.com/bitnami
```

#### Helm Release

The HelmRelease resource is a declarative way of telling Kubernetes to install a Helm chart. The `values` field specify the Helm chart valuues. These are specific to the Redis chart. You can find the [full list of options](https://github.com/bitnami/charts/blob/main/bitnami/redis/values.yaml) in the chart.

```diff
# .gimlet/staging.yaml
...
manifests: |
  ---
  apiVersion: source.toolkit.fluxcd.io/v1beta1
  kind: HelmRepository
  metadata:
    name: bitnami
    namespace: my-team
  spec:
    interval: 60m
    url: https://charts.bitnami.com/bitnami
+  ---
+  apiVersion: helm.toolkit.fluxcd.io/v2beta1
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
+        resources:
+          limits:
+            memory: 128Mi
+            cpu: 250m
+          requests:
+            memory: 128Mi
+            cpu: 10m
```

#### Authentication

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

### Verify Redis

Once you deployed the manifests, you can verify Redis with the following commands:

```
$ kubectl exec -it my-redis-master-0 --namespace my-team -- bash
I have no name!@my-redis-master-0:/$ redis-cli
127.0.0.1:6379> auth super-secret-password
OK
127.0.0.1:6379> keys *
(empty array) 
```

### Set connection parameters

The last step is to set the Redis connection parameters in your application.

The best practice is to use environment variables to configure your application. You can set them in the deployment configuration, and you can also use [secrets](/docs/deployment-settings/secrets).

* Connection URL: `my-redis-master.my-team.svc.cluster.local`
* Password: the one you set earlier

## Use a shared Redis

In this section you learn how to use a centralized Redis instance that is shared between your applications.

### Why Use a Shared Redis

Sharing means more constraints typically, but you can also delegate the operational responsibilities to the maintainer of the shared instance.

In a small company that maintainer may also be you, but using a centralized instance instead of multiple small ones will ease your maintenance burden.

Operational responsibilities that you can optimize with using a shared instance:
- backups
- monitoring, alerting, availability
- cost

### Existing Redis

Gimlet allows you to specify the details of an existing Redis instance. This can be a cloud managed instance, or something that you manage outside of Gimlet.

Working with existing Redis instances are the same as working with [containerized Redis](#containerized-redis) instances. Without the maintenance part naturally.

### Containerized Redis

In this section you will deploy a Redis instance that will serve as centralized Redis instance that your applications can use.

#### Manifests

You put these manifests to the `gitops-<environment-name>-infra` repository by convention.

The manifests are configuring Redis in a [master-replicas](https://github.com/bitnami/charts/tree/main/bitnami/redis#default-master-replicas) configuration.

```yaml
# helm-repositories/bitnami.yaml
---
apiVersion: source.toolkit.fluxcd.io/v1beta1
kind: HelmRepository
metadata:
  name: bitnami
  namespace: infrastructure
spec:
  interval: 60m
  url: https://charts.bitnami.com/bitnami
```

```yaml
# helm-releases/redis.yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: redis
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: redis
  chart:
    spec:
      chart: redis
      version: 20.1.3
      sourceRef:
        kind: HelmRepository
        name: bitnami
      interval: 10m
  values:
    auth:
      existingSecret: redis
    commonConfiguration: |-
      # Enable AOF https://redis.io/topics/persistence#append-only-file
      appendonly yes
      # Disable RDB persistence, AOF persistence already enabled.
      save ""
      # https://redis.io/docs/latest/operate/oss_and_stack/management/config/#configuring-redis-as-a-cache
      maxmemory 900mb
    master:
      persistence:
        enabled: false
      resources:
        limits:
          memory: 1000Mi
          cpu: 1000m
        requests:
          memory: 1000Mi
          cpu: 100m
```

```yaml
# manifests/redis.yaml
---
apiVersion: v1
kind: Secret
metadata:
  name: redis
  namespace: infrastructure
type: Opaque
stringData:
  redis-password: super-secret-password
```


