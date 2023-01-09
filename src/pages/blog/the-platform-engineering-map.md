---
layout: post
title: The Platform Engineering Map
date: "2022-12-28"
image: map-cover.png
description: "We examined close to fifty tools in the Platform Engineering space. And put them on a map."
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

Covering a single case in the software delivery lifecycle, or all of them, doesn't make a tool right or wrong. Same is true about abstractness.

The greatness of a tool is decided in its own coordinate system: is the design coherent? Is it easy to use? Does it handle a curveball elegantly, or does the abstraction collapses spectaluarly? These questions are much better indicators to tell if a tool is good or not. 

This map on the otherhand is useful to quickly grasp a tool's scope and vision compared to other tools in the space. To not compare apples with oranges. For example a tool dedicated for testing environments like Okteto should not be compared with a tool with great emphesis on day two operations like Backstage.

And without further due, here is the final image! Enjoy!

![The Platform Engineering Map](/full.png)

ps.: since this is a large number of tools, we keep the right to be wrong. If you think a tool was missjudged, do reach out and we are happy to be corrected.

ps.: tools' relative position within a category does not mean they are less or more abstract than the other. Tools within the same category, like "Dev Focused Abstraction" has roughly the same level of abstraction, their vertical position is just a matter of comfortable placement.

## Tools

### DIY tools

DIY tools, or do it yourself tools, as the name suggests are building blocks of internal platforms. These typically open-source tools are used by platform engineers to build internal developer platforms for their company.

They have the lowest level of abstraction among all the tools, they introduce primitives that can be used to build platforms. Substantial platform engineering work is required to construct a robust end-to-end workflow based on them.

#### Backstage

```
URL:      https://backstage.io
Funding: Open-Source
```

Backstage is the platform engineering darling as of early 2023. With it's growing community and adoption base, platform engineers are building their internal dev platforms featuring Backstage as their GUI.

Backstage's portal approach is highly extensible, and there are a growing number of community plugins available.

It is placed in the DIY tool category as even a basic installation needs coding.

#### roadie.io

```
URL:      https://roadie.io
Founded:  2020
HQ:       Dublin, Ireland
Team:     1-10
Funding:  N/A
```

Roadie.io is a Backstage SaaS.

It simplifies, setup and maintenance for Backstage.

#### FluxCD

```
URL:      https://fluxcd.io
Funding: Open-Source
```

Flux is a graduated CNCF project.

It is one of the most popular GitOps tools that is responsible to keep the clusters in sync with the desired system state stored in git.

Flux is a modular toolset and very flexible in the hands of platform engineers. It is a DIY tool as it is doing a tremendous job in getting the foundation right for internal developer platforms, but higher level abstractions must be crafted for developers operate Flux at scale.

#### Carvel

```
URL:      https://carvel.dev/
Funding: Open-Source
```

"Carvel provides a set of reliable, single-purpose, composable tools that aid in your application building, configuration, and deployment to Kubernetes."

If you are looking for a Helm and Kustomize alternative. Among other things.

### PaaS tools

Platform-as-a-Service, or PaaS tools have the highest level of abstraction. They are full platforms and are highly opinionated. They take developers hands at the beginning of the workflow and try to cover all possible usecases. Heroku was a PaaS.

PaaS tools are often proprietary software and priced together with compute resources. They are the most polished tools but it is often not known what is the underlying technology. If you want to extend a PaaS in ways that it is not optimized for, you are often in bad luck.

PaaS tools are highly opinionated and you adopt them by fully accepting their approach. They don't require platform engineering work, therefore I skip elaborating the tools, just list them for reference. PaaS tools are also missing from the Platform Engineering Map for the same reason.

- Brimble
- Scalingo.com
- qoddi.com
- fly.io
- Render
- Railway
- Northflank
- platform.sh
- Dokku
- Tsuru.io
- amazee.io

### Inventory tools

The class of inventory tools are the tools that don't hide the underlying complexity, instead they try to make complexity managable by providing an overview. If you see a tool that lists all Kubernetes pods or configmaps, it is likely an inventory tool.

Their power is in giving you a comprehensive list of what is in the platform. They don't hide the complexity, instead they make complexity managable at scale by providing the inventory of various resources, their status, and configuration data.

Classic container management systems provided for operations people are typically inventory tools. 

#### Octopus Deploy

```
URL:      https://octopus.com
Founded:  2012
HQ:       Brisbane, Australia
Team:     101-250
Funding:  $172,5M
```

