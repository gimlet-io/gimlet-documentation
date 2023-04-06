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

But first things, first it needs a fancy name: The Ironclad System 🤡. It is fitting: it is compact, it is closed, it is unpenetratable.

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

I run `git status` before and after every command I run. Partly because my command may not do what I intended it to, and second, git is trying to help me. I know it feels just the opposite sometimes, but if you read carefully the output of git status, you will find possible commands that you should run next.

Like in this example with changes in my working copy. It tells how I can stage files to be comitted, but also how to undo changes.

```bash
$ git status
On branch posts
Your branch is up to date with 'origin/posts'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   src/pages/blog/git-the-ironclad-system.md
```

In this more complex situation I tried to rebase my branch on main, but there were conflicts. Git is giving me very specific instructions on how I can continue the rebase.

```bash
TODO example with rebase conflict
```

### Git history is a tree with pointers

Git is an upside-down tree. Its root is a single commit and all commits descend from it.

You can also think of commits as members of linked lists. Each commit knows who is its parent, and what diff it introduces compared to it. If you think about it this way, when you branch out, you just create a new commit that has a same parent that a commit that is on another tree branch. Yes, branches. Branches are just named pointers. So as tags. So as main. They don't exist. The only two properties they have are their name, and the commit has they point to. That is the branch's head, but if you think about it, branches don't identify any code tree. They identify a a single commit, and that commit is on a tree. The identified commti knows its parent, the parent then knows its parent.. and soo on until we reach the first commit that has no parent. That's it, this is git's data model.

Now there is one limitation of using git in the command line. The default `git log` experience simply not good enough. You don'y get an overview and many people resort to git GUIs to get that overview.

But `git log` is powerful, you only need abnioxious amount of switches to make it useful. Here is my favorite:
`TODO git log --oneline pretty..`

I just use an alias for it in my `.gitconfig` and that is `git lola`. Why lola? Not sure, I borrowed it from a colleagues gitconfig 12 years ago. Thanks Peter!

git lola is my second most used command after git status.

### Remote state

Git users often use `git pull` to get the latest version. It is much less errorprone if you to not use git pull for that, but first do a `git fetch` then decide on the strategy to move your working copy version to the latest version.

`git fetch`
`git lola`
`git reset --hard`
`git stash`

## What do I want to do?

Good, now you know where you are. You also need to know where you want to go, and you have to have a few options to get there.

### Navigating

### Staging

working copy
git reset HEAD, not hard
unstage
git diff

### Integrating 
Branching

Merging
Rebasing
Squashing
Cherry picking

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
Anything you want to pick up?
What does work for you?
Do you have a system?
