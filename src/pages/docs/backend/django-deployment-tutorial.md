---
title: 'Deployments of Django Applications'
description: |
  Django is a popular Python framework for web applications. Here's how you can deploy it with Gimlet.
---

**You can learn from this tutorial how to deploy a Django application with Gimlet.**

## Requirements

- A Django app to deploy. If you don't have a Django application, fork this [repository](https://github.com/YoucefGuichi/django-sample-app) to be able to try this tutorial.

## Step 1: Log in to Gimlet

Get started with Gimlet by connecting your GitHub or GitLab. After connecting your profile with Gimlet, the repositories available to you will be listed. If you can't find the repository of your Django project, you can use the search bar to find it.

To add the repo to Gimlet, click the **Import** button next to, and then the **I am done importing** to save the imported repository. You can add multiple repositories.

## Step 2: Django Deployment Settings

After saving the repository, you can navigate to deployment settings by clicking the card of the repository. Click **New deployment**.

![Django deployment settings in Gimlet.](/docs/screenshots/gimlet-io-django-deployment-settings.png)

In the deployment settings, you should select **Web Application Template** to be able to choose the **Using a Dockerfile** container image option. You'll need a Dockerfile in the repository for this method, and if you don't have one, you can get it on GitHub [here](https://github.com/YoucefGuichi/django-sample-app/blob/main/Dockerfile)

Select the **Gimlet Registry** option under **Registry** settings, and make sure that the exposed port is corresponding to the one specified in the Dockerfile.

If all the setting changes are made, you can click the **Deploy** button. Build logs should appear, and the app should be deployed in a while.

## Step 3: Check out your Django App

When container status turns **Running**, a clickable link should appear with the URL mentioned above.