Octopus deploy is one of the bigger and older players in this space. It was founded back in 2012 and its roots were in the .Net community.

Essentially it is a deploy tool with various deploy targets and customizable deployment processes.

It is a procedural tool where you have to piece together the deployment process step by step to deploy to test and production environments. Priced per deployment target.

#### Harness

```
URL:      https://harness.io
Founded:  2016
HQ:       San Francisco, California
Team:     501-1000
Funding:  $425M
```

Harness started out as a CI/CD tool back in 2016 but today it aims at a much larger slice of the software delivery lifecycle. In their own words Harness is "CI, CD & GitOps, Feature Flags, Cloud Costs, and much more"

It is a modular system, that reflects in the pricing too. Priced per module in a bit convoluted way.

It is notable that Harness also tries to address day-2 operations with modules to track cloud costs and handling feature flags.

#### plural.sh

```
URL:      https://plural.sh
Founded:  2021
HQ:       New York, United States
Team:     1-10
Funding:  $7M
```

With Plural you can deploy and manage 3rd party open-source tools in production.
It's offering is unique among the listed tools.

While its marketplace is not big at this point, the offering can become valuable. Data focused open-source applications in particular are not easy to self-host, but companies are looking to save cost by hosting data analytics tools themselves.

In essence Plural writes all the Helm, Terraform, and YAML needed for the 3rd party applications that is than sits in your git repository. 
They mention that the configuration is "fully ejectable" that lowers the overall risk of going with them.

Priced at $400 per cluster with a $50 seat price on top.

Plural reminds us of Bitnami.

#### Shipyard

```
URL:      https://shipyard.build
Founded:  2020
HQ:       Brooklyn, New York
Team:     1-10
Funding:  $2.3M
```

"A New Environment for Every Pull Request"

Shipyard works with existing Docker Compose files and hosts the preview environments on their infrastructure.

Their GUI adds possibilities to manage your compose files and alter them prior to deployment.

#### ArgoCD

```
URL:      https://argoproj.github.io/cd/
Funding:  Open-Source
```

ArgoCD is a graduated CNCF project.

It is one of the most popular GitOps tools that is responsible to keep the clusters in sync with the desired system state stored in git.

ArgoCD's traction can be traced back to the fact that it has a GUI that is often exposed to developers, often in read only mode, so they can navigate Kubernetes resources.

ArgoCD fills a similar role in developer platforms as FluxCD. Argo covers more usecases and has a few higher level abstractions but platform engineering work is required to address all developer workflows.

#### Weave Gitops

```
URL:      https://github.com/weaveworks/weave-gitops
Funding:  Open-Source
```

Weave Gitops is an open-source GUI for FluxCD.

It embodies the inventory style approach to the fullest: it lists FluxCD primitives in table views that allows quick overview and management.

#### Portainer

```
URL:      https://portainer.io
Founded:  2020
HQ:       Auckland, New Zealand
Team:     51-100
Funding:  $13.4M
```

A container management platform.

Portainer follows a classic infrastructure first approach that best serves operations people.

#### Spinnaker

```
URL:      https://spinnaker.io
Funding:  Open-Source
```

Spinnaker was one of the first tools to target the continuous deployment space.

It wraps the CI process, that builds the deployable software artifacts, and allows the user to design sophisticated deployment workflows like blue-green deployments.

Spinnaker feels a bit dated in terms of resource requirements and self-hosting experience.

#### VMWare Tanzu

```
URL:      https://tanzu.vmware.com
```

VMWare's container management platform.

#### Redhat Openshift

```
URL:      https://www.redhat.com/en/technologies/cloud-computing/openshift
```

Redhat's container management platform.

### Tools with developer focused abstractions

Tools with developer focused abstractions try to abstract the complexity of modern day infrastructure by using concepts developers are comfortable with. Implementation details are often hidden in the background, and common usecases are emphasized in a simplified view.

These systems are typically built on open-source tools and with the right knowledge you can still get to the underlying layers. As a Platform Engineer, you still have to know what is underneath to operate these tools.

Platform Engineering is largely aiming to produce this class of tools. If you see an abstracted workload specification, an application model Kubernetes CRD, you are likely dealing with a developer focused abstraction.

#### Okteto

```
URL:      https://www.okteto.com
Founded:  2018
HQ:       San Francisco, California
Team:     11-50
Funding:  $18M
```

