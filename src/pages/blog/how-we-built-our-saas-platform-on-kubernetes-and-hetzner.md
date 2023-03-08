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
- virtual networks and security groups, we had to work even for basic network and host security on Hetzner

### Addressing the missing managed Kubernetes

Managing Kubernetes is not something we prefer doing and usually we rely on the managed Kubernetes offerings, but on Hetzner it is just not possible.

Even though we manage Kubernetes ourselves, we tried to minimize the moving parts. Simplicity is key for us therefor we chose to use the k3s project. K3s is a fully compliant Kubernetes distribution with a few notable simplifications:

- k3s is using an SQL database as storage, so we don't have to deal with etcd at all.
- It is packaged as a single binary and it has a matching configuration experience. All cluster operations - like managing certificates - are reduced to either an argument of the k3s binary, or a CLI command
- It is secure by default with reasonable defaults for lightweight environments

There is one notable architectural decision that eased our Kubernetes cluster building: we keep our state in SQL databases, so we did not have to install and maintaint a clustered filesystem for persistent volumes.

Even though we cut many of the difficult parts short in our setup, we expect a few days of maintenance, sometimes immediate action in the coming year that will be releated to our self-managed Kubernetes. But nodes die even on managed Kubernetes offerings and disks fill up. Maybe in our case rebuilding a node will be longer (starting a new node, running Ansible scripts, etc) than on hyperscalers, but the number of issues and the severity we don't expect to become unmanagable. Follow up blog post is due 12 months from now.

### No RDS, what now?

A managed database is really something that I happily pay a premium for. High-availability, point-in-time backups in a click of a button is not something that is easy to replicate.

Postgresql is also something that is critical for Gimlet's SaaS platform. We keep all state in Postgresql databases. Not just client data, but the Kubernetes control plane is also stored in an SQL database. So we needed to build a highly available, secure Postgresql cluster, and had to handle proper off-site backups.

What gave us confidence in the process is that we had experience in running replicated Postgres clusters back in the pre-Postgres-RDS days. Feels like a lifetime away, but Postgres on RDS is not yet ten years old today.

To keep things simple we built the cluster outside of Kubernetes and containers. Not that it would have been a big issue otherwise, but we would have pinned the Postgres pods onto specific nodes anyways. We didn't opt to clustered Postgres operators, like Patroni, just yet.

There is one significant shortcut that we took here. Failover is designed to be manual at this point. This could be a considerable source of downtime, and we may improve this practice in further iterations of our platform.

It is important to note why we took this risk: to enable automatic failover we would have to write a bulletproof failover script that maxmimizes availability and minimizes data consistency risks. With a bug in the failover automation, we could risk data consistency issues that are potentionally more difficult to handle than downtimes. Basically we optimized for operational simplicity, and a good enough uptime.

Now judging a good enough uptime is comes down to the reader, as Gimlet does not provide an SLA at this point, but let me leave you with two thoughts:

- A 99,5% availability, that is pretty standard in SaaS platform, means a yearly 1.83 days of downtime. A 99% availability means a 3.65 days downtime a year. This last one practically means that our whole team could be on vacation in the jungles of Brazil, travel back to Europe, open their laptops and do the database failover. It goes without saying that we are not planning to travel to the jungles of Brazil without anyobe being on call.

- What SLA Amazon's RDS databases provide? Well, they are kind of mushy on the topic: *"AWS will use commercially reasonable efforts to make each Multi-AZ DB Instance and each Multi-AZ DB Cluster available with a Monthly Uptime Percentage as shown in the table below during any monthly billing cycle"*




### Networking and security, the most work


## Building infrastructure from the ground up on bare metal in 2023




## How Hetzner has been so far?



Follow up blog post due in twelve months.
