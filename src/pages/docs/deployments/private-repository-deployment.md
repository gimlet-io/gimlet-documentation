---
title: 'Private Static Site Deployments'
description: |
  Private static sites can also be deployed with Gimlet using GitHub's personal access tokens.
---

Private static sites can also be deployed with Gimlet using GitHub's personal access tokens.

First, you'll need to create a fine-grained personal access token (PAT). The scope should be for **Content**, and **Read-only access** is enough. Save the token in a secure way, as you'll need it when you configure the deployment. Refer to [GitHub's documentation](public\docs\screenshots\gimlet-encrypted-secrets.png) for exact description of token creation.

In Gimlet, set up the deployment in a similar way as described in our [React tutorial](/src/pages/docs/frontend/react-deployment-tutorial).

First, set up the Git Clone URL. By default, it's a GitHub URL, but when you use a personal access token, you need to add `$PAT@` in the format below:

```
https://$PAT@github.com/[user]/[repository-name].git
```

After that, you need to add the personal access token as a secret in the Encrypted secrets section. Click the plus button you can see below.

![Encrypted secrets field in Gimlet's deployment configuration screen](/docs/screenshots/gimlet-encrypted-secrets.png)

Rename the `newKey` variable that appears to `PAT`, and paste the token next to it into the empty input field. Click **Encrypt**.

If every other setting is ready, you can click **Deploy** to set up your private static site.