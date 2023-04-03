---
layout: post
title: "Git: the ironclad system"
date: "2023-04-04"
image: git-ironclad.png
description: "Git is the most feared tool amongst the tools we use everyday. Over the years I developed an ironclad approach to git, to not get into trouble, and if I did, how to get out of it."
---

Hello everyone, Laszlo here from Gimlet.io 👋.

It's been a while when I learned git. Perhaps I am not the best one to relate to situations when you lose a days work because git shenanigens, but I do recall occasions when colleagues with all different seniorities feared merging, conflicts or rebasing.

Now there are technologies even after fifteen years in this business which I google everytime I use. Writing an if condition in bash? Installing a package on alpine linux? Gets me everytime. But git is not one those.

Not because I know git inside out, but because I have a closed system where a minimum amount of knowledge keeps me safe. And if I wander from my safe space, I know how to get back.

I shared my approach to git in the teams I worked, and now putting it into a blog post. If you pick up a few things from it, I will be more than happy.

But first things, first it needs fancy name. Ironclad is fitting: it is compact, it is unpenetratable.

Let's get into it. Shell we?

## The ironclad checklist

This checklist puts the ironclad into git.

If you are able to answer this three questions, you will never get into trouble. Or if you are in trouble, you will know how to get back to safety. The three questions are:

- Where am I?
- What do I want to do?
- How to get back to a safe starting point?

These are the questions I perculate in my head before every git operation I do.

## Where am I?

Before every git command you perform, you need to orient yourself first.

### Git history is a tree with pointers

`git lola`

### Git is trying to help

`git status`

### git diff

## What do I want to do?

Good, now you know where you are. You also need to know where you want to go, and you have to have a few options to get there.

### Staging, working copy

git reset HEAD, not hard
unstage

### Branching

### Merging

### Rebasing

### Resetting

### Cherry picking

### Squashing

## How to get back to a safe starting point?

### Git is trying to help

### Let's start over

git status
reset
checkout

##  Assumptions

### integrate often
no amount of git knowledge will save you from merge conflicts
### don't branch from branches
### don't use gitflow
and friends

## Onwards
What does work for you?
