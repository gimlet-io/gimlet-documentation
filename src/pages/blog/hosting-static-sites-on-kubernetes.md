---
layout: post
title: Hosting static sites on kubernetes
date: "2023-04-08"
image_social: agyuvalverebre.jpg
description: "There is a meme here somewhere. But as kubernetes is becoming *the* deployment platform, there are legitimate cases to deploy your static site on it. We show you how to."
---

{% tweet link="https://twitter.com/memenetes/status/1587127455495618563" %}
{% /tweet %}

There is a meme here somewhere.

But as kubernetes is becoming *the* deployment platform, there are legitimate cases to deploy your static site on it. We show you a simplified way to do it.

But first, let's review your options outside of kubernetes.

## Deployment options outside of kubernetes

It is a fact that there are simpler deployment options for static websites and single page webapps than kubernetes. This section is an introduction to such options.

### Netlify

Netlify is a vertically integrated solution. You provide your source code from git, and customize the build command. Netlify in turn deploys your application with CDN and SSL. It is the standard in static site deployment.

#### Pros
- easy to get started
- only need to provide your source code from git and your build command
- no need to CI scripts
- SSL, CDN
- Preview deployments

#### Cons
- since it is easy to get started with it, often part of shadow IT, operating outside of your compliance processes

### Github, *Pages
A well integrated solution with simplified configuration paths. You build assets with CI, then place them accoring to the conventions. CDN and SSL is automatically configured.

#### Pros
- Integrated into source code management
- Simplified configuration paths

#### Cons
- Requires CI script
- Somewhat limited options

### Amazon S3, cloud buckets

Another popular solution to deploy static sites is to use cloud buckets. You upload the built assets to a bucket, enable website hosting on the bucket, further configure the bucket to enable SSL encryption.

#### Pros
- Highly scalable
- Same provider as with other cloud resources

#### Cons
- Considered as a go to option, but it does require scripting and configuration work
- Access configuration is somewhat cryptic
- SSL options often not as streamlined as with Let's Encrypt
- CDN often configured separatelly

![Noooooo](/noooooo.jpeg)

## Reasons to deploy static sites to kubernetes

Kubernetes is the standard at your company
Compliance, network / access options 

ssl is there
CDN is probably not, but your main usecases are docs, and random things. Not webshops

## Deploying to Kubernetes from scratch

Vanilla kubernetes requires a lot of work to deploy a static site.

- CI script to build
- dockerfile
- yaml
- given you have a platform
- cdn



## Using the `onechart/static-site` Helm chart to deploy static sites

{% tweet link="https://twitter.com/memenetes/status/1516084604666581003" %}
{% /tweet %}

our approach:
build command
git url

## If you need configuration options

## Conclusion
