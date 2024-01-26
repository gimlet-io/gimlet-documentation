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

Vercel is a vertically integrated platform, it spans several architectural layers to make your life easy. To have even a remotely comparable experience with Kubernetes, we need to pick a managed Kubernetes provider.

But not the hyperscaler clouds like AWS, Azure or GCP, since managed Kubernetes has an entry tax on the hyperscalers: a 75$ a month fee for the so-called "control plane".

We pick a provider that does not have it: [CIVO Cloud](https://civo.com). At Digital Ocean, Scaleway or Linode you also won't pay the Kubernetes tax, just the VMs you use. 

Skipping the hyperscalers brings another benefit: smaller clouds are better integrated and simpler to understand. This comes handy if we want to compare the experience to Vercel.

## Just deploy something

The first test: let's deploy something.

We are going to deploy a React app since Vercel only supports frontend frameworks. The app is on Github, in a private repository.

{% wide color="" width=80 %}
{% grid %}

{% box span="col-span-2" %}
**Registration**
{% /box %}

{% box span="col-span-5" %}
**Vercel** has a "Start Deploying" button on their home page. Clicking the button and connecting your Github you are signed up. It is one of the best experience we have ever seen, hands-down.   
Point Vercel. 🏀 
![Vercel Start Deploying button](/start-deploying.png)
{% /box %}

{% box span="col-span-5" %}
**Kubernetes:** Signign up to [https://civo.com](https://civo.com) brings the standard sign-up experience. There is nothing to be ashamed of here.
* Since Kubernetes is not a serverless platform you need to create a cluster. There is no way around it.
* There are a couple of decisions you need to make here: picking node size and count, but other than that, the defaults suffice. The cluster is up in about 90 seconds. Comparable to any self-hosting alternative.
{% /box %}

{% box span="col-span-2" %}
**Connecting the source code**
{% /box %}
{% box span="col-span-5" %}
By signing up to **Vercel**, you have already set up the Github integration.
{% /box %}
{% box span="col-span-5" %}
**Kubernetes:** The starting point for deploying to Kubernetes is a local copy of the source code.  
A git clone does the job.
{% /box %}

{% box span="col-span-2" %}
**Deployment configuration**
{% /box %}
{% box span="col-span-5" %}
**Vercel** does a great job at recognizing 35+ frontend frameworks. If your project is conventional, the build commands are set automatically.
{% /box %}
{% box span="col-span-5" %}
As promised, we are going to be pragmatic with **Kubernetes**. To match the no-config experience of Vercel, we are going to use an application template that is made for static websites. We need to set the build command, but the rest of the boilerplate is covered.
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
{% /box %}
{% box span="col-span-2" last=true %}
**Automation**
{% /box %}
{% box span="col-span-5" last=true %}
Deployment automation is set up automatically setup on **Vercel** as you set up your first deploy. Point Vercel. 🏀 
{% /box %}
{% box span="col-span-5" last=true %}
To automate **Kubernetes** deployments, you can take the command line commands we used earlier and put them into Github Actions.
{% /box %}

{% /grid %}
{% /wide %}

{% wide color="bg-neutral-100 dark:bg-neutral-700" width=80 %}
![CIVO - Create a cluster screen](/civo-create-cluster.png)
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
{% wide color="" width=60 %}
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

Pricing is often brought up in discussions about Vercel. There's a free tier at Vercel, which isn't available at cloud providers when you'd like to use managed Kubernetes.

Vercel's paid tier starts at a $20 per seat monthly price tag. They charge $40 per 100 GBs of bandwidth after exceeding the 1 TB included in the free tier. For the sake of real world comparison, Civo charges $0.01 per additional GB.

There's also one particular aspect to keep in mind when using Vercel. Vercel's fair use guidelines restrict commercial use for hobby accounts. So you'll need to use the paid plan if you're trying to make money out of your frontend app.

Value for money comparison point goes to Kubernetes in this area.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀

## Scaling

In this case, we mean scaling as in usability as a team.

Vercel's paid plan is capped at 10 seats, which totals to $200 a month without topping up for extra usage. Have to admit, Vercel's preset services, such as KV and PostgreSQL are convenient, but are they worth the price when you can DIY these for yourself? And let's not forget, Vercel is still only for frontend frameworks!

Kubernetes itself has no seat limits, only user restrictions made by the cluster's maintainer. Databases and key-value stores don't exist as plugins for Kubernetes. These definitely pose some sort of complexity from a user's point-of-view. But you can configure your preferred solution for these uses, offering a wider range of flexibility compared to what Vercel brings to the table in this regard.

On one side, Vercel offers simplicity while sacrificing flexibility. On the other, Kubernetes demands a level of complexity to unlock endless possibilities for customization.

When working as a team, you have to assess whether Vercel's options meet your needs, or whether Kubernetes' flexibility is worth squeezing the juice of the platform. Point Kubernetes.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀

## Conclusion

It all boils down to whether you're willing to give up convenience for flexibility, or the other way around.

Vercel offers convenient user experience right from the beginning that Kubernetes can't compare to alone. It's also fair to say that the $20 monthly plan won't break the bank if you're trying to validate an MVP and chances are you won't exceed bandwidth limits with it, either.

While Kubernetes seems like an overcomplicated beast for deployments and hosting, it can be tamed and used for deployments to your liking, especially if you can find a provider where you get the best deal for managed K8s. And it's not a picky being either: any containerized runtime is compatible with it.

For the wider-range of use cases supported, we consider Kubernetes the better solution in general. Point Kubernetes.

Vercel: 🏀 🏀 🏀 - Kubernetes: 🏀 🏀 🏀

CTA: Linkedin event where we walk thourgh the static site hosting
