---
layout: post
title: Steps we took for a basic ARM64 support in Buildpacks
date: '2023-09-14'
image: "three-commands.png"
description: "Learn Kubernetes troubleshooting with this step-by-step guide. List pods, analyze logs, describe pods, and monitor events in real-time."
---

Buildpack's value prop is to not have a dockerfile

Since we try to make Kubernetes digestable for devs, Buildpacks seemed like a nice addition

We are also keen on our onboarding experience. Running on a local cluster, deploying an app with just a few steps is the shortest way to show value with Gimlet.

But local run means Macbook Airs with ARM64 architectures.

But turned out Buildpacks does not really have ARM64 support os of Q3 2023.

And it doesn't seem that it is nearby either:
https://github.com/GoogleCloudPlatform/buildpacks/issues/227
https://github.com/orgs/paketo-buildpacks/discussions/58#discussioncomment-4345153

## What we have

Buildpacks on ARM64 works for nodejs apps

## What we built on

The lifecycler works on ARM
https://buildpacks.io/docs/app-developer-guide/build-an-arm-app/
Good foundations

But all buildpacks need to support ARM, we could only do it for nodejs

## Steps

good news is that we had to CI it
https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml

### You need images for ARM

https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml#L49

- base
- builder
- runner

Just some plumbing nothing special

### Buildpacks Armify
binaries recompile to arm

dependencies should be arm as well.
Updated a bunch of Node installer urls
https://github.com/paketo-buildpacks/node-engine/compare/main...gimlet-io:node-engine:main


### Buildpacks meta data for build and run image

## In action

screen.studio arm64 build demo

CAX21
