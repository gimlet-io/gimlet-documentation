---
title: 'Deployment Configuration'
description: |
  When you're setting an application up for deployment, you pick a deployment template. Templates in Gimlet are made with Helm charts under the hood and you can also bring your own.
---

When you're setting an application up for deployment, you select a deployment template.

![Gimlet deployment templates.](/docs/screenshots/deployment-settings/gimlet-io-deployment-templates.png)

When you are done configuring, you write the configuration to your source code git repository. We call this configuration file the Gimlet manifest.

{% callout %}
Templates in Gimlet are made with Helm charts under the hood. You can create [your custom templates](/docs/deployment-settings/custom-template).
{% /callout %}

## The Gimlet manifest

Even if you are configuring your deployment on the dashboard, a configuration file is created which is called the Gimlet manifest.

Gimlet manifest files are stored under the `.gimlet` folder of your application source code repository. One file per environment.

The following example shows two files, one for staging, and one for production. They only differ in the replica count. However, you can have a completely unique set of configs in your envs. The manifest files control it all.

```
# .gimlet/staging.yaml
app: myapp
env: staging
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 1
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.staging.mycompany.com
    tlsEnabled: true
```

```
# .gimlet/production.yaml
app: myapp
env: production
namespace: my-team
chart:
  repository: https://chart.onechart.dev
  name: onechart
  version: 0.32.0
values:
  replicas: 2
  image:
    repository: myapp
    tag: 1.1.0
  ingress:
    host: myapp.mycompany.com
    tlsEnabled: true
```

### Structure

The Gimlet manifest pins down the release configuration to a target environment:

- **the Helm chart to use,**
- **its version,**
- **and the configuration variables for a given environment.** These are the values fed into the Helm chart at the time of rendering.

Here's a visualized explanation:

![Gimlet Manifest components and their responsibilities.](/docs/gimlet-io-manifest-documentation.png)

For the full structure:

- See the [full manifest reference](/docs/reference/gimlet-manifest-reference).
- See [manifest examples](https://github.com/gimlet-io/gimlet/tree/main/examples)
- See the [full reference of the built-in deployment templates](/docs/reference/onechart-reference)
- See what to do when [Helm is limiting you](/docs/reference/gimlet-manifest-reference#when-helm-is-limiting)

## Editing deployment configs

You can edit deployment configurations on the dashboard.

Locate your service card and look for the `...` or meatballs menu in the app's service card. Click **Edit** in the menu.

!["Editing deployment configuration"](/docs/screenshots/deployment-settings/gimlet-io-editing-deployment-configuration.png)

### Inspecting the diff

Before you save the configuration on the dashboard, you can inspect the diff that will be saved to your Gimlet manifest.

![Diffing Gimlet deployment configuration.](/docs/screenshots/deployment-settings/gimlet-io-diffing-deployment-config.png)

### In your editor
Or you can edit the Gimlet manifest files directly in source code in the `.gimlet` folder.

The two are interchangable for the most part, but the source code handles more fields. See the [full manifest reference](/docs/reference/gimlet-manifest-reference) and the [full reference of the built-in deployment templates](/docs/reference/onechart-reference). The dashboard handles it gracefully if you set a setting that is not known to it.
