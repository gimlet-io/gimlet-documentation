---
title: Remote Nvidia GPU Access With Kubernetes
Description: Working title, no description yet
---

**Lead asdfasdfasdfasdfdas**

Using a remote Nvidia GPU with Kubernetes is a convenient way to run machine learning models from anywhere while being able to keep costs as low as possible. Here's how you can get started with remote GPUs and Kubernetes.

By default, Kubernetes can't manage GPU resources, but there are certain tools that can help you achieve GPU usage with Kubernetes runtimes. In this blog post, we'll guide you through the process from setting up the GPU to deploying an Ollama model.

## Our provider of choice

[TODO: fast startup time, point-cloud no hairy IAM network etc.., usually good pricing]

First of all, it's useful to find out where to host your model. For this blog post, we chose an Nvidia A100 with 40 GBs of VRAM. Check out the pricing and configuration comparison at the table below:

| Provider    | Connection | CPU     | RAM    | Storage      | Price    |
| ----------- | ---------- | ------- | ------ | ------------ | -------- |
| Civo        | PCIe       | 8 cores | 64 GB  | 200 GB NVMe  | $1.78/hr |
| Lambda Labs | PCIe       | 30 vCPU | 200 GB | 512 GB SSD   | $1.29/hr |
| DataCrunch  | SXM        | 22 vCPU | 120 GB | Not included | $1.75/hr |

## Getting Ready

After you've got your GPU at the provider of your choice, it's time to install dependencies to make it compatible with Kubernetes.

### Launch cluster

```
brew install civo
```
or
```
curl -sL https://civo.com/get | sh
```

```
civo kubernetes create gpu-cluster \
  --size g4g.40.kube.small \
  --nodes 1 \
  --save --merge --wait \
  --create-firewall \
  --firewall-rules "default" \
  --region LON1 \
  --cluster-type talos
```
[TODO: from https://gimlet.io/blog/budget-managed-kubernetes-options btw]

[TODO screenshot on the dashboard too? it is visual]

or `civo sizes ls --region=LON1 | grep Nvidia | grep Kubernetes`

| an.g1.l40s.kube.x1 | Small - Nvidia L40S 40GB       | Kubernetes |  12 |  131072 | 200 |
| g4g.kube.small     | Small - Nvidia A100 80GB       | Kubernetes |  12 |  131072 | 100 |


Verify cluster is up:
```
k get nodes
k get pods
```

k describe node => node does not know about the GPU

## Pre-reqs

kubectl
helm
register to civo
request quota increase (32GB memory is the quota, the smallest GPU node has 128GB memory)

## Device plugin installation

kubectl apply ds.yml

## Deploy an Ollama Model


```
helm repo add ollama-helm https://otwld.github.io/ollama-helm/
helm repo update
helm upgrade -i ollama ollama-helm/ollama --create-namespace --namespace ollama -f ollama.yaml
k logs -f deploy/ollama
```

```
ollama:
  gpu:
    enabled: true
    number: 1
  models: 
    - llama2
    - gemma

persistentVolume:
  enabled: true
  size: 250Gi
```

https://github.com/otwld/ollama-helm


Deploy the model


```
kubectl create namespace open-webui
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-pvc.yaml
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-service.yaml
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-deployment.yaml   
```

```
kubectl port-forward svc/open-webui-service 8888:8080 -n open-webui
```

Then set Ollama url to `http://ollama.ollama.svc.cluster.local:11434`
(TODO screenshot)


## Summary

This blog post guided you through the process of setting up a language model using a GPU on a Kubernetes cluster. You achieved this by configuring the GPU for usage with runtimes in Kubernetes by installing the driver, Nvidia's container toolkit and configuring `containerd`, then you deployed and hosted the model on the cluster.
