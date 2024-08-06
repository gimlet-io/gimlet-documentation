---
title: 'How to Sync Files Between Development Environments and Remote Kubernetes Clusters'
date: '2024-08-06'
description: "You can use Gimlet's CLI and VS Code to sync files across development environments and remote Kubernetes clusters."
image: file-syncing-remote-kubernetes-clusters.jpg
toc: false
author: Geri Máté
authorAvatar: /geri.png
---

**File syncing between development environments and Kubernetes clusters immensely accelerates feedback loop. It allows developers to promptly test their applications in remote environments as they fix bugs or implement new features. In this blog post, you’ll find out how you can use VS Code or Gimlet's CLI to sync files for this purpose.**

## File Syncing for AI Engineers

Most developers only have access to CUDA capable Nvidia GPUs in remote data centers. File syncing enables engineers to turn GPU powered environments into development environments by synchronizing code. This offers the advantage of prompt feedback loops when engineering teams work on new features or fix bugs.

There are two ways to achieve this: with Gimlet’s CLI and VS Code. The two methods differ in where code editing takes place. With Gimlet's CLI, engineers are able to make changes locally and code will be synced with the remote environment. Compared to this, VS Code's extensions allow users to access code of remote Kubernetes clusters in VS Code, meaning the code will be changed in the remote environment.

The methods described here don't require any specific resources to complete, but it's the use case of running code against CUDA capable GPUs where file syncing makes the most sense.

## File Syncing With Gimlet CLI

The requirements for file syncing when you use Gimlet’s CLI are

- having a Kubernetes cluster running,
- the CLI set up on your development environment,
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

You can see how the command works in [this video](https://youtu.be/aYvXqeJb52s?si=mknchyQpzd6FE9fM&t=223) on YouTube where we talk about file syncing and remote GPUs with Gimlet.

## File Syncing With VS Code

File syncing with VS Code differs by where code editing takes place. In this case, VS Code will be attached to the pod, so you’ll be able to edit code inside the pod directly.

To do this, you need the [Kubernetes](https://marketplace.visualstudio.com/items?itemName=ms-kubernetes-tools.vscode-kubernetes-tools) and the [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extensions in VS Code. Refer to the official page of the extensions about the setup and usage of them.

- After you set up everything, open the **Kubernetes extension** on the left hand pane in VS Code on your local system.
- You’ll see the clusters and the pods listed in a similar way to a folder structure.
- Find the pod and the relevant cluster which you’d like to edit in VS Code. Right click on the pod, and select **Attach Visual Studio Code**.
- A new VS Code window will open. Click **Open Folder** on the left, and use the search bar to find the folder where you’d like to edit code.
