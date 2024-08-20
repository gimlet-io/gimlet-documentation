---
title: 'Port Forwarding'
description: |
  You can use port forwading with your applications deployed with Gimlet.
---

**If you need port forwarding for your application, you can easily get a command for it after it's deployed.**

{% callout %}
Not available on Gimlet Cloud's ephemeral environments during trial period as it requires kubectl access to the cluster.
{% /callout %}

When you deploy and save the configuration by clicking the **Write configuration to Git** button, you'll be directed to the status screen of your deployment.

Click the (...) or meatballs menu in the top right corner of the status, and select **Copy port-forward command**.

The copied command can be run in the terminal of the environment where your application was deployed.

![Port-forwarding](/docs/screenshots/port-forwarding/port-forward.png)
