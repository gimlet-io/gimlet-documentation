---
title: 'How to Sync Code Between Your Laptop and Remote Kubernetes Clusters With GPU'
date: '2024-08-06'
description: "You can use Gimlet's CLI and VS Code to sync files across development environments and remote Kubernetes clusters."
toc: false
author: Geri Máté
authorAvatar: /geri.png
---

**File syncing between development environments and Kubernetes clusters immensely accelerates feedback loop. It allows developers to promptly test their applications in remote environments as they fix bugs or implement new features. This is useful when they'd like to run their code against remote GPUs. In this blog post, you'll find out how you can set up a cluster with a GPU as a remote development environment, and how you can sync code between your local setup and the cluster.**

## File Syncing for AI Engineers

Most developers only have access to CUDA capable Nvidia GPUs in remote data centers. File syncing enables them to turn GPU powered environments into development environments by synchronizing code. This offers the advantage of prompt feedback loops when engineering teams work on new features or fix bugs.

There are two ways to achieve this: with Gimlet’s CLI and VS Code. The two methods differ where code editing takes place. With Gimlet's CLI, engineers are able to make changes locally and code will be synced with the remote environment. Compared to this, VS Code's extensions allow users to access code of remote Kubernetes clusters in VS Code, meaning the code will be changed in the remote environment.

The methods described here don't require any specific resources to complete, but it's the use case of running code against CUDA capable GPUs where file syncing makes the most sense.

## Verifying GPU Usage

When you have launched the cluster with the GPU, you can verify if everything is working as expected by verifying CUDA GPU usage. Use a simple Python script that imports PyTorch, see below:

```
import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
```

Save it as `gpu.py`, and execute it with `python3 gpu.py`. The script should print `cuda` or `cpu` based on whether the CUDA requirements are met.

## Setting up Remote Developer Environment

Using a Helm chart, you can easily set up the remote environment. The chart will be responsible for multiple things you'll need.

- **GPU resource definition**, since GPUs aren't supported by Kubernetes by default. The default resource will be CPU without it.
- **Persistent volume** is required to store the synced files somewhere. The Helm chart will specify storage demands in both local and remote volumes.
- **Dependencies:** To keep files consistent, you'll need the corresponding software set up across all environments, Python for example. You can easily set these up with Dockerfiles or use Docker Hub images.

### Helm Chart To Deploy The Environment

This Helm chart we made with [OneChart](https://github.com/gimlet-io/onechart) deploys the remote environment, which will now have synced files with the local environment.

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

## File Syncing With Gimlet CLI

The requirements for file syncing when you use Gimlet’s CLI are

- having a Kubernetes cluster running,
- the CLI set up on your local setup,
- and the application to sync deployed to the cluster with Gimlet.

### Setting up Gimlet CLI

You can install the CLI locally by running the command below:

```
curl -L "https://github.com/gimlet-io/gimlet/releases/download/cli-v0.27.0/gimlet-$(uname)-$(uname -m)" -o gimlet
chmod +x gimlet
sudo mv ./gimlet /usr/local/bin/gimlet
```

After successful installation, authenticate with the `server` and `token` parameters. Here's an example of the API key for Gimlet Cloud:

```
mkdir -p ~/.gimlet

cat << EOF > ~/.gimlet/config
export GIMLET_SERVER=https://app.gimlet.io
export GIMLET_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
EOF

source ~/.gimlet/config
```

You can find your credentials at [https://app.gimlet.io/cli](https://app.gimlet.io/cli) on Gimlet Cloud. For self-hosted Gimlet, try the `cli` endpoint of the host's address.

Read [Gimlet’s documentation](https://gimlet.io/docs/cli) if you’d like to learn more about the CLI and its commands.

### Using the `sync` Command

After you’ve set up Gimlet CLI and authenticated your account, you can immediately give it a try by running `gimlet sync` locally.

The syntax for `gimlet sync` is the following:

```
gimlet sync <folder-to-sync> <pod-name>[@namespace]:<path-in-pod>
```

Since the application is already deployed with Gimlet, no other steps for connection than the authentication step are required as the CLI will be able to find the pod and the specified path. Namespace is optional to include in the command.

As you’ll see in the terminal, file syncing takes place continuously and you won’t have to re-run the command. If you no longer want to sync files, you can use `Ctrl+C` to finish syncing.

## File Syncing With VS Code

File syncing with VS Code differs by where code editing takes place. In this case, VS Code will be attached to the pod, so you’ll be able to edit code inside the pod directly from your local setup.

To do this, you need the [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) and the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extensions in VS Code. Refer to the official page of the extensions about the setup and usage of them.

Follow these steps to attach VS Code:

- After you set up everything, open the **Kubernetes extension** on the left hand pane in VS Code on your local system.
- You’ll see the clusters and the pods listed in a similar way to a folder structure.
- Find the pod and the relevant cluster which you’d like to edit in VS Code. Right click on the pod, and select **Attach Visual Studio Code**.
- A new VS Code window will open. Click **Open Folder** on the left, and use the search bar to find the folder where you’d like to edit code.

## File Syncing in Action

If you'd like to see file syncing in action, and also how to set up remote development pods with various methods, check out the video below.

{% video src="https://www.youtube-nocookie.com/embed/aYvXqeJb52s" /%}
