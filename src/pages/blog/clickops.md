---
layout: post
title: ClickOps
date: "2023-03-16"
image: clickops.png
description: "Doing cloud operations by clicking on a dashboard that generates a stream of infrastructure as code changes."
---

## Definition

ClickOps.

Not as in clicking on the AWS console, but doing cloud operations by clicking on a dashboard that generates a stream of infrastructure as code changes.

## Prior art

We did not invent the clickops term. In fact, it has been used sporadically to describe the practice when people work with cloud resources through the cloud provider's web console.

We are latching our clickops definition on [Corey Quinn's recent blogpost](https://www.lastweekinaws.com/blog/clickops/). Corey articulates that the problem with AWS's web console is not that it is a GUI, but that it doesn't work together with infrastructure as code approaches. He continues with a vision:

> I envision a world in which I can set things up in the AWS console [..] via the magic of clicking things. The provider captures what I set up and renders it into code or configuration somewhere, [..], then automatically generates diffs in the correct repository, or updates its [..] environment as it exists at the current moment.

We share this vision at Gimlet. And we believe that the state of the art in the gitops ecosystem allows us to achieve it.

By 2023, gitops became the de-facto operation model of the Kubernetes ecosystem. We are standing on the shoulders of open-source giants. Weaveworks and the ArgoCD project put immense effort in popularizing the gitops approach, while the Crossplane project opened new horizons in what is possible, by allowing the creation of cloud resources as custom Kubernetes resources.

## ClickOps over GitOps, the tech

The tech matters. It sets the scope where we think clickops is viaable.

Definitions are often not prescriptive enough, so here we are: when we talk about clickops, we mean clickops over gitops. And when we say gitops, we mean Flux and ArgoCD to deliver Kubernetes resources, custom and built-in.

If you are not familiar with these tools, you will surely make sense the following yaml bits:

- this is how you bind your application to a URL

- this is how you add a persistent volume to your application

- and this is how you create an Amazon RDS resource

All very descriptive yaml files. Controllers on Kubernetes are looking for these resources, and if you create a new one, they will create the matching infrastructure resources. Kubernetes resources and their matching controllers reduced infrastructure privisioning into putting yaml files into a git repository.

This declarative approach allows clickops tools to just render a stream of yaml templates based user clicks. How those cloud resources come to life is handled by the ecosystem.

## Scope matters

We don't think that a general purpose, visual Terraform editor should be the focus of clickops. Or every problem under the platform engineering umbrella should be solved by dashboards.

But we do think that there is a subset of problems in platform engineering where clickops shines: automating common tasks in deploying and configuring web applications:

- configuring and deploying new applications
- on-demand application deploy and rollback
- progressive delivery
- spinning up QA environments
- provisioning application dependencies like cloud databases

Ultimately, clickops must know its boundaries. Otherwise it will turn into an endless effort of replicating the possibilities of existing devops tools.

## The musts

transparency: PRs

robustness: must respect changes made outside of clickops

## Tools using the clickops approach

- https://gimlet.io
- Codefresh
- Ambassador Labs
