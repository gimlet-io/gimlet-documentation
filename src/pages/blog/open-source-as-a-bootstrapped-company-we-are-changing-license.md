---
title: 'Open-Source as a Bootstrapped Company – We Are Changing License'
date: '2024-09-16'
description: "Our story - open-source business models for a small bootsrapped company like Gimlet.io."
---

Thanks for clicking. In this one I summarize what does it mean for a small bootstrapped company like Gimlet.io to have an open-source product.

Hello, I am Laszlo Fogas, the founder of Gimlet.io. 👋

Buckle up, this is going to be a long one.

## A Decade of Open-Source by Default

Recently ended the decade where anything short of open-source was not considered by founders.

This had probably more to do with the cost of money than the properties of open-source.

Just like profitability was not a concern for SaaS businesses, open-source was the perfect vehicle for venture capital funded tech businesses to prioritize acquiring users over making money. This trend has turned recently though with raising seat prices and shrinking free tiers in SaaS, and license changes in open-source.

#### Gimlet was open-source by default

Gimlet is an application deployment tool for Kubernetes, built on gitops and bootstrapped with our consulting revenue. We were also open-source by default. In the Kubernetes ecosystem where we operate it was unthinkable to be closed source.

We are going source available now. With our refined scope and vision, this may even work out. Read more to learn how.

