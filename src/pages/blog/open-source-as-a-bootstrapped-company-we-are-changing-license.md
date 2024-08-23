---
title: 'Open-source as a Bootstrapped Company - We Are Changing License'
date: '2024-08-23'
description: "Our story - what does it mean to be an open-source company for a small bootsrapped company like Gimlet.io."
---


Thanks for clicking. In this one I summarize what does it mean to be an open-source company for a small bootstrapped company like Gimlet.io.

Hello, I am Laszlo Fogas, the founder of Gimlet.io. Buckle up, this is going to be a long one.

## A decade of open-source by default

Recently ended the decade where anything short of open-source was not considered by founders.

This had probably more to do with the cost of money than the properties of open-source.

Just like profitability was not a concern for SaaS businesses, open-source was the perfect vehicle for venture capital funded tech businesses to prioritize acquiring users over making money. This trend has turned recently with raising seat prices and shrinking free tiers in SaaS, and license changes in open-source.


## Indirect path to money

The reason why open-source is a difficult business is that you need to find an indirect path to money. Almost like you need to find product market-fit twice.

- First you find product (or more like project) market fit by solving a problem for developers. You give away the software for free, as in beer, then if you are lucky enough it becomes widely used.
- Then, while you keep serving your users you find a different set of people - usually developers' managers - who have a different problem, but who are willing to pay for solving those problems.

So as a widely used open-source project, you need to find that other set of features. One way to do this is the open-core model. 

### The open-core model

You typically differentiate between individual and team features:
- features that help the individual do the job go to the open-source version,
- features that benefit teams, go to the paid version.

Gitlab is a great example of this. Gitlab is churning out features at such a high pace that they have so many of those team features that they can monetize. They were churning out features even before their funding, but the $450 million funding sure helps executing this strategy.

For other open-core projects making this differentiation between features is more difficult. You often feel tension between developer and team features, and you often find the "SAML tax" situation: such a basic security feature as single sign-on is behind the pay-wall.

### Selling support

Other open-source companies go down the support route. The idea here is that you have a vast number of users who are gladly using the software for free, again as in beer, and there is a subset of these users who are willing to pay for support. This is a nice idea, but it is often not told that this subset of people is 1%. (todo cite examples)

And this 1% is the companies who have quirky requirements, legacy systems, who are happy to pay you to help their madness of setup. This again requires an open-source provider who churns out a great deal of features for free (as in beer), then has more consultancy like branch who deals with the quirks.

### Hosting anyone?

Another way open-source companies try monetizing the open-source project is hosting.

This makes a lot of sense for DB engines, and difficult to self-host datawarehouses and data processing systems.

Anything dealing with data where backups, and consistency matters lends itself to this model. Keeping the dev workflow free, and helping companies host and scale their data pipelines.

It is a fair deal as long as AWS does not take the upstream and deploy it as-is. You heared many of these stories the last couple of years (todo: this, and this and this)

### Tip jars, sponsorships

I don't understand it, hence I don't want to go deep on the topic.

It works for some that is for certain. It is based on some weird social clout, personal brand, influencer economy. Again, selling something adjacent to software. It is just a personal thing that I prefer a more direct exchange between value and money.

## Raising all boats

The often told story of open-source is about the ecosystem: raising the water for all boats in the ecosystem makes your boat rise as well.

This makes sense financially if raising your boat alone would cost more money. Think Terraform for example: writing the providers for all the systems of the world would be a huge effort. But if others do it for you as they are free to do it - free as in freedom, then it starts to make sense.

This upside of open-source is difficult to wield though if you are not a project that needs an endless number of integrations, or if you are not on a mission of changing the world with some foundational technology like a DB engine or something. And the way I see it, for many of those world changing venture capital backed companies, it was also only viable until money was free.

### The truth about contributions

Many open-source projects are single vendor projects. It is a handful of core developers who are developing the software. And these developers are on payroll at the open-source company.

