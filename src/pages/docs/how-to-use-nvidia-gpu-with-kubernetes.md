---
title: Remote Nvidia GPU Access With Kubernetes
Description: Working title, no description yet
---

**Lead asdfasdfasdfasdfdas**

Using a remote Nvidia GPU with Kubernetes is a convenient way to run machine learning models from anywhere while being able to keep costs as low as possible. Here's how you can get started with remote GPUs and Kubernetes.

By default, Kubernetes can't manage GPU resources, but there are certain tools that can help you achieve GPU usage with Kubernetes runtimes. In this blog post, we'll guide you through the process from setting up the GPU to deploying an Ollama model.

## What You'll Need

Just a couple of requirements to complete this tutorial:

- Cloud available Nvidia A100 GPU
- Ubuntu 22.04
- `containerd` installed
## Select the Provider

First of all, it's useful to find out where to host your model. For this blog post, we chose an Nvidia A100 with 40 GBs of VRAM. Check out the pricing and configuration comparison at the table below:

| Provider    | Connection | CPU     | RAM    | Storage      | Price    |
| ----------- | ---------- | ------- | ------ | ------------ | -------- |
| Civo        | PCIe       | 8 cores | 64 GB  | 200 GB NVMe  | $1.78/hr |
| Lambda Labs | PCIe       | 30 vCPU | 200 GB | 512 GB SSD   | $1.29/hr |
| DataCrunch  | SXM        | 22 vCPU | 120 GB | Not included | $1.75/hr |
## Getting Ready

After you've got your GPU at the provider of your choice, it's time to install dependencies to make it compatible with Kubernetes.

### Install Nvidia Driver

Verify that an Nvidia driver is installed on Ubuntu 22.04 by running the command below:

```
cat /proc/driver/nvidia/version
```

If there isn't a driver installed, run the command below for automatic installation of the GPU you have:

```
sudo ubuntu-drivers install --gpgpu
```

You can select a specific driver, as well, `535-server` for example. Run to install the driver:

```
sudo ubuntu-drivers install --gpgpu nvidia:535-server
```

When complete, install this additional component:

```
sudo apt install nvidia-utils-535-server
```

### Install Nvidia Container Toolkit

Now you'll need to install Nvidia's container toolkit. Run the command below to configure the repository:

```
curl -fsSL https://nvidia.github.io/libnvidia-container/gpgkey | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
  && curl -s -L https://nvidia.github.io/libnvidia-container/stable/deb/nvidia-container-toolkit.list | \
    sed 's#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g' | \
    sudo tee /etc/apt/sources.list.d/nvidia-container-toolkit.list
```

Update the packages list:

```
sudo apt-get update
```

Now install the toolkit:

```
sudo apt-get install -y nvidia-container-toolkit
```

### Configuring `containerd` for GPU Usage

Now that the drivers and the toolkit is installed, we need `containerd` configured for Kubernetes to recognize the GPU.

Container toolkit can automate this process. To do so, run the command below:

```
sudo nvidia-ctk runtime configure --runtime=containerd
```

Now restart `containerd` with:

```
sudo systemctl restart containerd
```

## Kubernetes stuffffffs

- Kubernetes config

## Deploy an Ollama Model

For this post, we chose the [Midjourney Prompt Generator](https://openwebui.com/m/hub/midjourney-prompt-generator:latest) model. Its use case is to describe what you'd like to get with plain English sentences, and the model will generate a prompt that you can use with Midjourney to get the result you want.

- Deploy the model

## Summary

This blog post guided you through the process of setting up a language model using a GPU on a Kubernetes cluster. You achieved this by configuring the GPU for usage with runtimes in Kubernetes by installing the driver, Nvidia's container toolkit and configuring `containerd`, then you deployed and hosted the model on the cluster.
