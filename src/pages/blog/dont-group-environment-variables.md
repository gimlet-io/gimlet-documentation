---
layout: post
title: Don't group environment variables
date: "2023-04-03"
image: dont-group.png
image_author: Mike Arney
image_url: https://unsplash.com/photos/rJ5vHo8gr2U
description: "This is a preiodic reminder for application developers to not group environment variables. `APP_ENV=staging` easily becomes a blocker when you do application operation."
---

We have a consulting background. We join teams who want to adopt containers and Kubernetes, and we create the guardrails for developers who want to efficiently use these technologies.

Nowdays it is called platform engineering, but when we started these projects - and made our off-the-shelf IDP, Gimlet - it was just called devops tooling work.

tldr: we see hundreds of apps every year.

There is one particular practice that popped up recently more often than I would have expected, and that is grouping environment variables.

## Grouping environment variables

If the name does not ring a bell, it is the pracitce when an app requires a variable like `APP_ENV`, takes predefined values like `staging`, `production`, then there is a switch case in the code that sets further values based on the environment.

If APP_ENV equals staging, use this database connection string, if production use the other. You get the gist, kind of like `NODE_ENV` and `RAILS_ENV`, but supercharged.

I am not saying that those frameworks promote a bad practice, but I do believe that developers get inspired by this environment concept and sometimes build hard to change assumptions into the code about the environment the app runs in.

This bad practice was identified and well described in the [The Twelve-Factor App](https://12factor.net/config) article, which by the way is twelve years old this year. This post is a periodic reminder about the practices 12factor promotes and an example how this practice makes devops life difficult.

## An example how this practice makes devops life difficult








don't group
12 factor is 12 years old

practice originates from rails and node (NODE_ENV)

why is it an issue?

DR
impossible to deploy your app in unforseen ways
devops, waiting for an app change to do stuff in devops is just as annoying when you are waiting for the that db you requested 2 weeks ago


NODE_ENV is okay as long as
