---
title: 'DNS'
description: |
  Configuring DNS settings in Gimlet to make applications available from a custom domain.
---

**Expose your application on a domain name.**

When your are creating a new deployment you can specify the domain name your application will be accessible on.

The domain widget allows you to change the first part of the domain, while the rest is set in the environment settings.

![Setting a domain name in Gimlet](/docs/screenshots/deployment-settings/gimlet-io-domain-settings.png)

## Change Domain After Deployment

You can change the domain after you deployed the application. You can do this in the [application settings](/docs/deployment-settings/deployment-configuration#editing-deployment-configs). 

![Domain settings for a deployed application in Gimlet.](/docs/screenshots/dns/gimlet-io-custom-domain-after-deployment.png)

When you're in the deployment settings, click the **Domain** button, where you can update the domain. You can turn HTTPS certification on and off here, as well. When you're done, you can give the changes you made in yaml format by clicking the **Review changes** button, then apply the changes by clicking the **Save** button.

## Gimlet Cloud Domains

If you are using Gimlet Cloud, Gimlet provides you a unique subdomain, ending with `gimlet.app` while you are using the 7-day ephemeral cluster.

![Setting a domain name](/docs/screenshots/deployment-settings/gimlet-io-domain-settings.png)

Once you connect your own cluster, read on to learn how to configure your custom domain name.

## Configure a custom domain

When you create a new Gimlet environment and connect your own cluster, you need to

- configure an ingress controller
- and set DNS entries at your DNS provider

so your applications can receive traffic on the specified domain.

### Configure an ingress controller

The ingress controller is a custom Kubernetes componenent that routes traffic to your application, based on a host based mapping. Gimlet largely automates this setup and includes the [Ingress Nginx](https://github.com/kubernetes/ingress-nginx).

To configure a new instance of Ingress Nginx on your environment, navigate to environment settings by clicking the Environments button in the menu on top, and then selecting the environment by clicking on its card.

In the environment settings, navigate to ingress settings by clicking the Ingress button in the menu on the left.

Under Nginx settings, enable Nginx and enter the domain where you'd like to host the deployed applications. When you're done, click Save to finish configuring Nginx.

The domain name will be string concatenated to the end of each domain you set in the platform. Thus it is best practice to start with a dot to have your applications run on a subdomain of the configured domain (and later on you will set a wildcard DNS entry for this).

![Nginx configuration in Gimlet](/docs/screenshots/dns/dns-nginx.png)

### Set DNS records

Once you saved the ingress configuration and you have an ingress controller running on your cluster

- you must locate the public IP address of the ingress controller
- and set a DNS entry for this IP address at your DNS provider.

To locate the IP address of the Nginx ingress controller, get the Kubernetes Service with kubectl:

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           EXTERNAL-IP
ingress-nginx-controller             LoadBalancer   74.220.27.134
```

Then point a wildcard DNS entry to the desired subdomain. `*.staging.turbopizza.net` in our case as per ingress controller settigns screenshot.

{% callout %}
The External-IP column takes a couple of minutes to show up after the deployment of the ingress controller. Cloud providers need to deploy a cloud LoadBalancer for this to work.

Two important consequences of this:
- LoadBalancers incur additional cost
- local clusters don't have external IP addresses
{% /callout %}


### Integrate an existing ingress

If you already use an ingress controller, you can integrate it with Gimlet.

You can navigate to the Existing Ingress settings by following the instructions mentioned above. Instead of Nginx settings, you need to scroll down to Existing Ingress settings this time.

After enabling the Existing Ingress, enter your custom domain where the ingress controller handles traffic, then enter ingress annotations.

- The domain name will be string concatenated to the end of each domain you set in the platform. Thus it is best practice to start with a dot to have your applications run on a subdomain of the configured domain (and later on you will set a wildcard DNS entry for this).

- Ingress annotations will be placed on every ingress you create with Gimlet, thus your existing ingress controller will handle their traffic. Ingress annotations are ingress specific, you can see an example on using the [ingress nginx](https://github.com/kubernetes/ingress-nginx) project.

![Existing Ingress configuration settings in Gimlet.](/docs/screenshots/dns/gimlet-io-dns-configure-existing-ingress.png)
