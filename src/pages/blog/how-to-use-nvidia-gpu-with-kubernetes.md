---
title: Deploy Ollama and Open WebUI to Remote Kubernetes Cluster with Nvidia GPU
date: '2024-04-25'
Description: Cloud GPUs are the most accessible for trying out LLMs for your specific use case. Here's how you can set up a cluster for usage with a GPU.
image: kubernetess-remote-gpu-ollama-blog-post-cover.jpg
toc: false
---

Using a remote Nvidia GPU with Kubernetes is a convenient way to run LLMs from anywhere while being able to keep costs as low as possible. Here's how you can get started with remote GPUs and Kubernetes.

By default, Kubernetes can't manage GPU resources, but demand for such use cases has been on the rise. In this blog post, we'll guide you through the entire process from setting up the cluster to deploying Ollama and Open WebUI to try a model.

## Our Provider of Choice

For reference, we're listing a couple of cloud GPU providers here, but it's worth to note that outside of Civo, only Google Cloud Provider offers clusters with Nvidia A100s, the rest are VMs with the GPUs.

Our provider of choice is Civo, and this blog post describes steps with their CLI.

It's also worth mentioning that AKS clusters with GPUs start at a $480 monthly average with T4s. However, Azure offers A100 VMs, as well.

Check out the pricing and configuration comparison for A100 VMs and clusters in the table below:

| Provider    | Connection | CPU     | RAM    | Storage      | Price    | Kubernetes |
| ----------- | ---------- | ------- | ------ | ------------ | -------- | ---------- |
| Civo        | PCIe       | 8 cores | 64 GB  | 200 GB NVMe  | $1.78/hr | Yes       |
| Lambda Labs | PCIe       | 30 vCPU | 200 GB | 512 GB SSD   | $1.29/hr | No       |
| DataCrunch  | SXM        | 22 vCPU | 120 GB | Not included | $1.75/hr | No       |
| GCP-GKE  | PCIe        | 12 vCPU | 85 GB | Not included | ~$2800/mo | Yes       |

## Getting Ready

After you've got your GPU at the provider of your choice, it's time to install dependencies to make it compatible with Kubernetes. For this blog post, we went with CIVO.

### Pre-Requirements

Moving forward, a couple of things you'll need to complete the steps described:
- kubectl
- Helm
- Register to CIVO (You get $250 credit for free)

### Launch Cluster

First, let's install the CLI of CIVO. We'll use this to make changes on the cluster. Use either of the commands below:

```
brew install civo
```

Or:

```
curl -sL https://civo.com/get | sh
```

Now run the command below to launch a cluster with an Nvidia A100-40 GPU:

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

If you can't launch the `g4g.kube.small` cluster, you can check out the available Nvidia GPU resources if you run this command:

```
civo sizes ls --region=LON1 | grep Nvidia | grep Kubernetes
```

The output should be something like this:

```
| an.g1.l40s.kube.x1 | Small - Nvidia L40S 40GB       | Kubernetes |  12 |  131072 | 200 |
| g4g.kube.small     | Small - Nvidia A100 80GB       | Kubernetes |  12 |  131072 | 100 |
```

Before moving forward, verify that the cluster is up:

```
k get nodes
k get pods
```

If you run `k describe node`, you'll see that the node doesn't know about the GPU. You'll need to install the Nvidia device plugin.

## Device Dlugin Installation
In order to be able to utilize the GPU with a Kubernetes runtime, you'll need to install the [device plugin]() with the command below:

```
kubectl apply ds.yml
```

## Deploy Ollama and Open WebUI

Ollama is a local inference framework, which you can now deploy to your cluster.

```
helm repo add ollama-helm https://otwld.github.io/ollama-helm/
helm repo update
helm upgrade -i ollama ollama-helm/ollama --create-namespace --namespace ollama -f ollama.yaml
k logs -f deploy/ollama
```

We used the settings in [ollama.yaml]() as seen here to set up Ollama for GPU usage.

In [this repository](https://github.com/otwld/ollama-helm), you can find a Helm chart you can configure for your needs.

### Deploy the Model

To be able to use models, you can deploy Open WebUI. Open WebUI has similar looks to ChatGPT, and you can add models with a very Docker-esque experience. So it's best to perceive Open WebUI as Docker Hub for models, as the models themselves are Docker images.

Run the command below to install Open WebUI:

```
kubectl create namespace open-webui
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-pvc.yaml
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-service.yaml
kubectl apply -f https://raw.githubusercontent.com/open-webui/open-webui/main/kubernetes/manifest/base/webui-deployment.yaml   
```

To make Open WebUI accessible from the internet, port-forward with the command below.

```
kubectl port-forward svc/open-webui-service 8888:8080 -n open-webui
```

Now enter `http://localhost:8888` in your browser, and sign up to Ollama. After you're done, change Ollama's URL to  `http://ollama.ollama.svc.cluster.local:11434`. This way you'll be able to add models available through Ollama, such as Llama 3.

![remote-nvidia-gpu-ollama-Open-WebUI-url-config.png](./public/remote-nvidia-gpu-ollama-Open-WebUI-url-config.png)

### Cleanup

In case you're done experimenting, it's suggessted to clean things up to avoid unnecessary costs from piling up. In order to do so, just delete the cluster and the volumes.

Run these commands to delete the cluster and the volumes that belong to them:

**- Delete Volumes:**

```
civo volumes delete <VOLUME-NAME> --region <REGION-NAME>
```

**- Delete Cluster:**

```
civo kubernetes delete <cluster-name>
```

## Summary

This blog post guided you through the process of setting up a language model on a Kubernetes cluster operating with a GPU. You achieved this by configuring the GPU for usage with Kubernetes runtimes, then deployed an inference - Ollama -, and Open WebUI to access models on the internet.
