---
layout: post
title: The Many Shades of Platform Engineering
date: "2022-12-28"
image: 
description: ""
---

2022 was the year when Platform Engineering broke out of the niches and it became the term to take home from devops conferences.

In 2022
- Gartner [recognized](https://www.gartner.com/en/articles/what-is-platform-engineering) Platform Engineering as a trend
- the first PlatformCon - a conference dedicated for platform engineering - [took place in June](https://thenewstack.io/what-we-learned-at-platformcon/)
- and more and more engineers identify with the platform engineer role.

But what is platform Engineering?

## Platform Engineering

Platform Engineering is a natural progression of DevOps. 

While in DevOps much of the focus is on the cultural aspects, Platform Engineering is focusing on providing self-service capabilities with automated infrastructure operations. Its promise is to optimize the developer experience in order to accelerate product teams’ delivery of customer value.

No single tool can support product teams throughout the whole software delivery lifecycle. Instead product teams use a series of tools to deliver software, and there is much friction in how those tools interoperate.

Platform Engineering is the work that teams put in to craft a seamless path accross multiple tools, so developers can focus on delivering customer value.

## Prior art

While Platform Engineeing got onto Gartner's Hype Cycle for Emerging Tech in 2022, it is not without prior work.

Practitioners of Platform Engineering often refer to a 2019 book: Team Topologies - by Matthew Skelton and Manuel Pais, where the split and interaction patterns between stream aligned teams and platform teams are defined. A working model for Platform Engineering to accelerate software delivery.

![Hype Cycle for Emerging Tech, 2022](/hype-cycle.png)

## Looking at close to fifty Platform Engineering tools

Implementing team structures alone is of course not enough. It is only a foundation to build your company's developer platform, and maybe [a prescriptive, roadmap based approach](https://www.infoq.com/articles/platform-engineering-roadmap/) serves us better this time than DevOps's vague goals.

This article comes with the motivation to help you orienting in the Platform Engineering space. See what tools are out there and what approaches they take to help teams to achieve the platform engineering promise.

We looked at close to fifty tools, and this is far from a comprehensive list.
This shows how active this space is, but doesn't tell how different the tools are. They differ a lot in their approach and also in their scope.

On one side this is not surprising, Kelsey Hightower stated that robust end-to-end workflows must be opinionated. On the other hand this makes it even more important to understand the different starting points and vision each tool has.

Luckilly by looking at fifty tools, some patterns emerge.

{% raw link="https://twitter.com/kelseyhightower/status/1099731286950727680?ref_src=twsrc%5Etfw" %}
{% /raw %}

## Patterns emerge

This article doesn't try to be a reference of all Platform Engineering tools. Instead, it wants to be compass between the various approaches. By examining close to fifty tools, we started seeing some patterns and we decided to put the tools on a map.

On the *X* axis we display the phases of the software delivery licecycle, on the *Y* axis we show how abstract a tool is.

![Platform Engineering tool map](/scales.png)

With this map you can quickly judge what usecases a tool covers, and whether it does it by composing existing approaches or tries to hide technology with new abstractions.

Let's take a quick example.

![Okteto on the Platform Engineering map](/okteto.png)

With Okteto, you can spin up production-like dev environments in the cloud and have your code changes instantly reflected in this deployed environment.

Okteto is clearly aiding the development usecase, so developers can stay in their inner development loop and not fiddle with environment settings. Okteto tries to do this with a new paradigm that is tailored for developer workflows. It is building on existing technologies like Helm charts, but organizes things in a way to aid dev's life. Hence it was placed in the "Dev focused abstraction" category.

## The Platform Engineering Map

Before showing you the final map with all the fifty tools, let me state just one more thing: there is no right or wrong place on this map.

Covering a single case in the software delivery lifecycle, or all of them doesn't make a tool right or wrong. Same is true about abstractness.

The greatness of a tool is decided in its own coordinate system: is the design coherent? Is it easy to use? Does it handle a curveball elegantly, or does the abstraction collapses spectaluarly? These questions are much better indicators to tell if a tool is good or not. 

This map on the otherhand is useful to quickly grasp a tool's scope and vision compared to other tools in the space. To not compare apples with oranges. For example a tool dedicated for testing environments like Okteto should not be compared with Backstage, a tool that is a service catalog with great emphesis on day two operations in large teams.

And without further due, here is the final image! Enjoy!

ps.: since this is a large number of tools, we keep the right to be wrong. If you think a tool was missjudged, do reach out and we are happy to be corrected.


{% wide %}
![The Platform Engineering Map](/full.png)
{% /wide %}

## DIY tools

DIY by platform teams, you piece everything together from OSS tools, you need to self host

### Backstage

```
URL:      https://backstage.io
Founded:  Open-Source
```

### roadie.io

```
URL:      https://roadie.io
Founded:  2020
HQ:       Dublin, Ireland
Team:     1-10
Funding:  N/A
```

## PaaS tools

There is a high level dev focused abstraction, you don't know what is underneath, or how it works. Even if you want to know it, or extend it as a platform eng. We don't explore PaaS tools here, just mention them.

brimble
scalingo.com
qoddi.com
fly.io
render
railway
Northflank
platform.sh
Dokku

## Inventory tools

Tools that require understanding of the underlying infrastrcucture. These tools don't hide the complexity, instead they make it managable at scale by providing the inventory of various resources, their status and configuration data.
container management: ops focus, inventory style

### Octopus Deploy

```
URL:      https://octopus.com
Founded:  2012
HQ:       Brisbane, Australia
Team:     101-250
Funding:  $172,5M
```

Octopus deployBig old player, with .net rootshave been around since 2012

there is what is released in what version overview?pipeline logic? how does it integrate with CI?database provisionion, or config management only? config only
metrics, what kind?been around a while, so not kubernetes first, seriously not omg
bit supports k8s, how?with kubeconfig files

pricing: per deployment target75USD a monthpersonal account for 10usdin cloud, self host for free for 5 targets tops

This is a deploy tool with many various deployment targets and custom processes

Why the placement?
It is a procedural deploy tool. You have to piece it together and need to understand platform components.
You can deploy to test and production envs, hence spanning accross..

### Harness

```
URL:      https://harness.io
Founded:  2016
HQ:       San Francisco, California
Team:     501-1000
Funding:  $425M
```

harnessFounded in 2016"The Modern Software Delivery Platform™""CI, CD & GitOps, Feature Flags, Cloud Costs, and much more"Pricing is not easy to grasp, is it per module?
no documentation is availableprobably for large customers with many needs
This is a CI/CD and everything platform

Why the placement?
Harness has many modules, CI/CD to cover deployment to test and production envs, then modules that help operating your platform, cloud costs, feature flags, etc, hence spanning into day2.
It is a deploy tool at core, hence the 

### plural.sh

```
URL:      https://plural.sh
Founded:  2021
HQ:       New York, United States
Team:     1-10
Funding:  $7M
```

deploying infra tools"Build and scale infrastructure within minutes"for managing 3rd party oss tools, "operating third-party OSS apps."
400USD per cluster + 50 per user"Plural writes all the Helm, Terraform, and YAML needed for your desired infrastructure with plural build, and deploys it all into production with plural deploy. All configuration within your Plural Git repository is fully ejectable from the platform and ecosystem."
plus cost management, and recommendationsops people focused
this is good, just like stackthis is gimlet stack

### Shipyard
on demand envs
it works with a docker compose file
and basically just a gui override of existing compose files
adds nothing at all.

```
URL:      https://shipyard.build
Founded:  2020
HQ:       Brooklyn, New York
Team:     1-10
Funding:  $2.3M
```

## Tools with dev focused abstractions
Tools that try to abstract parts of the complexity, using a language devs are comfortable with. As a Platform eng, you still have to know what is underneath to operate these platforms.
application model (CRD), proprietary formats: score.dev, garden.io, Gimlet's thin model

### Okteto

```
URL:      https://www.okteto.com
Founded:  2018
HQ:       San Francisco, California
Team:     11-50
Funding:  $18M
```

"Instantly spin up production-like dev environments in the cloud for every developer."Now this is a dev feedback loop company, "inner loop""directly with a deployed application and see your code changes live on the cloud as soon as you hit save."
not production? no prod
dev envs, preview envsremote dev env"bunch of data that needs cloning, we ensure you get a realistic replica of your production environment quickly and with minimal effort.""Okteto works with your already existing Helm charts, docker-compose, or Kubernetes manifests right out of the box!" uhworks from compose.covers the inner loop and the preview envs

### garden.io

```
URL:      https://garden.io
Founded:  2018
HQ:       Berlin, Germany
Team:     11-50
Funding:  $18M
```

garden.iodev test and production envsown k8s style yaml format - like every tool, multiserviceone descriptor and a cli that can spin this upscore.dev is a competitork8s and docker pluginshot reloadbasically score.devnot a bad approachoss CLIcall us for pricinggimlet competitor

### ReleaseHub

```
URL:      https://releasehub.com/
Founded:  2019
HQ:       San Francisco, California
Team:     1-10
Funding:  $22.9M
```

environment as a service"on-demand production like environments"
project templatesfrom docker-compose or package.jsonproprietary env format:
-"As easy as writing a Docker Compose"- "Support running any custom code you need, including Terraform""Templates can be generated from Docker Compose files on your behalf"with callouts to TF and CDK.. blah. Look slike you do the heavy lifting, they just give you the framework
call us pricing
no word on production. How does production happens then? issue for the whole class of tools

### ambassador

```
URL:      https://getambassador.com/
Founded:  2014
HQ:       Boston, Massachusetts
Team:     11-50
Funding:  $42.2M
```

inner loop tool with telepresenceedge stack is an ingress/gateway api, also with telepresence? No emissary ingressAnd there is ambassador cloudbuilt on argo?clickops support for emissayr, telepresence and argocloud starts with inner-loop.. and telepresence, it is entangled
portainer"container management"
classic infra first approach? like openshift
what about app abstraction? nonedoesn't try to abstract away infra, more ops focused than devlower layers of a platform, not the platform imo
codefreshci+hosted argogitopsper seat pricing, 50 USd a month
pricing is entangled with CI, you can't get pure CD/argo"report from GigaOm, Codefresh is an innovative fast-mover and a leader in the GitOps space. Customers have been using and loving our GitOps features since 2020, and we continue to add capabilities that only a unified CI/CD platform can provide"argo abstractions. It is a tool, not a platform.category: CI/CD

Why the placement?
telepresence is inner loop and dev abstraction
Ambassador cloud is clickops and abstracts
gaeway prodicyt is not abstract, but who cares

### gimlet

```
URL:      https://gimlet.io/
Founded:  2020
HQ:       Budapest, Hungary
Team:     1-10
Funding:  Bootstrapped
```

Kubernetes/gitops/Flux based CD tool with platform component managementthin proprietary format on top of helm + kustomize for service config
with a clickops approachno multiservice depliyment / configurationCloud pricing unkonwn, oss free
patr.cloud
deploy fast, all kind of workloads
hosting included, probably a PaaSstart with dockerfile, push an image, then configure on gui

### skaffold.dev
inner loop tool

```
URL:      https://skaffold.dev/
Founded:  Open-Source by Google
```

### getdeck.dev

```
URL:      https://getdeck.dev/
Founded:  N/A
HQ:       Germany
Team:     N/A
Funding:  N/A
```

A CLI that creates reproducible Kubernetes environments for development and testing."score.dev, garden.io ballpark"Getdeck does not interfere with production-close Kubernetes systems. It also does not support production deployments."again, dead end"Getdeck does not provide these resources. These manifests (mostly YAML-files) have to exist in any way"you do the yaml authoring

### score.dev

```
URL:      https://score.dev
Funding:  Open-Source
```

application modeljust like garden.io
can be compiled to different deployment targets
building block to DIY platforms, or perhaps an emerging standard
single service, not multiservice

### kubevela
```
URL:      https://kubevela.io
Funding:  Open-Source
```

OAM Open application model
proprietary format, disguised as a standard, OAM is only implemented by Kubevela CRD 

### dyrector.io

```
URL:      https://dyrector.io
Founded:  2020
HQ:       Budapest, Hungary
Team:     1-10
Funding:  N/A
```

### devtron.ai

```
URL:      https://devtron.ai
Founded:  N/A
HQ:       India
Team:     11-50
Funding:  $12M
```

"Tool integration platform for Kubernetes"
"Helm apps"
CI/CD + gitops
operations metrics
They have a onechart like chart
they integrate CI/CD
bunch of inventory views
wants to be everything

### Humanitec

```
URL:      https://humanitec.com
Founded:  2018
HQ:       Berlin, Germany
Team:     11-50
Funding:  N/A
```

IDP
Enable developer self-service
proprietary tooling
makers of a movement
investment, size
not OSS

---

### armory cloud
spinakker as a service

### spinakker.io


Tsuru.io
Kubero
waypoint
argocd
fluxcd
flux oss
weave gitops

https://carvel.dev/
Set of tools to build a platform out of.
DIY

Vmware Tanzu
Redhat Openshift
K8s provisioning
The enterprise K8s platform options.

octant.dev
Tanzu's backstage?

devfile.io
Take control of your development environmentapplication model, only dev

devspace.sh

Lagoon.sh
application delivery platform"A system that allows developers to locally develop their code and their services with Docker and run the exact same system in production. The same container images, the same service configurations and the same code."

amazee.io
Proprietary

Mia platform

https://getporter.org/

tanka.dev
Tanka"Tanka is a composable configuration utility for Kubernetes. It leverages the Jsonnet language to realize flexible, reusable and concise configuration."
Grafana

shipa


keptn


Todo product card

Todo flying ToC
