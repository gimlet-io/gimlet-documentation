---
title: Using Dockerfile and CI
description: "In this tutorial, you will integrate Gimlet into your CI process."
---

In this tutorial, you will integrate Gimlet into your CI process. 

The CI pipeline will lint and test the code, then build a container image based on a Dockerfile. Then you are going to add the Gimlet Github Action to trigger a deployment to a dummy Kubernetes environment.

Finally you will access the deployed application via a port-forward.

You will use a fork of a sample application with a Dockerfile and CI workflow prepared.

## Prerequisites
- You have finished the [installation](/docs/installation) tutorial, thus you see your git repositories in Gimlet and you have connected a cluster.

## Fork the example repository

Fork the [gimlet-io/gimlet-sample-app](https://github.com/gimlet-io/gimlet-sample-app) repository.

It has a Dockerfile and a Github Actions workflow that tests and builds the code.

## Build and push a container image from CI

You will add the container image build steps to the `.github/workflows/build.yml` file. But before you do so..

### Create the container registry credentials

Create a Github Personal Access Token with `write:packages` scope. The CI workflow will use this token to push the built container image to the Github Packages registry.

If you are not sure how to create a Personal Access Token, you can follow [this guide](https://docs.github.com/en/enterprise-server@3.4/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) from Github.

Once you have the token, [add it to your repository as Github Actions secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository). Name the secret as `PAT`.

### Add the container image build step

Now that you set up all dependencies, it is time to add the container image build step to the `.github/workflows/build.yml`.

```
- name: Login to GitHub Container Registry
  uses: docker/login-action@v2
  with:
    registry: ghcr.io
    username: ${{ github.repository_owner }}
    password: ${{ secrets.PAT }} # `PAT` is a secret that contains your Personal Access Token with `write:packages` scope

- name: 🚀 Build and push Docker image
  uses: docker/build-push-action@v3
  with:
    context: .
    push: true
    tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

Commit the changes and push it to Github to watch it run in Github Actions.

### Making the image public

Now you have a container image that is built on every git push. Good.

There is one more thing that you should set on the Github container registry. As of now the registry is private, and your cluster won't be able to pull the image from it.

Let's make it public for the simplicity of this tutorial. Don't worry, the gimlet-sample-app has nothing secretive inside. It is safe to make it public.

Navigate to [https://github.com/users/<<youruser>>/packages/container/package/gimlet-sample-app](https://github.com/users/<<youruser>>/packages/container/package/gimlet-sample-app) and locate "Package settings" on the right sidebar.

"Change package visibility" to public.

## Gimlet deployment configuration

Gimlet to deploy the built container image instead of the static image tag that you set up in the "Deploy a sample application" guide.
Edit the Gimlet environment configuration.


This is where the container image is referenced.
Set the Repository field to your Github container registry URL. It will be something like 
ghcr.io/<<youruser>>/gimlet-sample-app

Then set the Tag field to the image tag that you use on each git push. 

You may have noticed that the CI workflow uses the git commit hash to tag container images.

Gimlet supports a set of built-in variables, so set {{ .SHA }} to indicate that each deploy should use the matching git commit hash as a container image tag.

Save the environment configuration.

notice the file created


## Gimlet CI integration

Add Gimlet Github Action

set explicit deploy config

## Access with port-forward

