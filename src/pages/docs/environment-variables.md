---
title: Gimlet environment variables
description: TODO description
---

The following environment variables can be used with the Gimlet Dashboard:

| Environment Variable          | Description|
|-------------------------------|----------------------------------------------------------------------------------------------------------|
| `DEBUG`                       | A variable that sets the debugging mode for the application.|
| `TRACE`                       | A variable that enables detailed tracing for the application. Allows for extensive logging and tracing of application operations.|
| `HOST`                        | A variable that specifies the host address or URL for the application. Gimlet Dash must know what address it is running on. It uses this hostname to register webhooks on Github.|
| `JWT_SECRET`                  | A variable that holds the secret key used for JSON Web Token (JWT) authentication and authorization with the Gimlet Agent.|
| `GITHUB_APP_ID`               | The ID of the GitHub application being used.|
| `GITHUB_INSTALLATION_ID`      | The ID of the GitHub installation associated with the application.|
| `GITHUB_PRIVATE_KEY`          | The private SSH key used for authentication with the GitHub API.|
| `GITHUB_CLIENT_ID`            | The client ID for the GitHub OAuth application.|
| `GITHUB_CLIENT_SECRET`        | The client secret for the GitHub OAuth application.|
| `GITHUB_SKIP_VERIFY`          | A variable that determines whether to skip verification of GitHub API SSL certificates.|
| `GITHUB_DEBUG`                | A variable that enables debugging mode for interactions with the GitHub API.|
| `GITHUB_ORG`                  | The GitHub organization or personal Github account which uses the Gimlet Dashboard.|
| `GITLAB_CLIENT_ID`            | The client ID for the GitLab OAuth application.|
| `GITLAB_CLIENT_SECRET`        | The client secret for the GitLab OAuth application.|
| `GITLAB_ADMIN_TOKEN`          | A personal access token or group access token. They grant access to GitLab resources.|
| `GITLAB_DEBUG`                | A variable that enables debugging mode for interactions with the GitLab API.|
| `GITLAB_ORG`                  | The GitHub organization or personal GitLab account which uses the Gimlet Dashboard.|
| `GITLAB_URL`                  | The URL of the GitLab instance.|
| `DATABASE_DRIVER`             | The driver or provider for the database connection.|
| `DATABASE_CONFIG`             | The driver-specific data source name, usually consisting of at least a database name and connection information.|
| `DATABASE_ENCRYPTION_KEY`     | The encryption key used for encrypting sensitive data in the database.|
| `DATABASE_ENCRYPTION_KEY_NEW` | An updated encryption key to re-encrypting encrypted data in the database.|
| `NOTIFICATIONS_PROVIDER`      | The provider or service used for sending notifications. It can be `slack` or `discord`.|
| `NOTIFICATIONS_TOKEN`         | The token or credentials for accessing the notifications provider.|
| `NOTIFICATIONS_DEFAULT_CHANNEL` | The default channel or destination for sending notifications.|
| `NOTIFICATIONS_CHANNEL_MAPPING` | Mapping channels or destinations for sending notifications.|
| `CHART_NAME`                  | The name or identifier of the helm chart.|
| `CHART_REPO`                  | The repository or source for the helm chart.|
| `CHART_VERSION`             | The version of the container chart to be deployed.|
| `REPO_CACHE_PATH`           | The file path or directory location for caching repository data.|
| `WEBHOOK_SECRET`            | The secret key or token used for secure communication with webhooks.|
| `RELEASE_HISTORY_SINCE_DAYS` | The number of days to consider when retrieving release history. |
| `BOOTSTRAP_ENV`             | The environment used during application initialization.|
|`USERFLOW_TOKEN`            | The token or credentials for accessing userflow.js service.|
| `PRINT_ADMIN_TOKEN`         | Prints the admin token to the application logs.|
| `ADMIN_TOKEN`               | A token or credential used for administrative access to the application.|
| `GITOPS_REPO_DEPLOY_KEY_PATH` | The file path or location of the deploy key for the GitOps repository.|
| `GIT_SSH_ADDRESS_FORMAT`    | The format or template for the SSH address used in Git operations.|
| `RELEASE_STATS`             | Periodically processes the state of GitOps repositories for different environments. It can be acitvated with `enable`.|
| `FEATURE_TERMS_OF_SERVICE`  | A feature flag variable for enabling the Terms and Conditions link on the signin page.|
