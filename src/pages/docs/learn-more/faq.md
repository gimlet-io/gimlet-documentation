# Frequently Asked Questions

## Is there an API?

There's an API that serves the CLI and the dashboard, but we don't treat the API as a product.

There are teams who built on this API, and had success and stability doing so, but we don't concern ourselves at this point to manage the API in a backwards compatible way more than the CLI and Dashboard require it.

## Is Docker supported?

Unfortunately, no. You can only deploy to Kubernetes clusters with Gimlet.

## Is Gimlet ARM supported?

Yes.

## What container registries are supported?

- Github Container Registry (ghcr.io)
- Docker Hub
- Custom container registries identified by a URL and matching credentials

## I self-hosted Gimlet before the license change. How can I use it now?
We switched to a source-available license with source code still hosted on Github.

You are required to purchase a license once you upgrade to Gimlet 1.0 and above. As per our [pricing](/pricing) you may be eiligible to our free tier.

You are also free to write to us and we probably grant a free license to you. We are grateful for people who trusted us from the early days.

## Do I need to build my container images on my own?
No, Gimlet can do that for you during the deployment process. But you can reference any image hosted in public or private container registries.

## How can I reset my account?

If you have problems with your account, we can reset it for you.

- First, reach out to the Gimlet team to reset your account. You can reach us on our [Discord server](https://discord.com/invite/ZwQDxPkYzE).

- Once your account is reset, try logging into Gimlet like you did the first time around. Except this time you need to tell Github as well that you want to reinstall the `Gimlet Cloud` app.

You'll see all the accounts you have access to listed. Click **Configure** next to your account you want to reinstall Gimlet to.

![Gimlet's GitHub application account selection screen](/docs/screenshots/gimlet-account-setup/gimlet-github-app-installation-01.png)

In the page of Gimlet's GitHub application, find the **Uninstall** button.

![Gimlet's GitHub application page with uninstall button](/docs/screenshots/gimlet-account-setup/gimlet-github-app-installation-02.png)

Uninstallation should be completed in an instant, go back to the login screen of Gimlet. You'll see the accounts accessible to you once again, but this time Configure shouldn't appear next to your GitHub username.

![Gimlet's GitHub application account selectioon screen without configuration option for personal user](/docs/screenshots/gimlet-account-setup/gimlet-github-app-installation-03.png)


Click your username, and then **Install** after choosing if all or select repositories you'd like Gimlet to have access with your GitHub account.

![Gimlet's GitHub application installation screen](/docs/screenshots/gimlet-account-setup/gimlet-github-app-installation-04.png)
