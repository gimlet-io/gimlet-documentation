---
title: 'Deployments of Vue Frontends'
description: |
  Vue applications can be deployed with Gimlet, too. Find out how to add HTTPS and social authentication, as well.
---

**You can learn from this tutorial how to deploy a Vue js frontend with Gimlet.**

## Requirements

- A Vue js application on GitHub. If you don't have one, you can fork one from [this repository](https://github.com/Arvind644/vue-todo-app).

## Step 1: Getting Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. You should see your repositories listed, but if you can't find the repo where your Vue js app is located, you can use the search bar to find it.

Click the **Import** button to add the repository to Gimlet, then click the **I am done importing** button to save added repositories.

## Step 2: Deploy Vue js app

Click on the repository's card to select the repo. Click the **New deployment** button.

To deploy a Vue js frontend, just select **Static Site Template**. Below you can see the build script for the demo app.

![React build script for deployments with Gimlet](/docs/screenshots/gimlet-io-vue-deployment-settings.png)

And also in **Build assets** section, change directory from `build/` to `dist/`

You can find out more about build settings in the [Container Image Settings](/docs/deployment-settings/image-settings) documentation.

If everything looks alright, click the **Deploy** button. Gimlet will build the application and run it in an Nginx container.

## Step 3: Check Out Your Vue js App

After a successful deployment, a clickable link should appear next to deployment status. Click it to open it in your browser. It will look like this for given sample repo example :

[Vue Sample App](/docs/screenshots/vue-sample-app.jpg)

## Use Cases

Here are a few examples of why you should host your React frontend with Gimlet:

- **Social Login:** Share your React application with [social login](/docs/deployment-settings/social-authentication) and [HTTPS certification](/docs/deployment-settings/https) added.
- **Branch previews:** Test and share changes in your frontend with [preview deployments](/docs/deployments/preview-deployments).
- **Advanced deployment capabilities:** [Roll backs](/docs/deployments/rollbacks) and [automated deployments](/docs/deployments/automated-deployments) of new changes.
