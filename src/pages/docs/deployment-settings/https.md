---
title: 'HTTPS'
description: |
  Configure HTTPS certification and add it to your deployed applications with a single click.
---

**You can set up HTTPS certification for your applications by configuring cert-manager. It's an open-source certification issuer specifically made for Kubernetes.**

HTTPS is enabled by default for applications deployed with Gimlet Cloud, but Gimlet also automates the configuration for any Gimlet environment.

## Configure Cert-Manager

When you create a new Gimlet environment, you have to [set up DNS](/docs/deployment-settings/dns) then you can set up SSL certificates for your deployments with the [cert-manager](https://cert-manager.io/) project. Gimlet largely automates this task.

![Cert-manager settings in Gimlet](/docs/screenshots/https/gimlet-io-https-cert-manager-lets-encrypt.png)

You can set up cert-manager by navigating to environment settings. You can do this by clicking the Environments button in the menu bar on top, then selecting the environment by clicking on its card.

In the settings, select Ingress tab in the menu bar on the left side, and look for the cert-manager section.

Enable cert-manager, and specify an email address where Let's Encrypt will email you about expiring certificates.

## Turn on HTTPS for Your Application

Once you have cert-manager enabled on your environment, you can use the HTTPS toggle in the deployment settings to turn on HTTPS certification any time you deploy an application.

You can access settings that belong to a deployment by clicking the (...) or meatballs menu of the deployment and click the **Edit** button. When you're in the settings, 

![HTTPS toggle in the deployment settings of an application deployed with Gimlet.](/docs/screenshots/https/gimlet-io-https-deployment-setting.png)
