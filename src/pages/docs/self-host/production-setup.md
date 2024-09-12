---
title: Production Setup
description: Getting ready Gimlet for production use
---

On this page you can learn how to make your Gimlet installation production ready.

If you prefer to use our cloud platform, [sign up here](https://app.gimlet.io).

## Prerequisites
- A running Gimlet installation that you created by following the [Self-Host Quickstart](/docs/self-host/quickstart)
- Access to your DNS provider admin page
- Your environments don't have the "built-in" label on them, aka you have gitops repositories for your environments, hosted on Github.
- A backup of your Gimlet SQLite database

#### Make a backup of your Gimlet SQLite database

```bash
kubectl cp \
  gimlet-678dff7dbc-6q2r2:/var/lib/gimlet/gimlet.sqlite \
  gimlet.sqlite
```

Where `gimlet-678dff7dbc-6q2r2` is your Gimlet pod name.

## Add Gimlet configuration to git

Gimlet keeps application and infrastructure configuration in git. It is only fair if Gimlet itself is managed the same way.

When you followed the quickstart, you used a one-liner. It was the perfect way to get you started, but to make the setup production ready, it is time to put the Gimlet configuration itself into git.

### Which git repository?

Gimlet manages two git repositories per environment: one for application manifests and one for infrastructure manifests. Gimlet itself is typically put into the `gitops-<env>-infra` gitops repository of your production environment.

### Where to place it?

`helm-releases/gimlet.yaml`

### Full manifest

```yaml
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: gimlet
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: gimlet
  chart:
    spec:
      chart: onechart
      version: 0.70.0
      sourceRef:
        kind: HelmRepository
        name: onechart
      interval: 10m
  values:
    containerPort: 9000
    image:
      repository: ghcr.io/gimlet-io/gimlet
      tag: v1.0.0-beta.11
      pullPolicy: IfNotPresent
    probe:
      enabled: true
      path: /health
    volumes:
      - name: data
        path: /var/lib/gimlet-dashboard
        size: 1Gi
      - name: repo-cache
        path: /tmp/gimlet
        size: 5Gi
    vars:
      API_HOST: "http://gimlet.default.svc.cluster.local:9000"
      HOST: "http://127.0.0.1:9000"
    resources:
      requests:
        cpu: "50m"
        memory: "500Mi"
      limits:
        cpu: "2000m"
        memory: "2000Mi"
```

### Push to git and let gitops deploy Gimlet

Once Gimlet is deployed by gitops, copy the backed up database file back into the container.

```bash
kubectl cp \
  gimlet.sqlite \
  gimlet-678dff7dbc-6q2r2:/var/lib/gimlet/gimlet.sqlite
```

Then restart the pod.

At this point, Gimlet should be part of gitops, and should operate through port-forward, just like before.

Next is to make Gimlet available on a real domain.

## Production domain

This document works with the assumption that your Gimlet will be reachable on `https://gimlet.yourcompany.com`.

### Set HOST Variable

`helm-releases/gimlet.yaml`

```diff
    vars:
-     API_HOST: "http://gimlet.default.svc.cluster.local:9000"
-     HOST: "http://127.0.0.1:9000"
+     API_HOST: "https://gimlet.yourcompany.com"
+     HOST: "https://gimlet.yourcompany.com"
```

### DNS Entry

Configure Ingress resource in `helm-releases/gimlet.yaml`

```diff
  values:
    ...
    volumes:
      - name: data
        path: /var/lib/gimlet-dashboard
        size: 1Gi
+   ingress:
+     annotations:
+       kubernetes.io/ingress.class: nginx
+     tlsEnabled: true
+     host: gimlet.yourcompany.com
```

Then [locate the ingress IP address](/docs/deployment-settings/dns#set-dns-records), and add an A record to your DNS pointing to it. 

Then access Gimlet on `https://gimlet.yourcompany.com`.

### Update Github OAuth URLs

Navigate to the Github Application settings page on Github. There is a quick link in Gimlet on `/settings`.

Update
- Homepage URL
- Callback URL
- Setup URL (optional)

to `https://gimlet.yourcompany.com/...` with keeping the url paths the same.

### Using PostgreSQL

Gimlet works with SQLite by default, and [can be configured](/docs/reference/gimlet-configuration-reference#database-configuration) to be used with PostgreSQL.

Migration from SQLite to PostgreSQL is not documented today, but we are happy to assist on [Discord](/docs/learn-more/contact-us).

## Further configuration

You can control many aspects of Gimlet with environment variables. See the [full reference](/docs/reference/gimlet-configuration-reference).
