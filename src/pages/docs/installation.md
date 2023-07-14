---
title: Installing Gimlet
description: How to install Gimlet on k3s / k3d or Rancher / Docker Desktop or Minikube or kind
---


On this page you can learn how to install Gimlet on any Kubernetes cluster.

You can skip ahead if you use our hosted SaaS platform.

## Pre-requisites

- A [Github.com](https://github.com) personal or organization account.
- A Kubernetes cluster running on your laptop or on a cloud provider. [We recommend using k3d](/blog/running-kubernetes-on-your-laptop-with-k3d) on your laptop.

### Launching k3d on your laptop - optional

Install k3d with

```
curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
```

Launch a cluster with:

```
$ k3d cluster create gimlet-cluster --k3s-arg "--disable=traefik@server:0"

INFO[0000] Prep: Network                                
INFO[0000] Created network 'k3d-gimlet-cluster'       
INFO[0000] Created image volume k3d-gimlet-cluster-images 
INFO[0000] Starting new tools node...                   
INFO[0000] Starting Node 'k3d-gimlet-cluster-tools'   
INFO[0001] Creating node 'k3d-gimlet-cluster-server-0' 
INFO[0001] Creating LoadBalancer 'k3d-gimlet-cluster-serverlb' 
INFO[0001] Using the k3d-tools node to gather environment information 
INFO[0001] Starting new tools node...                   
INFO[0001] Starting Node 'k3d-gimlet-cluster-tools'   
INFO[0002] Starting cluster 'my-first-cluster'          
INFO[0002] Starting servers...                          
INFO[0003] Starting Node 'k3d-gimlet-cluster-server-0' 
INFO[0009] All agents already running.                  
INFO[0009] Starting helpers...                          
INFO[0009] Starting Node 'k3d-gimlet-cluster-serverlb' 
INFO[0016] Injecting records for hostAliases (incl. host.k3d.internal) and for 3 network members into CoreDNS configmap... 
INFO[0018] Cluster 'my-first-cluster' created successfully! 
INFO[0018] You can now use it like this:                
kubectl cluster-info
```

## Install with a oneliner

```
kubectl apply -f https://raw.githubusercontent.com/gimlet-io/gimlet/main/deploy/gimlet.yaml
```

Access with port-forward.

```
$ kubectl port-forward svc/gimlet 9000:9000
```

[http://127.0.0.1:9000](http://127.0.0.1:9000)

![](/admin-login.png)

Password is in the logs

```
$ kubectl logs deploy/gimlet | grep "Admin auth key"

time="2023-07-14T14:28:59Z" level=info msg="Admin auth key: 1c04722af2e830c319e590xxxxxxxx" file="[dashboard.go:55]"
```