(our source available tldr: not open-source, you can read the code and modify it to your own purposes, but can't distribute it. You must purchase a license if you use the product for commercial purposes. See more in [pricing](/pricing))

## Indirect Path to Money

The reason why open-source is a difficult business is that you need to find an indirect path to money. Almost like you need to find product market-fit twice.

- First you find product market fit, or more like project market fit by solving a problem for developers. You give away the software for free, free as in beer, then if you are lucky enough it becomes widely used.
- Congratulations, now you are a popular open-source project. Now while you are serving your users you go and find a different set of people, problems, or both, who are willing to pay for solving their problems.

So as a widely used open-source project, you need to find that other thing that gets you paid. One way to do this is the open-core model.

### The Open-Core Model

In the open-core model you typically differentiate between individual and team features:
- features that help the individual doing their job go to the open-source version,
- features that benefit teams, go to the paid version.

Gitlab is a great example of this. Gitlab is churning out features at such a high pace that they have so many of those team features that they can monetize. They were churning out features even before their funding, but the $450 million funding sure helps executing this strategy.

For other open-core projects though, making this differentiation between features is more difficult. You often feel tension between developer and team features, and you often find the "SAML tax" situation: when a basic security feature as single sign-on is behind the pay-wall.

#### Considering the Open-Core Model for Gimlet

Gimlet was Apache 2.0 licensed prior to the upcoming v1.0.0 release.

The truth is, we don't have the feature shipping velocity to do open-core right.

We are a bootstrapped company, subsidizing our product development with our consulting revenue. Looking back on our release cadence (26 releases in three and a half years), we would need much more software to be able to do a feature differentiation that feels right.

Pushing out more software would also be at odds with our mission to simplify Kubernetes, but more on that later.

### Selling Support

Other open-source companies go down the support route. The idea here is that you have a vast number of users who are gladly using the software for free, as in 🍺, and there is a subset of these users who are willing to pay for support. This is a nice idea, but it is often not told how small this subset is.

Furthermore, the companies who require support are usually not your typical users. These are the companies who have quirky requirements, legacy systems, who are happy to pay you to help their madness of a setup. This again requires an open-source provider who churns out a great deal of features for free (again as in beer), then have a more consultancy-like branch who deals with the quirks.

#### Considering the the support route for Gimlet

We are kind of doing this already. This is how we pay the product development costs. We are doing consultancy around Gimlet. But instead of handling our client's quirks, we go broad and help them Terraform their cloud setup, go through audits, and optimize their CI.

There is not much quirks going on at small businesses that they would need support for. No special hardware, no crazy legacy systems. Many of our users are just happy to self-host Gimlet and self-serve all their infrastructure needs. When we get to help, the scope is not tied to Gimlet. That would be too small of a scope, and too little income.

You probably see by now how our broad support efforts that get us money, is also taking time away from product development.

### Hosting Anyone?

Another way open-source companies try monetizing the open-source project is hosting.

This makes a lot of sense for DB engines and difficult to self-host data warehouses and data processing systems. Anything dealing with data, where backups and consistency matters, lends itself to this model. Keeping the dev workflow free, then helping companies host and scale their data pipelines.

It is a fair deal as long as AWS does not take the upstream and deploy it as-is. You heard many of these stories (ElasticSearch, MongoDB) the last couple of years.

#### The Story of Gimlet Cloud

So we have a cloud. It used to have a volume based pricing. You get to deploy X services for free, then you pay for every additional Y service.

What happened is that our most avid users self-host the free (as in beer) open-source version, and the remaining users were mostly personal users - did I mention that that was also free in our old pricing?

For the odd user that used the cloud above the X free services, the product did not have any logic to enforce the payment, and we never bothered to charge. We looked at our cloud offering as an easy way to get more people trial the platform and the way to gather usage analytics.

- Now we've added automatic payment to the cloud version and we enforce limits.
- Plus we fixed the biggest drop off point in adoption. People were just perplexed by the fact that Gimlet is a bring your own hardware platform. Even though we advocated that launching a k3d cluster on your laptop is a matter of minutes, most trials did not launch a cluster. Our new cloud gives you a running cluster for 7 days so from registration til deployment it really only takes a few minutes. Just like on vertically integrated platforms like Vercel or Netlify.

### Tip Jars, Sponsorships

This is again an indirect path to money. Where the additional value you provide is less correlated with the software you make.

You sell social status or marketing value to the sponsor, additional access to you and your story, or priority access to new features. Since the value is more indirect than in the other cases, income is more volatile, and not enforced in any way.

Truth is, we don't understand this option very well. We see it working for others, but it does not come naturally for us. We prefer more direct paths to money.

## A Rising Tide Lifts All Boats

The often told story of open-source is about the ecosystem: raising the water for all boats in the ecosystem makes your boat rise as well.

This makes sense financially if raising your boat alone would cost more money. Think Terraform for example: writing the providers for all the systems of the world would be a huge effort. But if others do it for you as they are free to do it - free as in freedom, then it starts to make sense.

This upside of open-source is difficult to wield though if you are not a project that needs an endless number of integrations, or if you are not on a mission of changing the world with some foundational technology like a DB engine or container runtime. And the way I see it, for many of those world changing venture capital backed companies, it was also only viable until money was free.

### The truth about contributions

Many open-source projects are single vendor projects. It is a handful of core developers who are developing the software. And these developers are on payroll at the open-source company.

Software development is like that. One can contribute on the edges of the project through well defined interfaces (Terraform providers, plugins etc) or fix an odd bug, but changing the core of the system requires a great deal of technical and organizational knowledge. So if your software does not need integrations, or not a foundational tech like Linux or Kubernetes, chances are that contributions are just not of high enough quality, or they simply don't match the roadmap.

#### Contributions at Gimlet

We got a handful of nice contributions. Some out of the blue, which humbled us, some from friends. We are grateful for each and every one of those.

These contributions though did not change our product significantly. We also did not put in the time to have a clear enough roadmap, or communicate a clear enough technical guidance. At our scale, having a couple of internal contributors is a much safer route to product than relying on external contributors.

We also do not need many integrations, nor our software usable in any other context than Gimlet itself. We are making glue between projects from the Cloud Native Landscape. If you are a user, you can certainly make a PR, but it is unlikely to have an ecosystem of developers around Gimlet.

We are changing to a source-available license now, so technically you can still read the code, even file a PR to the repository. With a contributor agreement (CRA) in place, you can even upstream your changes.

It is fair to ask why would anyone contribute now when we are not open-source? We think that the only sustainable contributions to open-source is the scratch your own itch ones. And if you have an itch and you fix it, you want that upstreamed. If the project makers are decent enough, we aim to be, practitioners will not mind our license.

### Public Utility Software

There is a class of open-source software that runs the world today. Those software should be open-source in our view. The upside is so big that our industry would shatter without them.

Gimlet is not like these. Gimlet is single-purpose glue around other open-source projects.

We also acknowledge the fact that many of these projects serve as the source of the well known xkcd comic.

![The root of all problems in open-source](https://imgs.xkcd.com/comics/dependency_2x.png)

### Altruism

Open-source for some people is part of a political stance, a world view or activism.

These people made the public utility software category out of nothing. We are grateful for them, but we are not like them. Or at least not with this business, or not in our current life situation. Also, the dichotomy between free and paid software is as old as software itself. ([1976 - Bill Gates Letter to Hobbyists](https://en.wikipedia.org/wiki/File:Bill_Gates_Letter_to_Hobbyists_ocr.pdf))

### Big Company Subsidies

There is another category of open-source that could only happen as a subsidy of large companies.

They certainly spoiled end-users in the past decades.

## "Simple" Is at Odds With Open-Source Business Models

In the process of open-source trying to indirectly monetize, it is pushing the edges of what is possible. To be able to differentiate on features (open-core), or to support you in the complex, open-source companies must educate about problems that the paid version solves. It should be a good thing, right?

Probably. In the Kubernetes ecosystem though, all too many discussions are about the complex. There is less incentive to talk about the simple. With simpler business models perhaps there would be more focus on simple. Solving simple problems for money, anyone?

- We want you to stay simple.
- We want to solve simple for you.
- And not showing you the ever more complex possibilities the ecosystem has to offer. Neither looking for the next frontier.

Instead, we want you to be able to **deploy, preview and rollback** your application, and then we want you to move along to your next task.

## Solve Kubernetes Then Move Along to Your Next Task

There are a couple of software that inspired us to the extent that we want to give you the same feeling they gave us.

#### TailwindUI

We are backend engineers, devops professionals. We have known CSS for decades and we were aware of the possibilities. We could find the CSS tricks we needed for the task at hand. However, producing decent looking software was never our forte. We had constant trouble with paddings, margins, our sites just looked crooked in ways we could not fix. Until we could.

First, we bought the [Refactor UI](https://www.refactoringui.com/) book, then we picked up TailwindCSS, finally we purchased a lifetime license on [TailwindUI](https://tailwindui.com/) and our UIs just became something else. Our users often ask if we did the design of Gimlet. Well we did, with the help of TailwindUI.

This is a feeling we would like to replicate. If you have a Dockerfile, have a brief notion of Kubernetes, tried hacking together some yaml before, but things have not come together yet in coherent tooling, get onto Gimlet and jump to the end. You will still have the possibility to fine tune the yaml bits, like you can finetune TailwindUI with TailwindCSS classes. 

#### Netlify

Before Netlify, we used Github Pages and S3 buckets. It was an ever cumbersome process.

Then we connected our git to Netlify, set the build command, and we were deployed. No CDN, no TLS hassle.

This example is so close to what Gimlet is, because this exactly what we provide:

- connect your git
- set your container settings
- then auto deploy all commits

{% video src="https://www.youtube-nocookie.com/embed/kgjIvGUsXA4" /%}

This experience is not very common in the Kubernetes ecosystem. Combine that with our gitops fundamentals, extension points and UI, we believe we provide a clear value to our users. 

## Solving a problem and charging for it

So we have the vision of solving a clear problem: deploy, preview and rollback on Kubernetes - without you self building all that tooling.

And we also want to charge  money for it.

### Pricing

We want to make purchasing Gimlet a no-brainer, even an impulse buy.

- if you are a senior engineer who is by necessity the in-house Kubernetes expert on your team
- or if you are an engineer on a team who has a service ready with a Dockerfile, and need to deploy it on Kubernetes, on a URL with TLS enabled

you should be able to deploy to Kubernetes with Gimlet in minutes. And in a few days, when you almost forget you made the deployment, you can get your team lead or CTOs credit card to set Gimlet up for good. We priced Gimlet in a way that it can be approved without a budget. No monthly fees or seat prices, just a single yearly $300 payment.

We want this $300 to be your best spend ever. Like our spend was with TailwindUI.

### On sustainability

We are perhaps leaving money on the table with this pricing. That is something we are fine with. Like we said, we want this purchase to be your best purchase of the year.

This is price tag alone will probably not solve Gimlet's future if not sold in volume (1000 copies a year), but it is a step in the right direction: charging a clear price for a clear value.

We are also a small shop in not the most expensive areas of the world. Plus we have ideas on how to provide more value in other under-served parts of the ecosystem.

We are also not in a hurry. Our consultancy revenue keeps us afloat, we have a brand in the ecosystem, lovely users and a support network. Also, time is on our side, which is a super cool ally to have.

### If you have been a Gimlet user

We are grateful for people who trusted us from the early days.

Gimlet remains [free to self-host for non-commercial use](/pricing). Plus, if your company is a long time Gimlet user, just write to us and we are happy to grant a free license to you. 

### OneChart and Capacitor

We have other open-source components and tools that in some regards are more successful than Gimlet itself: OneChart and Capacitor.

They remain open-source. They fit open-source.

![Gimlet Github star histpry](/blog/gimlet-star-history.png)

**OneChart** is our general purpose Helm chart that serves as the default deployment template for workloads in Gimlet, but also used by hundreds of companies who are not Gimlet users otherwise. OneChart benefits from open-source more than Gimlet itself. Contributions and reported bugs are making OneChart better and better every week.

**Capacitor** Capacitor is a fresh open-source UI for Flux. In some regards, this is the project where we trully feel the pull of the ecosystem. The Github stars testify to that, but also the interest we are getting in Github issues. Capacitor remains open-source, a place where we perfect our integration with Flux, roll out new technical approaches, and connect with the ecosystem.

## Our business model: charging money

Long story short: we start charging money for the software we make.

Over the years we got closer to our core vision: **make simple things simple in the Kubernetes ecosystem** (while keeping complex things possible) and we believe by making the deploy, preview and rollback workflows accessible to everyone on Kubernetes we can earn a living. Clear value for a clear price.

Thanks for reading!

Please give Gimlet a try and [sign up](https://app.gimlet.io)!
