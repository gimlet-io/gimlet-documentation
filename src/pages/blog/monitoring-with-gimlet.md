---
layout: post
title: Practical Guide for Monitoring with Gimlet
date: '2024-06-20'
image: monitoring-with-gimlet.jpg
description: If you deploy with Gimlet, you're able to integrate Prometheus, Grafana and Loki to monitor your infrastructure. Here's how. 
---

Even though Gimlet is a deployment tool, you can integrate the most popular monitoring tools with it. Find out how to configure your monitoring stack with Gimlet, and how you can get the most out of your Grafana dashboards and Loki logs.

Each monitoring tool that you can integrate with Gimlet are responsible for different aspects of monitoring.

- Prometheus collects the metrics you can turn into data to monitor your stack.
- Grafana turns metrics gathered by Prometheus into interpretable data, such as graphs.
- Loki is a log aggregation service. Logs are useful to investigate events occurring in your infrastructure.

## Configuring Prometheus with Gimlet

If you’d like to integrate your Prometheus instance with Gimlet to track the metrics of the apps deployed with it, navigate to your environment’s settings by clicking the Environments button in the menu bar on top.

Select the environment where you’d like to gather metrics by clicking on the card of the environment.

In the environment configuration screen, select the Metrics tab. Here you can enable Prometheus and make Prometheus setting changes. The settings will show in yaml format immediately. You can take a look at them with the Review changes button where you can verify them.

If you’d like to learn more about Prometheus config settings, you can read about them in Gimlet’s documentation.

### Prometheus Best Practices

Prometheus iterates both static and dynamically discovered targets and scrapes the `/metrics` endpoint every 15 seconds. There are three types of metrics in Prometheus: gauges, counters, and histograms.

Gauges represent a single value that can arbitrarily go up or down. Imagine it like a car’s speedometer.

A counter is an increasing value. Alone it’s not useful information, but the steepness of the increase is useful. This can be utilized with Prometheus’ `rate` function. You can find out more about the `rate` function in the documentation of Prometheus.

Histograms are a bit more complex metrics, as they’re not standalone values. These are basically counters, but each value has an `le` label. Take a look at the example below to better understand them:

```
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="0.1"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="0.2"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="0.4"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="1"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="3"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="8"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="20"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="60"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="120"}
prometheus_http_request_duration_seconds_bucket{handler="/metrics", le="+Inf"}
```

In the example, `le="1"` refers to requests handled under 1 second, and `le="0.4"` shows the number of requests handled under 0.4 seconds.

Histogram values can be useful when they’re distributed into heatmaps in Grafana.

If you’d like to learn more about advanced Prometheus usage, read the Gimlet Book section about it.

## Configuring Grafana with Gimlet

Similar to Prometheus settings in Gimlet, you need to navigate to the environment configuration screen. This time, instead of the Metrics tab, click Logging.

The Grafana setting changes you make should be verifiable in yaml format with the Review changes button next to the Save button on the top right. To learn more about Grafana settings in Gimlet, read our documentation.

To be able to use Grafana with Gimlet, you’ll need an API key which you can generate [this way](https://grafana.com/docs/grafana/latest/administration/api-keys/).

### Grafana Best Practices

The two most important usages of Grafana are alerts and dashboards.

#### Grafana Alerts

You can configure alerts in Prometheus, as well, but Grafana alerts are easier to create. Good alerts have two key characteristics:

- They provide context and enough information about what happened, the possible causes and suggestions about what needs to be done.
- A good alert is actionable. If an alert isn’t actionable, it’s not needed.

#### Grafana Dashboards

In our experience, it’s for the better if you start out with templated dashboards. You can clone and turn them into service specific ones later. Be careful, though, because templated dashboards might become slow if they track too many items.

#### Charts in Grafana

Bookings are worth visualizing with Grafana. You can do so by creating two charts, one for booked CPU and another one for memory.

Load and CPU data also make sense to be turned into graphs.

It’s also a good idea to visualize Pod restarts.

Disk space is another piece of information that’s useful in a dashboard.

#### Kubernetes and Grafana

You can use templated dashboards to monitor Kubernetes resources. The most important charts visualize memory and CPU usage. This way you can spot increased resource usage of a pod. Ingress traffic is another important thing to check with charts that track requests per second and ingress success rate.

#### Templated Dashboards for Traffic

Nginx has a templated dashboard, which gives a comprehensive view about all the ingress traffic. If you use Linkerd, the Linkerd Top Line dashboard gives important details about all the traffic between the container workloads, which is useful when you’re assessing the health of your applications.

## Loki Integration with Gimlet

Loki can be integrated in the same tab of environment configs as Grafana. Just enable it and configure storage settings, such as retention, persistence and size.

### Loki Best Practices

You can turn Loki logs into alerts by applying functions on the queries you have – you can learn more about Loki queries and LogQL [here](https://grafana.com/docs/loki/latest/query/log_queries/).

A couple of functions:
- `rate(log-range)`: Calculates the number of entries per second. Example for an unusually high rate of entries: `rate({namespace="default"}[5m])`. Example for a specific error message showing up in entries: `rate(namespace="default"} |= "MyException"[1m])`.
- `bytes_rate(log-range)`: Calculates the number of bytes per second for each logging stream.
