---
title: Steps to upgrade Gimlet to v1.0.0
date: '2024-09-13'
Description: How to upgrade Gimlet from v0.26.0 to v1.0.0
---

## Prerequisites

- The manifests you install Gimlet with are part of gitops. Check [the production setup](/docs/self-host/production-setup#add-gimlet-configuration-to-git) guide to put your manifests to gitops.

## Update the Gimlet image version

Update the Gimlet image tag:

```diff
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: gimlet
  namespace: infrastructure
spec:
  ...
  values:
    containerPort: 9000
    image:
      repository: ghcr.io/gimlet-io/gimlet
-     tag: v0.26.1
+     tag: v1.0.0-beta.11
      pullPolicy: IfNotPresent
```

## Change the Github Setup URL

Navigate to Github to your Gimlet Github Application settings screen.

Locate the *Setup URL* setting the change the URL path from `/settings/installed` to `/installed`

Without this change, you won't be able to log in.

## Import the repos you want to deploy with Gimlet

The repositories view in Gimlet 1.0 shows only the repos that you have imported explicitly.

When Gimlet first starts up, import the repos you want to work with.

!["Import repositories to Gimlet"](/docs/screenshots/import-repos.png)

## Upgrade your `-infra` repo stack version

Update your Gimlet stack version to the latest.

Use the Gimlet CLI for this, and follow [this guide](/docs/environment-settings/component-updates#manual-updating).

Without upgrading to the latest version, agent communication will have issues.

## Update the `AGENT_KEY`

In your `-infra` repository, update the `AGENT_KEY` variable in the `helm-releases/gimlet-agent.yaml` file.

The new value should be an API key that you create on the `/settings` page. You can follow the `agent-<envname>` naming convention.

Without the new key, the agent can't communicate with Gimlet.

## Changes in Gimlet manifests.

You use [Gimlet manifests](/docs/deployment-settings/deployment-configuration#the-gimlet-manifest) to set application deployment settings.

The image build policy used to be an implicit value, it was inferred from the image settings.

In 1.0, we made the image build strategy explicit: `static`, `dynamic`, `buildpacks`, `dockerfile`.

Update your Gimlet manifests accordingly.

You can use the deployment [config edit](/docs/deployment-settings/deployment-configuration#editing-deployment-configs) feature on the dashboard, or you can [use your editor](/docs/deployment-settings/deployment-configuration#in-your-editor).

### Example
```diff
  image:
    dockerfile: Dockerfile
    repository: 127.0.0.1:32447/{{ .APP }}
    tag: '{{ .SHA }}'
+   strategy: dockerfile
+   registry: containerizedRegistry
```

{% callout %}
`registry: dockerRegistry` is deprecated. Use `registry: containerizedRegistry` instead.

{% /callout %}

## We are here to help

If you need assistance, reach out to us on [Discord](https://discord.com/invite/ZwQDxPkYzE).
