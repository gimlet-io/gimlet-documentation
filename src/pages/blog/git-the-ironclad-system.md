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

I've been sharing my approach in the teams I worked in, and now putting it into a blog post. If you pick up a few things from it, I will be more than happy. It is not a git 101, but a general approach to working with git with many examples.

But first things, first it needs fancy name 🤡. Ironclad is fitting: it is compact, it is closed, it is unpenetratable.

Let's get into it. Shell we?

## The ironclad checklist

This checklist puts the ironclad into git.

If you are able to answer these three questions, you will never get into trouble. Or if you are in trouble, you will know how to get back to safety. The three questions are:

- Where am I?
- What do I want to do?
- How to get back to a safety?

These are the questions I perculate in my head before every git operation I do. Let's explore them now.

## Where am I?

Before every git command you perform, you need to orient yourself first. If you don't know where you are, how can you expect to get where you want to. This is especially true with git.

When you perform a git command often you don't end up where you intended to, therefore before every action I take, I run `git status`. It is my single most used command with git.

### Git is trying to help

I run `git status` before and after every command I run. Partly because my command may not do what I intended it to, and second, git is trying to help you. I know it feels just the opposite, but if you read carefully the putput of git status, you will find possible commands that you should run next.

Like in this example with changes in my working copy. It tells how I can stage files to be comitted, but also how to undo your changes.

```bash
$ git status
On branch posts
Your branch is up to date with 'origin/posts'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/pages/blog/git-the-ironclad-system.md
```

In this more complex situation when I tried to rebase my branch on main and there was a conflict, git gives me very specific instructions on how I can continue the rebase.

example with rebase conflict


### Git history is a tree with pointers

`git lola`

## What do I want to do?

Good, now you know where you are. You also need to know where you want to go, and you have to have a few options to get there.

### Navigating

### Staging, working copy

git reset HEAD, not hard
unstage
git diff

### Integrating 
Branching

Merging
Rebasing
Squashing
Cherry picking

## How to get back to a safety?

### Git is trying to help

### Let's start over

git status
reset
checkout

##  Assumptions

- integrate often
no amount of git knowledge will save you from merge conflicts
- don't branch from branches

- don't use gitflow and friends

## Onwards

What does work for you?