"Instantly spin up production-like dev environments in the cloud for every developer."

Okteto is focusing on developer's inner-loop. The feedback loop that developers use to write and test code. The challenge in the inner-loop is that it has to be tight, otherwise developers lose the flow. 

Okteto is trying to keep the inner-loop tight by deploying dev environments in the cloud and showing code changes live as soon as developers hit save. It works with existing cloud native resources like Helm charts, Docker Compose files and Kubernetes manifests.

Okteto is not dealing with production usecases.

#### garden.io

```
URL:      https://garden.io
Founded:  2018
HQ:       Berlin, Germany
Team:     11-50
Funding:  $18M
```

Garden.io has a workload definition format that you can use to deploy to test and production environments. You can describe multiple services in the garden.io workload definition format and use the CLI to spin things up.

Has plugins to deploy to Docker and Kubernetes, and supports hot-reload to assist developer's inner-loop workflows.

Call them for pricing.

#### ReleaseHub

```
URL:      https://releasehub.com/
Founded:  2019
HQ:       San Francisco, California
Team:     1-10
Funding:  $22.9M
```

"On-demand production like environments"

RelaseHub has an environment as a service approach, where you can define your environments based on templates for Docker Compose or `package.json` files.

They have their own service definition format that can be generated from Docker Compose, with the possibility to run custom code, Terraform, or Amazon's CDK.

Contact them for pricing.

#### ambassador

```
URL:      https://getambassador.com/
Founded:  2014
HQ:       Boston, Massachusetts
Team:     11-50
Funding:  $42.2M
```

Ambassador has a product line to support teams in a wide range of tasks.

Telepresence is a developer inner-loop tool, where devs can hit save and see their code changes in deployed environments.

They have networking products for Kubernetes's Ingress and Gateway APIs, and a developer platform product called Ambassador Cloud. It is a gitops based development platform that features a clickops approach. ClickOps is an approach where your clicks result in trackable, infrastructure-as-code changes in git.

#### Codefresh

```
URL:      https://codefresh.io/
Founded:  2014
HQ:       Mountain View, California
Team:     51-100
Funding:  $43M
```

Codefresh, originally a CI/CD tool, is an innovative fast-mover in the GitOps space.

It is a CI system with a hosted ArgoCD for gitops based software delivery. They composed ArgoCDs abstractions in a way that covers the missing bits from gitops. Bits that platform engineers would need to do in vanilla ArgoCD installations.

Starts from $49 per seat per month. Sadly the gitops platform can't be used separately as pricing entangles Codefresh's CI with their gitops platform.

#### Gimlet.io

```
URL:      https://gimlet.io/
Founded:  2020
HQ:       Budapest, Hungary
Team:     1-10
Funding:  Bootstrapped
```

Gimlet is a gitops based CD tool with platform component management features.

Gimlet has a thin workload definition format on top Helm and Kustomize.
It is built on top of FluxCD and composes FluxCD abstractions in a way that covers the missing bits from gitops. Bits that platform engineers would need to do in vanilla FluxCD installations.

Its dashboard features a clickops approach, where your clicks result in trackable, infrastructure-as-code changes in git.

Free to self-host, SaaS pricing is not available at this point.

#### skaffold.dev

```
URL:      https://skaffold.dev/
Funding: Open-Source by Google
```

It is a "inner-loop" tool that helps developers to stay in the flow. Skaffold shows code changes live on the cloud as soon as developers hit save.

#### getdeck.dev

```
URL:      https://getdeck.dev/
Founded:  N/A
HQ:       Germany
Team:     N/A
Funding:  N/A
```

A CLI that creates reproducible Kubernetes environments for development and testing. Production usecases are skipped on purpose: "Getdeck does not interfere with production-close Kubernetes systems. It also does not support production deployments."

It works with your existing yaml based workload definitions.

#### score.dev

```
URL:      https://score.dev
Funding:  Open-Source
```

Score.dev is a recent open-source hit. Reached 7000 Github stars in just a couple of months.

It is a workload definition that can be translated to various deployment targets like Docker Compose, Kubernetes and more.

It is a building block for platform engineers, and may have the possibility to emerge as a worload definition standard. Currently there are only just a few adopters at the time of writing.

#### kubevela

```
URL:      https://kubevela.io
Funding:  Open-Source
```

Developers define applications in Kubevela's workload specification and use Kubevela's tooling to deploy it to various environments.

