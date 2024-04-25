---
title: 'File Syncing for Remote GPU Developer Environments With Kubernetes'
date: '2024-04-30'
description: "Remote developer environments are useful when you're working with remote GPUs and language models. One of the basics of utilizing these environments is to sync files across local and remote resources. Here's how you can sync files for such use cases."
image: file-syncing-remote-gpu-dev-environments-blog-post-cover.jpg
toc: false
---

File syncing and remote developer environments are commonly executed use cases in language model development and machine learning industry, since industrial level GPUs are rather available at cloud providers.

In this blog post, you're going to learn how you can attach a Kubernetes pod that utilizes a CUDA capable remote GPU to VSCode, how to sync files across multiple environments, and how to launch the remote developer environment.

## Verifying GPU Usage

To verify CUDA GPU usage, you can use a simple Python script that imports PyTorch.

```
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
```

Save it as `gpu.py`, and execute it with `python3 gpu.py`. The script should print `cuda` or `cpu` based on whether the CUDA requirements are met.

## Attaching a Kubernetes Pod with VSCode

Moving forward, connecting to a Kubernetes cluster will be needed, as you're going to keep files consistent across local resources and the pod.

First, you have to add the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) and [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) extensions to VSCode. You also need `kubectl`, so verify that you can execute `kubectl` commands in the shell.

After installing the extensions, you can take a look at the Kubernetes explorer in VSCode to select the pod where you'd like to attach a container from. You can see how [here](https://code.visualstudio.com/docs/devcontainers/attach-container#_attach-to-a-container-in-a-kubernetes-cluster).

## File Syncing Script

File syncing itself will take place using the shell script below. It'll utilize `rsync` capabilities as `rsh` commands.

```
#!/bin/bash

if [ -z "$KRSYNC_STARTED" ]; then
    export KRSYNC_STARTED=true
    exec rsync --blocking-io --rsh "$0" $@
fi

# Running as --rsh
namespace=''
pod=$1
shift

# If user uses pod@namespace, rsync passes args as: {us} -l pod namespace ...
if [ "X$pod" = "X-l" ]; then
    pod=$1
    shift
    namespace="-n $1"
    shift
fi

exec kubectl $namespace exec -i $pod -- "$@"
```

You can find out more about utilizing this script [here](https://serverfault.com/questions/741670/rsync-files-to-a-kubernetes-pod).

## Setting up Remote Developer Environment

To complete setting up your remote developer environment, you'll need a couple of things.

### Persistent Volume

Volume is required to store the synced files somewhere. The Helm chart will specify storage demands in both local and remote volumes.

### Dependencies

To keep files consistent, you'll need the corresponding software set up across all environments, Python for example. You can easily set these up with Dockerfiles.

### Helm Chart To Deploy The Environment

This Helm chart we made with OneChart will deploy the remote environment, which will now have synced files with your local environment.

```
image:
  repository: python
  tag: 3.12-bookworm
command: |
  while true; do date; sleep 2; done
shell: "/bin/bash"
volumes:
  - name: workspace
    path: /workspace
    size: 10Gi
    storageClass: local-path
  - name: home
    path: /root
    size: 10Gi
    storageClass: local-path
resources:
  limits:
    nvidia.com/gpu: 1
```
## Summary

You set up a script that confirms GPU usage with CUDA capabilities. Then you attached a Kubernetes pod to VSCode, and used a Helm chart to spark up a remote developer environment that uses a script to sync files between the node that uses the GPU and your local computer.
