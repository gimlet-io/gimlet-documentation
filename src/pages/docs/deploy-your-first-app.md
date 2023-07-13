---
title: Deploy your first app
description: In this guide, you will deploy your application to Kubernetes without writing lengthy deployment manifests.
---

## prereq:
- installation tutorial

## Steps
- repo grant
- CLI install
- env connect
- magic deploy

## Intermediate Result
- Access app with port-forward

## Steps
- we need an ingress controller
  - spin out the built in env to git (1 click)
  - configure the nginx ingress
  - wait for infra repo sync

- Edit default app config
  - we add ingress
  - pull request to the app repo

- magic deploy uses this app config (by convention the one that is called as the repo)

## End result
- we access the app on a nip.io DNS
