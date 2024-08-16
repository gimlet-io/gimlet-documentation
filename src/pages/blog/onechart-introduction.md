---
title: 'OneChart: The Shortcut to Streamlining Helm Configurations'
date: '2024-08-15'
description: "Helm is a useful tool to adopt Kubernetes. OneChart as a general purpose Helm chart makes the process even simpler."
toc: false
author: Geri Máté
authorAvatar: /geri.png
---

Sometimes it feels like Kubernetes can only be mentioned sitting next to a campfire, sharing scary stories. It undermines the bottomline of every debate about Kubernetes: it’s as complex as the user makes it.

As a result of this phenomenon, beginners are hesitant to do anything with Kubernetes. But in reality, there are tools that can help engineers of all expertise get onboarded with it. One of those abstractions is Helm.

## What is Helm?

Helm is a package manager for Kubernetes. These packages come in the shape of Helm charts, which are yaml files that specify applications, their components, dependencies and configuration options. Helm charts are made of templates and values. Using these charts, Helm renders the manifests Kubernetes will use to run the applications defined.

With Helm, operations or DevOps teams are able to solve many problems:
- Multiple resource management
- Inconsistent environments
- Manual deployments and version management
- Knowledge gap across teams

But one of the most important ways Helm is useful is helping users to get onboarded with Kubernetes. As an abstraction, Helm hides many capabilities of Kubernetes that are simply not useful in the most common use cases. These are usually the main characters in Kubernetes scary stories.

## The Advantages of Helm

Helm offers a complex solution to the problems mentioned above. It allows engineers to package all the resources into one, reusable chart. The reusability can eliminate inconsistency across environments by parameterization of certain values (replica count, for example).

When operations teams use Helm, they can take their charts and utilize them easily without following myriads of manual steps to deploy applications. Since Helm usage is usually accompanied by GitOps principles, it enables teams to efficiently manage versions, and rollback to previously used versions when an outage occurs.

Charts are also useful when teams would like to share configurations with each other. Another case when knowledge gaps are filled with helm charts is when a team member who made the chart leaves the company, because the chart works as a single source of truth under GitOps principles.

These benefits should be factored in when an engineer is contemplating whether Helm is useful to get started with, as it’s a widely adopted technology in organizations.

## New Problems Emerge with Helm

All of this sounds good, but as always, all solutions come with some trade-offs. These originate from Helm’s nature as an abstraction. It hides settings and mechanisms to enable users less familiar with Kubernetes to make things possible for the most common use cases. This makes customization awkward with Helm charts.

At the same time, this means the manifests rendered from helm charts share a lot of common traits that can be reproducible with a general purpose solution.

## What is OneChart?

[OneChart](https://github.com/gimlet-io/onechart) is a general purpose Helm chart. The concept behind OneChart is that, as already mentioned, most Kubernetes manifests are very similar, therefore they can be reproduced with a comprehensive chart, such as OneChart, designed for web applications.

OneChart includes the 30 most commonly used deployment variations. With its help, you’re able to tailor charts to your needs in the existing templates and values, without the need to add anything to them.

### How to Get Started With OneChart?

Get the OneChart repository with the command below.

```
bash
helm repo add onechart https://chart.onechart.dev
```

You can set your image name and version to generate the boilerplate.

```
bash
helm template my-release onechart/onechart \
  --set image.repository=nginx \
  --set image.tag=1.19.3
```

After setting OneChart up, you can use the usual Helm commands, such as `template`, `install` and `upgrade`. If you’re not familiar with these commands

- `helm template`: Generates and saves manifests. Note that it doesn’t apply or connect manifests to a cluster. For syntax, refer to the example above, or [Helm’s documentation](https://helm.sh/docs/helm/helm_template/).
- `helm install`: Creates an instance of a chart that’s also applied to a cluster. Refer to [Helm’s documentation](https://helm.sh/docs/helm/helm_install/) for syntax.
- `helm upgrade`: Modifies the already existing instance running on a cluster. Refer to [Helm’s documentation](https://helm.sh/docs/helm/helm_upgrade/) for syntax.

Using these commands you can apply and update manifests rendered by Helm charts made with OneChart.

### How to Deploy an Application With OneChart

Since OneChart is a general purpose helm chart, users need to edit the templates and values. As you can see in the example below, the image name can be configured in an easy way.

![Image variables in OneChart's values.yaml](onechart-values-yaml-image-variables.png)

In the yaml, you can use the `repository` and the `tag` variables to configure your application. You’re also able to configure applications from private repositories, but in that case you’ll need to specify the path to the application.

You can specify environment variables, as well, as you can see below.

![Environment variables in OneChart's values.yaml](onechart-values-yaml-env-variables.png)

As you can see, `values.yaml` contains `ingress` settings, as well. It defines [nginx](https://nginx.org/en/) by default in the `kubernetes.io/ingress.class` annotation, and specifies the `host` where the application will be available.

## What Else Can Be Done With OneChart?

OneChart implements the most common Helm use cases. Deploying an application is just the tip of the iceberg. You’re able to configure secrets in different ways, set up HTTPS certificates, add volumes of all kinds, and the list goes on.

You can give OneChart a better look in [Gimlet’s documentation](https://gimlet.io/docs/reference/onechart-reference), or you can give it a try by cloning it from [GitHub](https://github.com/gimlet-io/onechart).
