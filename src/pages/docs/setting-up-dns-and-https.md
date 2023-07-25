---
title: Setting up DNS and HTTPS
description: "In this tutorial, you will map a DNS name to your app and enable HTTPS."
---

In this tutorial, you will map a DNS name to your app and enable HTTPS.

## Prerequisites
- An application that you deployed with Gimlet. Practically, you have finished the [Deploying your first app](/docs/deploy-your-first-app) tutorial.
- You need a real cluster that is capable of creating externally accessible load balancers. Practically any Kubernetes cluster that is running on a cloud provider.
- You are going to need a real domain name, or you can use the nip.io dynamic DNS service as this tutorial is going to.

## Setting up an Nginx ingress controller

In this section you are going to install an Nginx server that will be accessible on a publicly available IP address.

This Nginx will be the reverse proxy that will route traffic to your application based on the host name.

Navigate to the "Environments" tab to get started.

### Convert to a gitops environment to be able to make changes

Gimlet generated a dummy environment at first start. You used that environment so far to deploy applications.

You are going to continue using this dummy environment in this tutorial and set up Nginx in it. But before you can make changes to this built-in environment,  you have to convert it to a gitops environment. Practically, you have to push the "convert it to a gitops environment" link in the notice bellow.

It will create two repositories on Github, one for application manifests, and one for infrastructure manifests. It is a good time to inspect the contents now. These are the manifests that are synchronized to Kubernetes on every commit.

![](/convert.png)

### Enabling Nginx

Enable Nginx under Environments > Brief-Pond > Infrastructure components tab > Nginx > Config tab, where brief-pond is the name of my dummy environment.

If you have a real domain name to map your application to, add that under the host field. Later you will set a wildcard DNS entry for it. If you use the `test.mycompany.com` DNS name, services will be put under `*.test.mycompany.com`.

Set `test.mycompany.com` in the host field.

If you don't have a real domain name, set the value `tbd` for now.

Save the configuration with the "Save componentes" button. Inspect and merge the pull request that is created by Gimlet.

![](/nginx-tbd.png)

Save the configuration with the "Save componentes" button. Inspect and merge the pull request that is created by Gimlet.

Once you merged the pull request, the changes will be synchronized to your cluster.

You can track the syncronization status on the bottom toolbar.

![](/gitops-status.png)

### Locate the external IP address

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


## Map to a real domain name

Add an A record to `*.mycompany.com` to ingress EXTERNAL IP

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
registry                             NodePort       10.43.142.56    <none>          5000:32447/TCP               3m52s
image-builder                        ClusterIP      10.43.232.222   <none>          9000/TCP                     3m51s
gimlet-agent                         ClusterIP      10.43.22.124    <none>          80/TCP                       3m51s
ingress-nginx-controller-metrics     ClusterIP      10.43.26.242    <none>          10254/TCP                    40s
ingress-nginx-controller-admission   ClusterIP      10.43.74.138    <none>          443/TCP                      40s
ingress-nginx-controller             LoadBalancer   10.43.78.31     200.100.123.10  80:31273/TCP,443:32217/TCP   40s
```

## Enable Cert-Manager

## Reconfigure app ingress to use the real domain name
Check app on domain name
enable https ingress setting
