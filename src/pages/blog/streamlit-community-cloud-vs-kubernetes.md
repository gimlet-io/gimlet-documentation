---
title: 'Streamlit Community Cloud vs Kubernetes'
date: '2024-02-13'
description: "Streamlit is one of the most popular Python frameworks. In this blog post, we’ll check out how to make it public via Streamlit’s Community Cloud, and we check out a pragmatic approach to deploy on Kubernetes."
image: gimlet-io-whats-next-for-fluxcd-and-gimlet.jpg
toc: false
---

But wait a second… Isn’t Kubernetes an overkill?

{% highlight %}
While Kubernetes seems like an overcomplicated beast for deployments and hosting, it can be tamed by adopting a conservative approach and a cheap managed Kubernetes provider.
{% /highlight %}

At least this is what we try to do in this blog post, to get an understanding of how to deploy a Streamlit application in the simplest ways.

## Deploy to Streamlit’s Community Cloud

The specs for Streamlit’s cloud offering are pretty straightforward. There aren’t any paid plans, so you can deploy your app for free. Each app gets access to 1 GB RAM, but keep in mind that you can have only one private application, everything else will be public.

Deployment is as simple as connecting your GitHub repository, your application is available online.

![Streamlit deployment screen.](/streamlit-deployment-screen.png)

As you can see below, all you need to do is entering the corresponding data and you’re set for deploying your Streamlit app.

![Repository settings in Streamlit's Community Cloud.](/streamlit-deploy-repo-settings.png)

Additionally, you can set Python version and configure settings in *Advanced settings*.

![Streamlit configuration settings.](/streamlit-app-configuration.png)

It's hard to see how things can get any simpler than this. Community Cloud has won in terms of user experience, unfortunately the limit that you can have only a single private app makes it practically unusable for companies.

## Deploying Streamlit apps in Kubernetes

One of the coolest things about Streamlit is that they [documented]((https://docs.streamlit.io/knowledge-base/tutorials/deploy/kubernetes)) how to deploy your project with Docker and Kubernetes.

Just to re-iterate, why would you deploy in Kubernetes when Streamlit's Community Cloud is so easy to use? You can have just a single private app in Community Cloud. Luckilly the 1CPU and 1 GB RAM spec is on par with the cheapest managed Kubernetes providers. We are going to use [CIVO Cloud's](https://civo.com) $5 plan in this blog post.

### Deployment steps

If you find Streamlit’s documentation overwhelming, another way to deploy Streamlit to a cluster is via using
an application template, called a Helm chart.

At Gimlet, we made a generic Helm chart, called [OneChart](https://gimlet.io/docs/onechart-reference) and we use it for all web applications deployments.

With the command bellow, you can generate the deployment manifests for Kubernetes then apply it on the cluster:

```yaml
#values.yaml
containerPort: 8501
image:
  repository: youcefv123/streamlit_app
  tag: dev
```

```
$ helm template streamlit-app onechart/onechart |
  --values values.yaml > manifest.yaml

$ kubectl apply -f manifest.yaml
```

Then port-forward your app to access it on [http://localhost:8501](http://localhost:8501):

```
$ kubectl port-forward svc/stapp 8501:8501
```

To access it on the internet, you can add an ingress like this:

```diff
#values.yaml
containerPort: 8501
image:
  repository: youcefv123/streamlit_app
  tag: dev
+ ingress:
+   annotations:
+     kubernetes.io/ingress.class: traefik
+  # copy the url from the CIVO dashboard
+  host: 81c09668-22fc-4f70-93fe-f8796eb49d06.k8s.civo.com
```

### In summary

To deploy your Streamlit app on Kubernetes:

- You’ll need a Kubernetes cluster available.
  - We recommend CIVO's $5 plan
  - Or you can get started on a [local cluster](/blog/running-kubernetes-on-your-laptop-with-k3d)
- You’ll need to understand how you can build and push your app to a registry as a Docker image.

## Deploy Streamlit application in Kubernetes with Gimlet

If you prefer a GUI to do the above steps, our open-source product Gimlet will help you deploying your Streamlit app. In this section we walk you through how you can do it. We have a cloud version as well: [signup](https://gimlet.io/signup).

You can get started with it by signing in using your GitHub account. After signing up, you can select how you’d like to deploy your Streamlit application.

For the purpose of this blog post, we chose to deploy the app using a Dockerfile.

![Gimlet deployment settings of a Streamlit application.](/gimlet-streamlit-dockerfile-deployment.png)

When you’re done with configuration, Gimlet will open a pull request in your repository.

![Gimlet's pull request on GitHub.](/gimlet-github-pull-request.png)

When merging is complete, you need to go back to Gimlet and click on the deploy button. This’ll deploy the latest changes to your environment.

![When things go right, this is what you should see before a deployment.](/gimlet-deployment.png)

After the deployment takes place successful, status page should look like this:

![Gimlet deployment status screen.](/gimlet-deployment-status-screen.png)

### Takeaways

As you could see Gimlet provides a similar experience to deploying Streamlit apps to its Community Cloud.

An obvious pro of using Gimlet is that you can deploy your app to any environment as easily as you’d deploy with Streamlit’s own hosting solution. No resource restrictions, no limit to private projects at all.

The con is kind of related to the pro: it’s your environment and you’re going to be responsible for maintaining it.

On the flipside, if you’re working with others on a Streamlit project, using Gimlet to deploy changes is far more suitable than Streamlit’s Community Cloud.

If you want to see how we deploy a Streamlit app to Kubernetes, join [this live stream](https://www.linkedin.com/events/awalkthrough-deployingareactapp7160557073028530176/theater/) on the 20th February.

See you there!
