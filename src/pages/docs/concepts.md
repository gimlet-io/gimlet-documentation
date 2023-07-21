---
title: Concepts
pageTitle: Gimlet - Concepts
description: "Gimlet brings an opinionated layer on top of 
the Flux and Helm. It eliminates much of the decisions you have to make and gets you a developer platform on top of Kubernetes."
---

## Workflow

![Gimlet workflow](/flow.svg)

## Components

![Gimlet components](/components.svg)

### Dashboard
The Gimlet dashboard is where you get a comprehensive overview quickly, manage your gitops environments and deployment configurations. 

- It displays realtime Kubernetes information about your deployments.
- It also displays realtime git information about your branches, commits and their build statuses.
- You can initiate releases and rollbacks.
- Configure your applications for deployment.
- Initiate and manage gitops environments.

Gimlet is the release manager. It has write access to the gitops repositories, and encompasses all logic related to making releases, rollbacks, and gathering audit logs.

Working on the dashboard is gitops: every action you take on the dashboard is backed by a git commit. The integration is bi-directional, custom git or CLI actions show up in the dashboard too and don't break the UI.

### CLI
Gimlet CLI is a command line tool with the same power as the Gimlet Dashboard.

- You can look at the release log.
- You can initiate releases and rollbacks.
- Configure your applications for deployment.
- Initiate and manage gitops environments.
- Render manifests locally for debug purposes.

### Agent
Gimlet Agent runs in your Kubernetes clusters. It collects realtime information about your deployments, and forwards it to the Gimlet dashboard.

### CI
Your CI/CD pipelines implemented with your preferred provider. Gimlet fits into your existing pipelines, replacing your deploy steps. See how [How Gimlet integrates to CI workflows](TODO).

### Flux
Flux is the gitops controller. It pulls manifests from gitops repositories and applies them on Kubernetes clusters.

### Gitops repositories

Regular git repositories with the role to hold all Kubernetes resource definitions of your applications and infrastructure components.

### Application repositories
Where your application source code lives.
