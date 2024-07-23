---
title: 'Component updates'
description: |
  Gimlet provides an update stream for your cluster components. Learn how to update your cluster components.
---

After you set up your cluster, Gimlet provides an update stream for your cluster components - something that is often overlooked in marketplaces.

## `stack.yaml` version

In the `gitops-<env>-infra` the `stack.yaml` file holds metadata about the environment.

`stack.yaml` points to the stack template in the `stack.repository` field. It points to a git repository where the stack files are maintained and it is locked to a particular version.

```
---
stack:
  repository: https://github.com/gimlet-io/gimlet-stack-reference.git?tag=v0.8.0
config:
  loki:
    enabled: true
  nginx:
    enabled: true
    host: laszlo.cloud
```

## Automatic updates

Gimlet periodically checks for updates, and opens a Pull Request with the new version to the `gitops-<env>-infra` repository.

![Gimlet files pull requests with Kubernetes component updates](/docs/screenshots/environment-settings/gimlet-io-component-update-pull-request.png)

## Manual Updating

`stack.yaml` points to the stack template in the `stack.repository` field. It points to a git repository where the stack files are maintained.

By default, it is locked to a particular version, therefore every time you run `gimlet stack generate` it works with the same stack version and generates Kubernetes resources accordingly.

```
---
stack:
  repository: https://github.com/gimlet-io/gimlet-stack-reference.git?tag=v0.8.0
config:
  loki:
    enabled: true
  nginx:
    enabled: true
    host: laszlo.cloud
```

`gimlet stack update --check` displays the new versions that can be applied to your stack, while running `gimlet stack update` will update `stack.yaml` to the latest stack version number:

```
$ gimlet stack update

⏳  Stack version is updating to v0.3.0...
✔️   Config updated.
⚠️   Run `gimlet stack generate` to render resources with the updated stack.

📚  Change log:

   - v0.3.0
      • Cert Manager - Just a bugfix release
      • Grafana to 8.0.1 🎉
        • Plenty of goodies, see for yourself: [https://grafana.com/docs/grafana
          /latest/whatsnew/whats-new-in-v8-0/](https://grafana.com/docs/grafana/
          latest/whatsnew/whats-new-in-v8-0/)
      • Ingress Nginx from 0.44 to 0.47
        • Updates NGINX to version v1.20.1
      • Loki - just keeping track of the latest release - nothing major in this
        one.
      • Prometheus
        • Upgrading node-exporters and kube-state-metrics to the latest
      • Sealed Secrets to 0.16.0 - nothing major in this one
```

Important that you run `gimlet stack generate` to generate the updated Kubernetes manifests, as `gimlet stack update` only updates the stack reference in `stack.yaml`.

Make sure to:

- Inspect the changeset,
- Resolve possible conflicts with custom changes,
- Push to git.

## Making custom changes to a stack

Stack templates only go so far, and it is inevitable that you want to amend the generated manifests in slight ways.

`gimlet stack generate` takes your custom changes into account and keeps them even after a configuration change, or an upgrade.

In case your custom change is conflicting with the generated content, you have to do a content merge, that should be familiar from git.

### Example conflict resolution

The bellow output was from a stack that was upgraded from `0.2.0` to `0.3.0` and having a custom change on top of `0.2.0`.

The cluster administrator manually upgraded the ingress nginx version to `3.27.0` to update to a newer version earlier than Gimlet supported it.

Since stack version `0.3.0` also updated the ingress-nginx version, now the cluster administrator has to make a judgment call whether to keep the manually updated version or roll with generated changes.

```
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: ingress-nginx
  namespace: infrastructure
spec:
  interval: 60m
  releaseName: ingress-nginx
  chart:
    spec:
      chart: ingress-nginx
<<<<<<<<< Your custom settings
      version: 3.27.0
=========
      version: 3.33.0
>>>>>>>>> From stack generate
      sourceRef:
        kind: HelmRepository
        name: ingress-nginx
      interval: 10m
```

Many code editors have conflict resolution tooling. With a click of a button, the cluster administrator can accept the changes coming `From stack generate`.
