---
title: Deploy your first app
description: "In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward."
---

In this tutorial, you will deploy your first application to Kubernetes and access it on a port-forward.

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

Once forwarded, visit your application on [http://127.0.0.1:8080](http://127.0.0.1:8080) 🎉

{% callout title="Not sure about the port?" %}
If you are unsure about the port your application is listening on, try checking the application logs:

```
$ kubectl logs deploy/reactjs-test-app

Compiled successfully!
You can now view react-app in the browser.
  Local:            http://localhost:8080
  On Your Network:  http://10.42.0.31:8080
```
{% /callout %}
