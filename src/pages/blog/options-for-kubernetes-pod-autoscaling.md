---
title: "Kubernetes pod autoscaling - how it should have been from the get go"
date: "2023-01-23"
description: "The Gimlet.io team put together this blog to show common usecases of autoscaling: based on CPU, custom Prometheus metrics and RabbitMQ queue length. Furthermore, we are aiming to clear up the differences between the Horizontal Pod Autoscaler (HPA), the Prometheus Adapter and KEDA."
image: 
author: Youcef Guichi
authorAvatar: /youcef.jpg
---

Kubernetes autoscaling was supposed to be easy. Even though one of the selling points of Kubernetes is scaling, the built-in autoscaling support is basic at best. You can only scale based on CPU or memory consumption, anything more advanced requires additional tooling that is often not trivial.

The Gimlet.io team put together this blog to show common usecases of autoscaling:
- based on CPU
- custom Prometheus metrics
- and RabbitMQ queue length

Furthermore, we are aiming to clear up the differences between the Horizontal Pod Autoscaler (HPA), the Prometheus Adapter and KEDA. 

Let's get into it shall we?

First, about the Horizontal Pod Autoscaler (HPA).

## First, about the Horizontal Pod Autoscaler (HPA)
The Horizontal Pod Autoscaler, or HPA in short, is a Kubernetes resource that allows you to scale your application based on resource utilization such as CPU and memory.

To be more precise, HPA is a general purpose autoscaler, but by default only CPU and memory metrics are available for it to scale on.

Its data source is the Kubernetes Metrics API, which by the way also powers the `kubectl top` command, and backed by data provided by the `metrics-server` component. This component runs on your cluster and it is installed by default on GKE, AKS, CIVO and k3s clusters, but it needs to be manually installed on many others, like on Digital Ocean, EKS and Linode.

The HPA resource is moderatelly well documented in the Kubernetes documentation; most headaches arrise when you try to scale on resource metrics other than CPU and memory. In order to scale pods - let's say - based on HTTP metrics or queue length, you need to make the Kubernetes API aware of these metrics. Luckilly there are open-source metrics backends implemented, and the best known is Prometheus Adapter.

## Prometheus Adapter

Prometheus Adapter is a Kubernetes Custom Metrics API implementation which exposes selected Prometheus metrics through the Kubernetes API for the Horizontal Pod Autoscaler (HPA) to scale on.

Essentially you configure the Prometheus Adapter to read your desired metric from Prometheus, and serve it to HPA to scale on. This can be an HTTP request rate, or a RabbitMQ queue length or any metric from Prometheus.

Prometheus Adapter does the job, but in our experience its configuration is cryptic. While there are several blog posts out there explaining its configuration syntax, we could not make it work sufficiently reliably with the our custom metrics scaling needs.

That is essentially why we have brought you here today, to share our experience with a Prometheus Adapter alternative, called KEDA.

So, what exactly is KEDA, and why we prefer it?

## KEDA

KEDA is a Kubernetes operator that is handling a user friendly custom yaml resource where you can define your scaling needs.

In KEDA, you create a `ScaledObject`custom resource with the necessary information about the deployment you want to scale, then define the trigger event, which can be based on CPU and memory usage or on custom metrics. It has premade triggers for most anything that you may want to scale on, with a yaml structure that we think the Kubernetes API could have been made in the first place.

KEDA does two things:
- it exposes the selected metrics to the Kubernetes Custom Metrics API - just like Prometheus Adapter
- and it creates the Horizontal Pod Autoscaler resource. Ultimately this HPA does the scaling.

Now that you have an overview, let's take a step further and show you can autoscale with KEDA!

## Autoscaling based on CPU usage

In order to autoscale your application with KEDA, you need to define a `ScaledObject` resource.

```yaml
apiVersion: keda.sh/v1alpha1
kind: ScaledObject
metadata:
  name: cpu-based-scaledobject
  namespace: default
spec:
  minReplicaCount:  1                                 
  maxReplicaCount:  10
  scaleTargetRef:
    kind: Deployment
    name: test-app-deployment
  triggers:
  - type: cpu
    metricType: Utilization
    metadata:
      value: "50"
```

## Autoscaling based on custom metrics

To use custom metrics, you need to make changes in the `triggers` section:

### Based on custom Prometheus metrics 

```yaml
triggers:
- type: prometheus
  metadata:
    serverAddress: http://<prometheus-host>:9090
    metricName: http_requests_total # Note: name to identify the metric, generated value would be `prometheus-http_requests_total`
    query: sum(rate(http_requests_total{deployment="my-deployment"}[2m])) # Note: query must return a vector/scalar single element response
    threshold: '100.50'
    activationThreshold: '5.5'
```

### Based on RabbitMQ queue length

```yaml
triggers:
- type: rabbitmq
  metadata:
    host: amqp://localhost:5672/vhost
    mode: QueueLength # QueueLength or MessageRate
    value: "100" # message backlog or publish/sec. target per instance
    queueName: testqueue
```

Check the [KEDA](https://keda.sh/docs/2.9/scalers/) official website to see all the scalers.

## Closing words

When we found KEDA, our pains with the Prometheus Adapter were solved instantly. KEDA's simple install experience and readymade scalers allowed us to cover our autoscaling needs, while its straightforward yaml syntax communicates well the scaling intent.

We not just use KEDA ourselves, but also recommend it to our clients and friends. So much so that we integrated KEDA into our preferred stack at Gimlet.

You might also be interested in our open source, gitops based developer platform. We value simple tools like KEDA and brought together a set of open-source tools that make Kubernetes accessible for more people. If you have questions unanswered, autoscaling or anything Kubernetes, [talk to us on our Discord](https://discord.com/invite/ZwQDxPkYzE).
