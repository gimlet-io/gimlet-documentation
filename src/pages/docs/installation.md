---
title: Installing Gimlet
description: How to install Gimlet on k3s / k3d or Rancher / Docker Desktop or Minikube or kind
---


On this page you can learn how to install Gimlet on any Kubernetes cluster.

You can skip ahead if you use our hosted SaaS platform.

## Pre-requisites

- A [Github.com](https://github.com) personal or organization account.
- A Kubernetes cluster running on your laptop or on a cloud provider. [We recommend using k3d](TODO) on your laptop.

## Install with a oneliner

First make sure your Kubernetes context points to the right cluster:

```
$ kubectl get nodes

xxxx
```

This is my dummy k3d cluster, so I am safe to run the following:

```
kubectl apply -f https://raw.githubusercontent.com/gimlet-io/gimlet/main/deploy/gimlet.yaml
```

Access with port-forward.

```
$ kubectl port-forward svc/gimlet 9000:9000
```

Password is in the logs

```
$ kubectl logs -f deploy/gimlet

log output
```