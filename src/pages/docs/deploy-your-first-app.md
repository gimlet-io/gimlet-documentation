---
title: Deploy your first app
description: In this guide, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
---

## Prerequisites
- installation tutorial

## Deploy the app
- magic deploy

## Access with port-forward
- Access app with port-forward

## Map it to a domain name

### Setup an ingress controller
  - spin out the built in env to git (1 click)
  - configure the nginx ingress
    - we use a dummy domain name: "gimlet.trial", grafana, and others will go under "grafana.gimlet.trial"
  - wait for infra repo sync
    - TODO kustomization status task
  - validate ingress IP
```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
registry                             NodePort       10.43.142.56    <none>        5000:32447/TCP               3m52s
image-builder                        ClusterIP      10.43.232.222   <none>        9000/TCP                     3m51s
gimlet-agent                         ClusterIP      10.43.22.124    <none>        80/TCP                       3m51s
ingress-nginx-controller-metrics     ClusterIP      10.43.26.242    <none>        10254/TCP                    40s
ingress-nginx-controller-admission   ClusterIP      10.43.74.138    <none>        443/TCP                      40s
ingress-nginx-controller             LoadBalancer   10.43.78.31     172.19.0.2    80:31273/TCP,443:32217/TCP   40s
```

### Edit application config
  - set container port (8080, etc)
  - we add ingress
![](/ingress.png)
  - pull request to the app repo

- refresh commits
- magic deploy uses this app config (by convention the one that is called as the repo)

### Access on the domain name

#### Option 1 - on a local cluster
using port-forward
```
kubectl port-forward svc/ingress-nginx-controller -n infrastructure 8000:80

sudo sh -c 'echo 127.0.0.1 myapp.gimlet.trial >> /etc/hosts'
```

Open [http://myapp.gimlet.trial:8000/](http://myapp.gimlet.trial:8000/)

#### Option 2 - on a cloud cluster
using ingress LB IP (on cloud k8s )

  - validate ingress IP
```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
registry                             NodePort       10.43.142.56    <none>        5000:32447/TCP               3m52s
image-builder                        ClusterIP      10.43.232.222   <none>        9000/TCP                     3m51s
gimlet-agent                         ClusterIP      10.43.22.124    <none>        80/TCP                       3m51s
ingress-nginx-controller-metrics     ClusterIP      10.43.26.242    <none>        10254/TCP                    40s
ingress-nginx-controller-admission   ClusterIP      10.43.74.138    <none>        443/TCP                      40s
ingress-nginx-controller             LoadBalancer   10.43.78.31     172.19.0.2    80:31273/TCP,443:32217/TCP   40s
```
  - set host file entry
  
```
sudo sh -c 'echo 172.19.0.2 myapp.gimlet.trial >> /etc/hosts'
```

Open [http://myapp.gimlet.trial](http://myapp.gimlet.trial)
