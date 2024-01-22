---
title: 'Vercel VS Kuberetes'
date: '2024-01-12'
description: ""
image: gitops-broke-cicd.jpg
toc: false
---

Even the idea of comparison is wild, right?

But we gave it a serious thought. Hear us out!

{% highlight %}
People who chose Vercel just want to get stuff done.
{% /highlight %}

It is only fair if we approach Kubernetes with the same attitude.

Yes, we have seen the Kubernetes memes. You can build a castle on Kubernetes. But having possibilities should be a good thing, shouldn't it?

Let's see how does Kubernetes fare with Vercel if we bring a pragmatic mindset.

We are going to keep scores! 🏀

## Where to get started?

When you are getting started with Vercel, you go to vercel.io.

With Kubernetes, you go to the documentation.

Or do you? You will not be deploying anytime soon if you try to understand everything.

Vercel is a vertically integrated platform, it spans several architectural layers to make your life easy. To have even a remotely comparable experience with Kubernetes, we need to pick a managed Kubernetes provider. But not the hyperscaler clouds like AWS, Azure or GCP.

Since managed Kubernetes has an entry tax on the hyperscalers (75$ / mo for the so-called "control plane"), we pick a provider that does not have it: [CIVO Cloud](https://civo.com). At Digital Ocean, Scaleway or Linode you also won't pay the Kubernetes tax, just the VMs you use. 

Skipping the hyperscalers brings another benefit: smaller clouds are better integrated and simpler to understand. This comes handy if we want to compare the experience to Vercel.

## Just deploy something

The first test: let's deploy something.

We are going to deploy a React app since Vercel only supports frontend frameworks. The app is on Github, in a private repository.

{% wide color="bg-neutral-100 dark:bg-neutral-700" width=60 %}
![CIVO - Create a cluster](/civo-create-cluster.png)
{% /wide %}

{% wide color="" width=60 %}
{% table %}
* 
* **Vercel**
* **Kubernetes**
---
* **Registration**
* Vercel has a "Start Deploying" button on their home page. Clicking the button and connecting your Github you are signed up. It is one of the best experience we have ever seen, hands-down.   
Point Vercel. 🏀 
![Vercel Start Deploying button](/start-deploying.png)
*
  {% list type="checkmark" %}
  * Signign up to [https://civo.com](https://civo.com) brings the standard sign-up experience. There is nothing to be ashamed of here.
  * Since Kubernetes is not a serverless platform you need to create a cluster. There is no way around it.
  * There are a couple of decisions you need to make here: picking node size and count, but other than that, the defaults suffice. The cluster is up in about 90 seconds. Comparable to any self-hosting alternative.
  {% /list %}
---
* **Connecting the source code**
* With the signup, you have already set up the Github integration.
* The starting point for deploying to Kubernetes is a local copy of the source code.  
A git clone does the job.
---
* **Deployment configuration**
* Vercel does a great job at recognizing 35+ frontend frameworks. If your project is conventional, the build commands are set automatically. 
* {% list type="checkmark" %}
  * As promised, we are going to be pragmatic with Kubernetes. To match the no-config experience of Vercel, we are going to use an application template that is made for static websites. We need to set the build command, but the rest of the boilerplate is covered.
  * Create a file with the build commands:
    ```yaml
    # values.yaml
    gitCloneUrl: https://github.com/laszlocph/reactjs-test-app.git
    buildImage: "node:20.10-buster"
    buildScript: npm install && npm run build
    builtAssets: build/
    ```
  * Deploy the manifests and open a port-forward:
    ```
    $ helm repo add onechart https://chart.onechart.dev

    $ helm template my-react-site onechart/static-site \
      -f values.yaml > manifest.yaml
    
    $ kubectl apply -f manifest.yaml
    $ kubectl port-forward svc/my-react-site 8000:80
    ``` 
    The above snippet spares a lot of the legwork that containerized platforms like Kubernetes require. If you want to understand more, you can read more in our [blog post](https://gimlet.io/blog/hosting-static-sites-on-kubernetes). But it is not strictly required. We are pragmatic, remember?
  {% /list %}

--- 
* **Automation**
* Deployment automation is set up automatically as you set up your first deploy. Point Vercel. 🏀 
* You can take the command line commands we used earlier and put them into Github Actions.
{% /table %}
{% /wide %}

Vercel: 🏀 🏀 - Kubernetes: 🚫

## Adding a Domain name

Both Vercel and managed Kuberenetes have a default public domain name.

{% wide color="bg-neutral-100 dark:bg-neutral-700" width=60 %}
{% table %}
* 
* **Vercel**
* **Kubernetes**
---
* **Accessing on default domain**
* You can copy the `vercel.app`domain name from the Vercel portal.
*
  {% list type="checkmark" %}
  * Just like with Vercel, you can obtain the `k8s.civo.com `domain name from the portal.
  * Extend the deployment config file with a handful of lines to access the app on the domain
    ```diff
    # values.yaml
    gitCloneUrl: https://github.com/laszlocph/reactjs-test-app.git
    buildImage: "node:20.10-buster"
    buildScript: npm install && npm run build
    builtAssets: build/
    + ingress:
    +   annotations:
    +     kubernetes.io/ingress.class: traefik
    +  host: 81c09668-22fc-4f70-93fe-f8796eb49d06.k8s.civo.com
    ```
  {% /list %}
{% /table %}
{% /wide %}

Since accessing the application has the same end-user experience, and the configuration need is not more than a few more lines, no points given in this round.

Adding your custom domain requires adding DNS records on both platforms. The main complexity there is editing DNS records, so again, no points given in this round.

Vercel: 🏀 🏀 - Kubernetes: 🚫

## Preview deploys
{% wide color="bg-neutral-100 dark:bg-neutral-700" width=60 %}
{% table %}
* 
* **Vercel**
* **Kubernetes**
---
* **Setting up preview deploys**
* The setup is trivial, and the collaborative features of Vercel are best in class.  
Point Vercel. 🏀 
* Just like with automatic deployments, you have to script the preview deploys in your CI system, like Github Actions
---
* **Other**
* Not part of the Vercel free plan.
* The scripting comes down to variables in the deployment manifest to avoid naming collisions in the deployed version. It requires careful considerations and it is error-prone.
{% /table %}
{% /wide %}

Vercel: 🏀 🏀 🏀 - Kubernetes: 🚫

## Pricing

With the preview deploys, we already opened up the pricing discussion.

Vercel pricing not transparent, 0, 20, potentially expensive anything above that
Traffic cost issue, 100GB / 40$, geri knows
point kubernetes?

free tier TOS, not for commercial use

Kubernetes on the other hand has a transparent pricing
Not on the hyperscalers.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀

## Scaling

not in serving more users
but using it as a team, deploying multiple applications
having custom requirements.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀

## Conclusion

Kubernetes does not lag too much

Besides the points given above

Vercel is only for 35 frontend frameworks
If you want to deploy anything backend, you just can't
If this matters to you, point Kubernetes

The many usecases k8s can support, could bring it points
then copmplexity maybe a drawback, but then there is nothing that compares to it

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀 🏀
