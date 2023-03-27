---
title: Exposing Gimlet on a domain name
description: On this page you can learn how to install Gimlet on any Kubernetes cluster.
---

Now that you finished [installing Gimlet](/docs/installation), you will expose it on a real domain name.

So far, you accessed Gimlet through a kubectl port-forward. In this section, you can read about how to use a real domain name secured by HTTPS.

If you are evaulating Gimlet locally, you can use a service called Ngrok to expose Gimlet to external parties, like CI platforms.

## Exposing a local Gimlet with Ngrok

Gimlet integrates with source code managers and CI servers. These platforms need to access your in-cluster Gimlet installation. To fully experience Gimlet, you have to make the Gimlet API available to them.

On local Kubernetes clusters, you can use *ngrok* to make this happen.

[Gmilet's CI integration](/docs/deploy-your-first-app-to-kubernetes#integrate-ci-with-gimlet) takes two parameters: Gimlet's API location and an API token. Local installations can be exposed by the following ngrok command, then you can use the ngrok URL in the `GIMLET_SERVER` secret in CI.

```
ngrok http 127.0.0.1:9000
```

For local Kubernetes clusters, this is all what is needed. You can continue to [Deploy your first app to Kubernetes](/docs/deploy-your-first-app-to-kubernetes)

## Exposing Gimlet with an ingress

### Your ingress architecture

Ingress controllers route traffic to your applications on Kubernetes clusters. They are paired with a cloud load balancer on managed Kubernetes platforms.

Depending on your Kubernetes provider, you may already have an ingress controller installed. To gain better control over your ingress, you will install the Nginx ingress controller now with gitops.

TODO how to set up ingress with gitops.

Set the ingress controller host name 

Update the ingress controller host name from `trial` to `testing.yourcompany.com` given that you named your environment *testing* and your preferred domain name is `yourcompany.com`. You can skip the `testing` prefix if this is your production environment.

Your ingress controller host name is under *Infrastructure Components > Ingress > Nginx*


### Setting a wildcard DNS name

Locate the IP address of the Nginx ingress controller:

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           EXTERNAL-IP
ingress-nginx-controller             LoadBalancer   74.220.27.134
```

Then set a wildcard domain name pointing to this IP. Point `*. testing.yourcompany.com` to the Nginx public IP address, given that you named your environment *testing* and your preferred domain name is `yourcompany.com`. You can skip the `testing` prefix if this is your production environment.

### Update the domain name to a real one

When you started the installer with the `curl -L -s https://get.gimlet.io | bash -s trial` command, the *trial* parameter was the domain name Gimlet used as a suffix to create the ingresses.

Gimlet is currently reachable on [http://gimlet.trial:9000](http://gimlet.trial:9000) using kubectl port-forward.

It is time to reconfigure your Gimlet to be hosted on your preferred domain name. To reconfigure your stack, follow one of the methods described in [Managing infrastructure components](/docs/managing-infrastructure-components).

#### Update the Gimlet Dashboard host name

Gimlet should know about where it is hosted. Update the *Gimlet > Config > Host* setting to the real domain name. Use a full domain name with the protocol included eg.: `https://gimlet.testing.yourcompany.com`.

### Install Cert-Manager

Enable the Cert-Manager component under *Infrastructure Components > Ingress > CertManager*.

### Write changes to the gitops repo

Press *Infrastructure Components > Save components* and watch the gitops commit manifest on the cluster.

### Update OAuth configuration

For the OAuth authentication to work, you also need to update the URLs in 

#### Github
your Github application settings on Github.com under *Settings > Developer settings > GitHub Apps > Your Gimlet Application*

- Update *Homepage URL* from `http://gimlet.trial:9000` to `https://gimlet.testing.yourcompany.com`
- Update *Callback URL* from `http://gimlet.trial:9000/auth` to `https://gimlet.testing.yourcompany.com/auth`
- Update *Webhook URL* from `http://gimlet.trial:9000/hook` to `https://gimlet.testing.yourcompany.com/hook`

### Gitlab

TODO
