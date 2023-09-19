---
layout: post
title: Steps we took for a basic ARM64 support in Buildpacks
date: '2023-09-19'
image: "arm64-buildpacks.png"
description: "Buildpacks does not have ARM64 support as of Q3 2023. Here are the steps we took to create one for NodeJS projects."
---

Buildpack's value is to not have a Dockerfile: you run `pack build` in your source code's folder and Buildpacks builds a container image.

At Gimlet we try to make Kubernetes digestible for devs. Buildpacks seemed like a nice addition to our platform as it allows us to shorten the path to value: our tutorials can be shorter and ultimately devs need to take fewer steps before they can see our gitops based approach in action.

But tutorials and evaluating a platform often means local k3s/kind clusters. And local also means Macbook Airs with an ARM64 architecture. As it turned out **Buildpacks does not have ARM64 support as of Q3 2023**.

And it doesn't seem that it is nearby either:
- [https://github.com/GoogleCloudPlatform/buildpacks/issues/227](https://github.com/GoogleCloudPlatform/buildpacks/issues/227)
- [https://github.com/orgs/paketo-buildpacks/discussions/58#discussioncomment-4345153](https://github.com/orgs/paketo-buildpacks/discussions/58#discussioncomment-4345153)

## What we built

Buildpacks on ARM64 works for NodeJS apps with our builder image.

## What we built on

Buildpacks made the starting point available on ARM64. They compiled the *lifecycler* binary for ARM64 and wrote a [basic guide](https://buildpacks.io/docs/app-developer-guide/build-an-arm-app/) on how one could start porting a buildpack to ARM.

These are good foundations.

What we quickly realized that this is the easy part. For general ARM64 support, all buildpacks must support ARM based builds. That is a gigantic task. We did it for NodeJS, well parts of it, but we see that performing this work for all the buildpacks out there is no small feat. Hence generic support is still far in our opinion, but you can try to replicate the work for other ecosystems based on the steps we took.

## Steps

[We captured](https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml) all steps in our build system, so you can see the steps in action too, besides this blog post.

### You need images for ARM

There are two images in the lifecycle of a Buildpacks build: a builder image and a runtime image.

Our first step was to build these for ARM. There is nothing special about them, just some plumbing for Buildpacks. See the Dockerfile and build in [our CI pipeline](https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml#L49-L78).

### Armify some buildpacks

We realized that we can't create a generic ARM support without recompiling and testing all buildpacks for ARM. Therefore we chose NodeJS as the platform to port.

We took the basic build steps for NodeJS: installing node, running `npm install` and running `npm start` and limited the scope of our buildpack for these. The source code for these build steps are the following buildpacks:
- https://github.com/paketo-buildpacks/node-engine
- https://github.com/paketo-buildpacks/npm-install
- https://github.com/paketo-buildpacks/npm-start 

These repos contain golang applications that perform the in scope steps for NodeJS apps. Recompiling them for ARM was not too difficult, we didn't even need to fork most of them. See the steps here: [https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml#L79-L103](https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml#L79-L103)

But we needed to fork paketo-buildpacks/node-engine as it contained references for NodeJS install binaries. We needed to replace the links for ARM64 node installers, and their checksums in [this commit](https://github.com/gimlet-io/node-engine/commit/7038a75c2378d653f1f14528267d0ca6565b4fc7).

At the end, we needed to add the ARM64 Buildpacks lifecycler to the image.

### Buildpacks meta data for build and run image

We needed to [glue the buildpack](https://github.com/gimlet-io/gimlet/blob/main/docker/image-builder/Dockerfile.arm64#L14-L15) together with some metadata, reference to our images, then [build and publish](https://github.com/gimlet-io/gimlet/blob/main/.github/workflows/publish-image-builder.yml#L112-L118) the images.

## In action

You can try our builder with

```
$ git clone https://github.com/gimlet-io/expressjs-test-app.git
$ cd expressjs-test-app
$ docker run -it --rm -v ${PWD}:/usr/src/project -v /home/laszlo/.docker/config.json:/home/cnb/.docker/config.json ghcr.io/gimlet-io/image-builder:v0.4.2 bash
```

```
$ /cnb/lifecycle/creator -app=/usr/src/project -log-level=debug laszlocloud/my-image

Starting creator...                                                                                                                                           
Parsing inputs...                                                                                                                                             
Warning: No cached data will be used, no cache specified.                                                                                                     
Ensuring privileges...                                                                                                                                        
Executing command...                                                                                                                                          
===> ANALYZING                                                                                                                                                
^[[CTimer: Analyzer started at 2023-09-19T13:43:18Z                                                                                                           
Image with name "laszlocloud/my-image" not found                                                                                                              
Found image with identifier "gcr.io/buildpacks/gcp/run@sha256:2f733606de028816e889d0ce115077a5002eff1df32e580ea26f160f237d640e"                               
Timer: Analyzer ran for 1.976698277s and ended at 2023-09-19T13:43:20Z                                                                                        
===> DETECTING
...

Timer: Saving laszlocloud/my-image... started at 2023-09-19T13:43:27Z
*** Images (sha256:711f3a4d222a4076af1cce4f84e0034141a3d36b432d5fe4a09913ab29716c3f):
      laszlocloud/my-image

*** Digest: sha256:711f3a4d222a4076af1cce4f84e0034141a3d36b432d5fe4a09913ab29716c3f

*** Manifest Size: 3170
Timer: Saving laszlocloud/my-image... ran for 18.583836996s and ended at 2023-09-19T13:43:46Z
Timer: Exporter ran for 21.136994592s and ended at 2023-09-19T13:43:46Z
```


or see it in action on our platform.

We made the demo on Hetzner's CAX21 instance, a 4 core Ampere Altra VM.

TODO: screen.studio arm64 build demo
