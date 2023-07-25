---
title: Deploy your first app
description: "In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward."
---

In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward.

Later you will map a dummy domain name to the deployed application, so you can skip using IP addresses.

## Prerequisites
- You have finished the [installation](/docs/installation) tutorial, thus you see your git repositories in Gimlet and you have connected a cluster.
- You have an application to deploy. It can be any web application, written in any language. If you need something to play with, fork this [ReactJS](https://github.com/gimlet-io/reactjs-test-app) app, or this [NodeJS/ExpressJS]() app, this [Remix]() app, or this [Django]() app.

## Deploy the app

A typical Kubernetes tutorial would need you to containerize your application and write a deployment manifest yaml to deploy your application. None of this is necessary with Gimlet.

Although you will be able to bring your own Dockerfile and you will interact with deployment manifests later in your Gimlet journey, at this point the goal is to deploy your first application. That is why Gimlet packed the containerization and deployment manifest creation steps into a single deploy button.

To deploy your application:
- Navigate to your repository under the Repositories tab.
- Locate the branch and commit you would like to deploy.
- Push the Deploy button to deploy the desired commit.

![](/deploy-button.png)

This will kick off a couple of things:

- It builds a container image,
- then generates a Kubernetes manifest and places it in a git repository.

![](/image-build.png)

Once the git connection inside the cluster pulled the latest changes, you will see the deployed application on the screen.

![](/deployed.png)

{% callout title="Your application is not building?" %}
Automatic container image building has its limitations.

If your application is not building, you can restart this tutorial with one of the sample repositories we provide, or look for image building options [here](/docs/when-the-image-is-not-building).
{% /callout %}
## Access with port-forward

Applications running on Kubernetes are only accessible on the internal container network by default.

To bridge this gap and to quickly validate your running application, you can forward your application's port to your laptop:

```
$ kubectl port-forward deploy/reactjs-test-app 8080:8080

Forwarding from 127.0.0.1:8080 -> 8080
Forwarding from [::1]:8080 -> 8080
```

Where `reactjs-test-app` is your repository name, and `8080` is the port your application listening on.

{% callout title="Not sure about the port?" %}
If you are unsure about the port your application is listening on, try checking the application logs to find it:

```
$ kubectl logs deploy/reactjs-test-app

Compiled successfully!
You can now view react-app in the browser.
  Local:            http://localhost:8080
  On Your Network:  http://10.42.0.31:8080
```
{% /callout %}

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
