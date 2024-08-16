---
title: 'OneChart: The Shortcut to Streamlining Helm Configurations'
date: '2024-08-15'
description: "Helm is a useful tool to adopt Kubernetes. OneChart as a general purpose Helm chart makes the process even simpler."
toc: false
author: Geri Máté
authorAvatar: /geri.png
---

Sometimes it feels like Kubernetes can only be mentioned sitting next to a campfire, sharing scary stories. It undermines the bottomline of every debate about Kubernetes that it’s as complex as the user makes it.

As a result of this phenomenon, beginners are hesitant to do anything with Kubernetes. But in reality, there are tools that can help engineers of all expertise get onboarded with it. One of those abstractions is Helm.

## What is Helm?

Helm is a package manager for Kubernetes. These packages come in the shape of Helm charts, which are yaml files that specify applications, their components, dependencies and configuration options. Helm charts are made of templates and values. Helm renders the Kubernetes manifests based on these templates and application specific values.

Operations teams are able to solve many problems with Helm:
- Inconsistent environments
- Knowledge gap across teams
- Version management

But one of the most important ways Helm is useful is helping users to get onboarded with Kubernetes. As an abstraction, Helm hides many advanced capabilities of Kubernetes that are irrelevant in the most common use cases. These capabilities are the antagonists in Kubernetes scary stories.

## The Advantages of Helm

Helm offers a holistic solution to the problems mentioned above. It allows engineers to package all the resources into one, reusable chart. The reusability can eliminate inconsistency across environments by parameterization of certain values (replica count, for example).

Furthermore, if Helm usage is accompanied by GitOps principles, it enables efficient version management, and rollback capabilities to previously used versions when incidents occur.

Charts are also useful when teams would like to share configurations with each other and address knowledge gaps within the team.

## New Problems Emerge with Helm

But all solutions come with trade-offs. These originate from Helm’s nature as an abstraction.

Helm hides settings and mechanisms - an otherwise useful feature to enable users less familiar with Kubernetes, but the chart logic can become overcomplicated. The amount of chart configuration options often grow out of proportion, to a degree that is on par with the underlying Kubernetes manifests. Something that is difficult to navigate as an end user, and difficult to maintain for maintainers.

## What is OneChart?

[OneChart](https://github.com/gimlet-io/onechart) is a general purpose Helm chart. The concept behind OneChart is that most Kubernetes manifests are very similar, therefore they can be packaged to a comprehensive chart, such as OneChart, designed for web applications.

OneChart includes the 30 most commonly used deployment variations. By providing values to the chart, you’re able to generate Kubernetes manifests for your application, without writing your own Helm chart or extending existing ones.

### How to Get Started With OneChart?

Get the OneChart repository with the command below.

```bash
helm repo add onechart https://chart.onechart.dev
```

You can set your image name and version to generate the boilerplate.

```bash
helm template my-release onechart/onechart \
  --set image.repository=nginx \
  --set image.tag=1.19.3
```

After setting OneChart up, you can use the usual Helm commands, such as `template`, `install` and `upgrade`. If you’re not familiar with these commands

- `helm template`: Generates manifests from the template with the provided values. Note that it doesn’t apply or connect manifests to a cluster. For syntax, refer to the example above, or [Helm’s documentation](https://helm.sh/docs/helm/helm_template/).
- `helm install`: Creates an instance of a chart that’s also applied to a cluster. Refer to [Helm’s documentation](https://helm.sh/docs/helm/helm_install/) for syntax.
- `helm upgrade`: Modifies the already existing instance running on a cluster. Refer to [Helm’s documentation](https://helm.sh/docs/helm/helm_upgrade/) for syntax.

Using these commands you can apply and update manifests rendered by Helm charts made with OneChart.

### How to Deploy an Application With OneChart

Since OneChart is a general purpose helm chart, users need to edit the templates and values. As you can see in the example below, the image name can be configured in an easy way.

![Image variables in OneChart's values.yaml](/onechart-values-yaml-image-variables.png)

In the yaml, you can use the `repository` and the `tag` variables to configure your application. You’re also able to configure images from private registries.

You can specify environment variables, as well, as you can see below.

![Environment variables in OneChart's values.yaml](/onechart-values-yaml-env-variables.png)

In the example above, the `values.yaml` contains `ingress` settings, as well. OneChart generates general purpose ingress resource with the desired `host`, and you can tailor them to your cluster needs. Like we did with `nginx` in the `kubernetes.io/ingress.class` annotation.

## What Else Can Be Done With OneChart?

OneChart implements the most common Helm use cases. Deploying an application is just the tip of the iceberg. You’re able to configure secrets, set up HTTPS certificates, add volumes of all kinds, and the list goes on.

You can give OneChart a better look in [Gimlet’s documentation](https://gimlet.io/docs/reference/onechart-reference).
