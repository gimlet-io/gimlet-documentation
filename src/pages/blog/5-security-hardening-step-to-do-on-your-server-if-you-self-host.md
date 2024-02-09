---
title: '5-security-hardening-step-to-do-on-your-server-if-you-self-host'
date: '2024-02-13'
description: "Self-hosting is on the rise which we can't celebrate enough. These are the five steps we perform on every server we set up. You should run them too."
image: gimlet-io-whats-next-for-fluxcd-and-gimlet.jpg
---

Self-hosting is on the rise which we can't celebrate enough. It is truly a way to save money when cloud pricing are not following the advancement in server hardware, and when SaaS is still sold by per seat.

Running a server should not be mistified, but there are a few things we believe you should do on your server to increase its security.

## Scope

- AWS server
- Digital Ocean server
- Scaleway server
- Hetzner server

or anything comparable

Why discount providers pose more work?
- SDN/VPC

We chose Ubuntu Linux for the sake of simplicity, and that is the most common option out there.

## Securing access

Secure access - securing ssh, keys, fail2ban, users
- creating your named ssh user
- generating secure ssh key
- disabling root pass 
- sudo
- fail2ban jails
 - VPN
[Laszlo] yes all this. Tell them why, then we should have a script of some sort that does it. Or a git repo with ansible playbooks, whatever.

## Security updates
Security updates/patch management
- unattended upgrades/yum-cron...
[Laszlo] Show them how to turn on unattended upgrades, talk about restarts if needed, and tell them a rule of thumb to rebuild their app "frequently". And they should use rolling image tags.

## Firewalls versus docker
Firewalls, firewalls with docker
- ufw, firewalld, iptables?  the choice
- opening ports
[Laszlo] We need to provide a copy-able snippet on how to set up A firewall when using Docker. We should not bother people with the choice, instead highlight the problem and give them the solution.


## Backups
VM snapshotting daily if available

## Cloudflare WAF
tell them about their free plan and waf plan
Tell them why a WAF is a must especially if you run a common stack like wordpress
Mention DDOS, and that CLoudflare is the best place to be

## CTA
CTA: call to action at the end
I am happy to funnel people to you to a one hour consultation for a fixed price kind of service
Also, if we end up creating a repo for people, we should funnel people to github.



