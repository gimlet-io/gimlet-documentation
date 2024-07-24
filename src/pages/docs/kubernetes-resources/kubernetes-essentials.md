---
title: 'Kubernetes Essentials'
description: |
  Basic Kubernetes informations and commands you can use to manage a cluster.
---

**Collection of Kubernetes essential and troubleshooting guides, in case you need to fix something with your applications.**

As much as we'd like to make issues resolvable on Gimlet's UI, it's not unexpected that you'll need outside-of-Gimlet troubleshooting one day. For this reason, you can find a comprehensive guide about getting started and fixing the most common issues when it comes to Kubernetes.

If all else fails, feel free to reach out to us on our [Discord server](https://discord.com/invite/ZwQDxPkYzE).

## Running a Kubernetes Cluster on Your Laptop 

Our blog has just [tutorial](/blog/running-kubernetes-on-your-laptop-with-k3d) to get you started.

## Kubernetes Vocabulary

### Pods

Pods are the smallest deployable units in Kubernetes. It can contain one or multiple containers. The containers of a pod share the same IP address and ports. The containers within a pod can communicate with each other using `localhost`. Containers can also share [volumes]().

### Deployments

Deployments are responsible for the creation and running of pods. Deployments are also the units that manage the update of applications following pre-defined deployment strategies like rolling updates.

### Services

Services enable network communication to the pods.

### Namespaces

Namespaces are used to divide resources between multiple users, teams, architecture, or any entity you can think of. You can assign namespaces to deployments for resource allocation when you deploy with Gimlet.

arbitrary

**Namespace best practices:**
- Use `default` when you start out,
- later on follow your company's conventions, or ask your cluster admin if you have one.

### Volumes

Volumes provide a way to store persistent data for your applications.

You can use ephemeral or cloud based presistent disks, configmaps, or even secrets as volumes.
[See volume options](/docs/deployment-settings/volumes)

### ConfigMaps

ConfigMaps are used for non-confidential application configuration. They are exposed to your application as environment variables or as files.

### Secrets

Secrets are used to store confidential data, passwords or tokens for example.

### Ingress

Ingress is responsible for routing HTTP and HTTPS to your application.
