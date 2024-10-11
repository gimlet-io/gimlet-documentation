## Deploying a Streamlit App Using Github Container Registry and Gimlet

**You can learn from this tutorial how to deploy Streamlit applications with Gimlet and github actions**

## Requirements

- A Streamlit app to deploy. If you don't have one, fork this [repository](https://github.com/YoucefGuichi/streamlit-app) to be able to try this tutorial.
- We assume that you already have a CI process set up to push packages to GitHub's container registry. In this tutorial, we'll tag images using the commit hash. You can check out the CI pipeline we use here [streamlit app CI pipeline](https://github.com/YoucefGuichi/streamlit-app/blob/main/.github/workflows/pipeline.yaml#L29-L38)

## Step 1: Getting Started with Gimlet

Log in to Gimlet with your GitHub or GitLab account. After successful log in, GitHub repositories available to you should be available. If you can't find the repository of your Streamlit application, you can use the search bar to find it.

To add the repository, click **Import** next to it, then save the repository by clicking **I am done importing**.

## Step 2: Configure Gimlet with Github Container Registry

If you have a GitHub Container Registry set up, you can integrate it to Gimlet.

### Get GitHub Personal Access Token

First, you need to get a personal access token with `repo` and `write:packages` privileges. You can get one as described in [GitHub's documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic). Remember that fine-grained tokens aren't supported in Gimlet.

Make sure to back up the token in a secure way, as it won't be recoverable after you leave or close the GitHub page after token generation. If you lose it, a new one will be needed to be generated. Consider the token's expiration time, as well, since Gimlet will lose privileges once the token expires.

### GitHub Container Registry Settings in Gimlet

Once the token is ready for use, you can open Gimlet in your browser. After logging in, navigate to environment settings by clicking the Environments option in the menu bar on top, then selecting the environment you use by clicking its card.

![GitHub Container Registry settings in Gimlet](/docs/screenshots/registries/gimlet-io-github-container-registry.png)

In the environment settings, choose the Container Registry tab on the left. Under the GitHub Container Registry settings, enter the following:

- **Login:** Your GitHub username.
- **Token:** The personal access token you generated earlier.

## Step 2: Deployment Settings

Navigate to deployment settings by clicking the repository's card, then the **New deployment** button.

Select the **Web Application Template**, and then the **Build with CI** container image option.

set **Gimlet Registry** to the **Github Container Registry** option, and enter `8501` for the **Port** value to expose it.

![Streamlit repository preview after successful deployment on Gimlet.](/docs/screenshots/streamlit-deployment/deployments-settings.png)

## Step 3: Deploy

When you made all the changes to the settings, you can click the **Deploy** button. Deployment logs should appear right away, and when the process is done and container status turns **Running**, you should see confetti raining in your browser tab.

In the case of Streamlit, deployment should take a few minutes since it contains a lot of dependencies that are needed to be built.

## Step 4: Check Out Your Streamlit App

You can take a look at the application in your browser by clicking the link that appears next to container status.

![Streamlit repository preview after successful deployment on Gimlet.](/docs/screenshots/streamlit-deployment/service-card.png)

## Step 5: Deploy new version and rollbacks

### CI

Your application should have a process in place to build an image, tag it, and push it to a container registry, which in our case is GitHub's container registry.

Once your CI process is complete, you can move on to using Gimlet.

### CD

In the CD process, we ensure that your image is delivered to the correct environment, allowing users to start using it.

If you navigate to the commits section, you will see the list of commits for your application.

Based on the configuration we set up in Step 2, Gimlet expects that you are deploying images to your registry using the commit hash as the tag.

When you click deploy, Gimlet will select the commit hash and write the configuration to Git.

After that, everything will be automatically applied, and your image will be pulled using its commit hash.

What about rollbacks? Since all your images are tagged with commit hashes, you can deploy any commit hash as long as your images in the registry use commit hashes as tags.

![repo commits.](/docs/screenshots/streamlit-deployment/commits.png)