Kubevela introduces and implements OAM, the Open Application Model workload definition.

#### dyrector.io

```
URL:      https://dyrector.io
Founded:  2020
HQ:       Budapest, Hungary
Team:     1-10
Funding:  N/A
```

Dyrector.io has a dashboard first approach to application deployment. You can define products, set their version and deploy them on-demand. Dyrector.io aims to be the source of truth for workload definitions, which can be managed on the GUI or with JSON based APIs.

Dyrector.io has 3rd-party open-source tool templates to deploy well known tools of the ecosystem like Gitlab and Wordpress.

#### devtron.ai

```
URL:      https://devtron.ai
Founded:  N/A
HQ:       India
Team:     11-50
Funding:  $12M
```

Devtron has a large vision, in their words they are a "Tool integration platform for Kubernetes".

- They have a Helm chart that serves for a workload definition
- Devtron can be installed with an embedded CI platform.
- Devtron integrates deeply with ArgoCD to implement GitOps for gitops based continuous delivery.

Devtron has great support for application debugging, they bring together Kubernetes events and manifests, applications logs and basic metrics in one view.

#### Humanitec

```
URL:      https://humanitec.com
Founded:  2018
HQ:       Berlin, Germany
Team:     11-50
Funding:  N/A
```

Humanitec is a proprietary SaaS tool that popularized the Internal Developer Platform, IDP term.

They further the platform engineering trend by organizing the first ever PlatformCon, and they are also the ones who created the Platform Engineering Slack group. They are also the founder-leader of the score.dev workload specification project.

Humanitec has a declarative workload specification format that is rendered into environment configurations on-demand.

It has a GUI first approach and it stores workload definitions in its database, being the source of truth for environment definitions.

#### Armory Cloud

```
URL:      https://armory.io
Founded:  2016
HQ:       San Mateo, California
Team:     101-250
Funding:  $82M
```

Armory is the company behind Spinnaker, the open-source continuous delivery pioneer.

Their new Armory Cloud product on the other hand is not a Spinnaker SaaS. In their own words, "No, CD-as-a-Service is a brand new declarative deployment offering, initially targeting Kubernetes. It aims to simplify common use cases we’ve seen while helping elite development organizations succeed with Spinnaker."

Armory Cloud is built on top of ArgoCD and Argo Rollouts.

#### Kubero

```
URL:      https://kubero.dev
Funding:  Open-Source
```

Basically Kubero is a Kubernetes operator with a UI, API, and CLI.

Kubero comes with an integrated CI/CD pipeline.

Addons are deployed with Kubernetes Operators which are configurable over the UI.

#### Waypoint

```
URL:      https://www.waypointproject.io/
Funding:  Open-Source project of Hashicorp
```

Hashicorp's tool to cover the deployment and platform engineering space.

It has an app-centric abstraction and supports multiple deploy targets: k8s, ECS and lambda.

It also supports application monitoring usecases.

#### devfile.io

```
URL:      https://devfile.io
Funding:  Open-Source
```

"Take control of your development environment."

It is a workload specification for development usecases.

#### DevSpace

```
URL:      https://devspace.sh
Funding:  Open-Source
```

"Automate your deployment workflow with DevSpace and develop software directly inside Kubernetes. "

It is a "inner-loop" tool that helps developers to stay in the flow. Code changes are reflected live on the cloud as soon as developers hit save.

#### Lagoon.sh

```
URL:      https://lagoon.sh/
Funding:  Open-Source
```

"A system that allows developers to locally develop their code and their services with Docker and run the exact same system in production. The same container images, the same service configurations and the same code."

#### Mia Platform

```
URL:      https://mia-platform.eu
Founded:  2016
HQ:       Lombardia, Italy
Team:     101-250
Funding:  N/A
```

#### Shipa

```
URL:      https://shipa.io
Founded:  2019
HQ:       Santa Clara, California
Team:     11-50
Funding:  $3.8M
```

"It’s all about the application."

Shipa also features its own workload definition, puts great emphesis on policies for secure application configuration.

Shipa spans CD and infrastructure, facilitating deployment, policy-setting, and observability.

Pricing is $5 per app.

#### keptn

```
URL:      https://keptn.sh
Funding:  Open-Source
```

Keptn provides ready-made deployment pipelines.

It's highly opinionated approach allows it provide high level application operations metrics, SLOs, and metric based canary releases.
