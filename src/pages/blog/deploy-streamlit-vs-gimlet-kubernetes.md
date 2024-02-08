---
title: 'Streamlit Community Cloud vs. Gimlet: Deploying Streamlit Applications'
date: '2024-02-13'
description: "Streamlit is one of the most popular Python frameworks. In this blog post, we’ll check out how to make it public via Streamlit’s Community Cloud, as a Helm chart, and deploy it in Kubernetes through Gimlet."
image: gimlet-io-whats-next-for-fluxcd-and-gimlet.jpg
toc: false
---

**But wait a second…**

Isn’t Kubernetes overkill? It can be as much of an overkill as you want it. The purpose of this blog post is to get an understanding of how to deploy a Streamlit application the simplest way.

## Deploy in Streamlit’s Community Cloud

The specs for Streamlit’s cloud offering are pretty straightforward. There aren’t any paid plans, so you can deploy your app for free. Each app gets access to 1 GB RAM, but keep in mind that only one private application is allowed, everything else will be public.

Deployment is as simple as connecting your GitHub repository and boom, the application is out there, available to the world.

As you can see below, all you need to do is enter the corresponding data and you’re set for deploying your Streamlit app.

![Repository settings in Streamlit's Community Cloud.](/streamlit-deploy-repo-settings.png)

Additionally, you can set Python version and configure settings, too after clicking Advanced settings.

![Streamlit configuration settings.](/streamlit-app-configuration.png)

Then you click Deploy and you're set.

![Streamlit deployment screen.](/streamlit-deployment-screen.png)

Fair to say, it's hard to see how things can get any simpler than this if you don’t mind anyone having access to your projects.

## Deploying Streamlit apps in Kubernetes

One of the coolest things about Streamlit is that they documented how to deploy your project in Docker or Kubernetes. You can find the docs here, if you’re curious.

**But first of all, why would you deploy in Kubernetes, when Streamlit has Community Cloud and it’s so easy to use?**

As already mentioned, you have just one private app in the Community Cloud. The 1 GB RAM is on par with the lowest specs you can get for money at any cloud provider that offers managed Kubernetes.

### Deploy Streamlit as a Helm chart

If you find Streamlit’s documentation too overwhelming, another way to deploy Streamlit to a cluster is via using Helm charts. You can use OneChart helm chart to set up your application.

OneChart is an open-source Helm chart template for web applications. You can see documentation here to get started. Now moving on to deploying a Streamlit application with OneChart.

Use the command below to deploy your Streamlit app where `stapp` is your application. You can name it anything.

```
helm install stapp onechart/onechart --values values.yaml
```

At this point, you can decide if you’d like to locally access your app. If so, you can do so by executing the command below. When port-forwarding is done, you can check `localhost:9000` for access:

```
k port-forward svc/stapp  9000:8501
```

You can take a peep at the content of values.yaml below:

```
# Container listens to port 8501
containerPort: 8501
# Specify where your image is located
image:
  repository: youcefv123/streamlit_app
  tag: dev
```

Now, if you’d like to access it on the internet, you can add ingress like this:

```
containerPort: 8501
image:
  repository: youcefv123/streamlit_app
  tag: dev
ingress:
  annotations:
    kubernetes.io/ingress.class: traefik 
 # host variable should be the URL which you have DNS settings set for
  host: streamlit_app.com
```

### Takeaways

In case you’d like to deploy your Streamlit app with Kubernetes, you need to keep in mind a few things.

- First of all, you’ll need a Kubernetes cluster available. Then you’ll need to understand how you can build and push your app to a registry as a Docker image.
- If you only need your app to be available to a few people, Streamlit’s Community Cloud will do fine, and it’ll be a lot simpler to deploy that way, too.

## Deploy Streamlit application in Kubernetes with Gimlet

Gimlet is a GitOps platform. You can use it to deploy your applications to Kubernetes clusters.

You can get started with it by signing in using your GitHub or GitLab account. After signing up, you can select how you’d like to deploy your Streamlit application.

For the purpose of this blog post, we chose to deploy our app using a Dockerfile. As you can see below, you can set things up by adding the corresponding details of your application. As you can see, this time we only specified `port`, which is `8501`.

![Gimlet deployment settings of a Streamlit application.](gimlet-streamlit-dockerfile-deployment.png)

When you’re done with configuration, Gimlet will open a pull request in your repository with the configuration. All you have to do is just merge the PR in GitHub or the codebase manager you use.

![Gimlet's pull request on GitHub.](gimlet-github-pull-request.png)

When merging is complete, you need to go back to Gimlet and click on the deploy button. This’ll deploy the latest changes to your environment.

![When things go right, this is what you should see before a deployment.](gimlet-deployment.png)

After the deployment takes place successful, status page should look like this:

![Gimlet deployment status screen.](gimlet-deployment-status-screen.png)

### Takeaways

Hard to argue that Gimlet provides at least similar experience to deploying Streamlit apps to its Community Cloud.

An obvious pro of using Gimlet is that you can deploy your app to any environment as easily as you’d deploy with Streamlit’s own hosting solution. No resource restrictions, no limit to private projects at all.

The con is kind of related to the pro: it’s your environment and you’re going to be responsible for maintaining it.

On the flipside, if you’re working with others on a Streamlit project, using Gimlet to deploy changes is far more suitable than Streamlit’s Community Cloud.
