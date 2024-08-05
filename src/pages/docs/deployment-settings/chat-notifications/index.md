You can configure chat notifications to get information promptly about events related to your applications.

The supported providers are:

- Slack
- Discord

## Slack Notifications

To receive Slack notifications from Gimlet, create a Slack app first.

You'll need to generate a new Slack token. Visit the [apps](https://api.slack.com/apps) page of Slack and follow these steps:

- Create a new application. Add an app name and pick the workplace where you'd like to receive notifications from Gimlet.
- Navigate to OAuth & Permissions on the left sidebar.
- Under Bot Token Scopes, add scopes `chat:write`, `chat:write.customize` and `chat:write.public`.
- Click the Install App to Workspace button on the top of the page.

 If you self-host Gimlet, copy the Bot User OAuth Access Token to Gimlet's config file to the `NOTIFICATIONS_TOKEN` variable. The config file should look like this.

```
NOTIFICATIONS_PROVIDER: slack
NOTIFICATIONS_TOKEN: xoxb-41[...]
NOTIFICATIONS_DEFAULT_CHANNEL: general
```

## Discord Notifications

To get Discord notifications from Gimlet, you'll need to create a Discord application.

First, make sure you’re logged in on the Discord website, and navigate to the [applications page](https://discord.com/developers/applications). Follow these steps when you get there:

- Click the New Application button, and enter your application's name, Gimlet for example and confirm the pop-up window by clicking the Create button.

The app is now ready, but you'll need to invite it to your Discord server. Here's how:

- On the left panel, navigate to OAuth2 and scroll to the OAuth2 URL Generator section.
- In the scopes, check Bot and in the Text Permissions part of Bot Permissions check Send Messages.
- Copy your generated URL from the bottom of the page, and open it in a new tab.
- Select the server you'd like to add your bot to, and click Continue.
	Note: You can only select servers where you have admin privileges. Make sure the Send Messages option is checked, before clicking on the Authorize button.
- After the security check, your bot will automatically join the server.

Now that the bot is on your server, you can set up where you'd like to receive messages from it.

- Go to User Settings, and then to Advanced, where you can enable Developer Mode. This'll allow you to see and copy your channel IDs.
- Now you can copy your text channel ID on Discord's main page by right clicking on the desired channel in the left panel and choosing the Copy ID option.
- Make sure that the newly created bot is a member of your channel. If not, use the Add members or roles button in the channel to invite your bot's role.

```
NOTIFICATIONS_PROVIDER: discord
NOTIFICATIONS_TOKEN: OTQwO[...]
NOTIFICATIONS_DEFAULT_CHANNEL: "140971232847884321"
```

## Channel Settigns

`NOTIFICATIONS_DEFAULT_CHANNEL` is a catch all for all notifications that are not routed elsewhere.

`NOTIFICATIONS_CHANNEL_MAPPING` maps channels to environment settings.

Here's an example to send staging notifications to the `staging-deploys` channel and production notifications to the `production-deploys` channel:

```
NOTIFICATIONS_DEFAULT_CHANNEL: "general"
NOTIFICATIONS_CHANNEL_MAPPING: "production=production-deploys,staging=staging-deploys"
```
