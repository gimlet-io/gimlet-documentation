---
layout: post
title: How we built our SaaS platform on Kubernetes and Hetzner
date: "2023-03-08"
image: saas-early-access.png
description: "Hetzner is 5 times cheaper for us than the hyperscalers. This blog posts enumerates the how and why we built our SaaS on a discount bare metal provider. Gotchas included."
---

Hello everyone, Laszlo here, the founder of Gimlet.io 👋. In this blog post I try to address all possible aspects of how and why someone builds a SaaS platform on Kubernetes and Hetzner in early 2023 and not on one of the hyperscaler cloud providers.

It is an interesting time, as while we were building the Gimlet SaaS, David Hennemier Hansen, also known as DHH has also broke ground besides leaving large cloud providers and they are going to leave AWS in favor for a managed data ceneter. Well to put one thing down we are not starting a movement here, but in this post I certainly want to express why this move makes sense for us.

So, first things first, why Hetzner?

## Why Hetzner?

I don't want to drag it out too long: it is price.

We built our compute nodes on the EX43 model, the newest staple machine of Hetzner. The hexa-core, Alder Lake CPU with 64GB RAM and 2x512GB NVMe SSD comes in at 52.1 EUR hosted in Hetzner's German datacenter. No VAT in our case.

Comparing this to
- AWS's `m6a.2xlarge` and `m6i.2xlarge` instances costing $281 and $312 respectively in `ew-west-1`
- and Google Cloud's `c3-standard-8` and `n2-standard-8` comes in $277 and $311 in `europe-west4`

there is a significant price advantage on Hetzner's side.

And that's only comparing to eight virtual CPU cores. If we factor in the number of disk IOPS we get from a bare metal server, the at least double memory size, and the fact that we are getting not eight virtual CPUs, but six real CPU cores with twelve threads, Hetzner being 5 times cheaper is an understatement.

But not all things are equal, Hetzner being five times cheaper comes at a price. We are missing out on features that hyper scalers provide.

## What are we losing by not hosting on one of the big clouds?

We only need a few things to run our platform, and among those the things that we miss the most on Hetzner are:

- first and foremost we need Kubernetes, we would use managed Kubernetes if it would be available
- we need a highly available SQL database, but RDS or CloudSQL is not available
- we need networking and security products and secure defaults that hyperscalers get right. We have to work even for the basics on Hetzner.

### Addressing the missing managed Kubernetes

Managing Kubernetes is not something we prefer doing and usually we rely on the managed Kubernetes offerings, but on Hetzner it is just not possible.

Even though we manage Kubernetes ourselves, we tried to minimize the moving parts. Simplicity is key for us therefor we chose to use the k3s project. K3s is a fully compliant Kubernetes distribution with a few notable simplifications:

- k3s is using an SQL database as storage, so we don't have to deal with etcd at all.
- It is packaged as a single binary and it has a matching configuration experience. All cluster operations - like managing certificates - are reduced to either an argument of the k3s binary, or a CLI command
- It is secure by default with reasonable defaults for lightweight environments

There is one notable architectural decision that eased our Kubernetes cluster building: we keep our state in SQL databases, so we did not have to install and maintaint a clustered filesystem for persistent volumes.

Even though we cut many of the difficult parts short in our setup, we expect a few days of maintenance, sometimes immediate action in the coming year that will be releated to our self-managed Kubernetes. But nodes die even on managed Kubernetes offerings and disks fill up. Maybe in our case rebuilding a node will be longer (starting a new node, running Ansible scripts, etc) than on hyperscalers, but the number of issues and the severity we don't expect to become unmanagable. Follow up blog post is due 12 months from now.

### No RDS, what now?

### Networking and security, the most work


## Building infrastructure from the ground up on bare metal in 2023




## How Hetzner has been so far?


