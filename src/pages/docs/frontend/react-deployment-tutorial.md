---
title: 'Deployments of React Frontends'
description: |
  React applications can be deployed with Gimlet, too. Find out how to add HTTPS and social authentication, as well.
---

## Step 1: Getting Started with Gimlet

Log in to Gimlet by connecting your GitHub or GitLab account. You should see your repositories listed, but if you can't find the repo where your React app is located, you can use the search bar to find it.

Fork [this repository](https://github.com/gerimate/react-gimlet-test) if you don't have a React application to give this tutorial a try.

Click the **Import** button to add the repository to Gimlet, then click the **I am done importing** button to save added repositories.

## Step 2: Deploy React

Click on the repository's card to select the repo. Click the **New deployment** button.

To deploy a React frontend, just select **Static Site Template**. Below you can see the build script for the demo app mentioned earlier.

![React build script for deployments with Gimlet](/docs/screenshots/gimlet-io-react-deployment-settings.png)

If everything looks alright, click the **Deploy** button. Gimlet will build the application and run it in an Nginx container.

## Step 3: Check Out Your React App

After a successful deployment, a clickable link should appear next to deployment status. Click it to open it in your browser.

## Use Cases

Here are a few examples of why you should host your React frontend with Gimlet:

- **Social Login:** Share your React application with social login and HTTPS certification added.
- **Branch previews:** Test and share changes in your frontend with preview deployments.
- **Advanced deployment capabilities:** Roll back and automated deployments of new changes.