Software development is like that. One can contribute on the edges of the project through well defined interfaces (Terraform providers, plugins etc), but changing the core of the system requires great deal of technical and organizational knowledge. So if your software does not need integratinos, chances are that contributions are just not of high enough quality, or they simply don't match the roadmap.

### Public utility software and altruism

There is another group of software where open-source makes sense.

Core infrastructure software and software we all rely on...

And of course open-source for some is part of politics, or activism. There is nothing wrong with that one, but this dilemma is as old as software itself. ([1976 - Bill Gates Letter to Hobbyists](https://en.wikipedia.org/wiki/File:Bill_Gates_Letter_to_Hobbyists_ocr.pdf)

![The root of all problems in open-source](https://imgs.xkcd.com/comics/dependency_2x.png)

## The problem of open-source at Gimlet

### Our vision aims to simplify
while open-source pushes towards complexity
deploy, preview, rollback

### On open-source contributions
Open-source contributions are usually not that valuable. Most open-source projects are churned out by a handful of people anyways. Contributions are great on the edges (integrations) but often a distraction in the middle. Gimlet's vision can be done with a handful of people. Once we are done, we may find a larger vision, but we don't want to be a platform, or a foundational technology. We just want people to use Kubernetes without today's baggage.

### A word on Feature velocity
One of the reasons we needed to think and abandon the open-source approach is our feature velocity. We are not venture backed, we can't churn out features like there is no tomorrow.


Gimlet's core ethos also does not work well with lofty goals that open-source or venture can help achieve.


Being simple to understand, simple to on-board does not mix well with an ecosystem whose business is selling complexity... But with a clear vision of making the deploy, preview and rollback workflows accessible to everyone on Kubernetes - we can give value to people that is in line with our capabilities and values.

### We are not changing the world

There is nothing wrong with that and I sense the need to declare some of open-source as public infrastructure.. as a company owner open-source must serve a purpose.

Gimlet's mission is to be a handy tool for individuals who want/need to use Kubernetes but so far they were only given complexity from the ecosystem:


> Gimlet is a deployment tool built on Kubernetes to make the deploy, preview and rollback workflows accessible to everyone.


This does not include an endless feature set like Gitlabs, thus it is difficult to differentiate between individual and team features.
Also does not require an endless number of integrations.

## Solving a problem
and charging for it. The tailwindui feeling

### Pricing structure
With the provided value I can match a pricing structure and buying journey that is familiar to the Gimlet team. We know how teams work between one and fifty developers, we also despise anything larger. It is no surprise we work with those companies when we consult, and we have worked for those companies when we were employed.


That said, we want to be a no-brainer buy for these teams. Either by senior developers who by necessity are the in-house Kubernetes experts, or for developers on the job who just want to solve this Kubernetes deployment thing this sprint.. They have new things coming next sprint. The $300 a year price tag is impulse buy territory.
- As a senior engineer just buy it and be done with it
- or as a dev: just tell your CTO that you already deployed with Gimlet Cloud you just need a license now as in 7 days things will go offline otherwise.


We experienced this ourselves with the TailwindUI products: TailwindCSS, the https://www.refactoringui.com/ book and https://tailwindui.com/ products solved the designed question for us. Best $500 spent ever. We want to be the same for Kubernetes, as much as Kubernetes allows it.

### On sustainability
This is a low price tag which does not solve Gimlet's future if not sold in volume (500-1000 copies a year), but it is a step in the right direction. We are not the only ones in the ecosystem who move this direction, but we are certainly one of the very few whose problems can be solved with this small price tag and low volume of sales.


Once we identify who is willing to pay to solve their problems, we can help in many other ways on a similar price tag: we are huge on application operations for example. Having a partner who you can trust on a similar few hundred dollar budget, is also something not often seen in the ecosystem. The product sales and the yet to be launched support packages combined puts us on a very comfortable path.


We are not in a hurry though. Our consultancy revenue keeps us afloat, we have a brand in the ecosystem, lovely users and a support network. Also, time is on our side. Which is a super cool ally to have.
