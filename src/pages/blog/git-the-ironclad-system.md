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

I've been sharing my approach in the teams I worked in, and now putting it into a blog post. If you pick up a few things from it, I will be more than happy. It is not a git 101, but a general approach. With practical, lesser known examples.

But first things, it needs a fancy name: The Ironclad System 🤡. It is fitting: it is compact, it is closed, it is unpenetratable.

Let's get into it. Shell we?

## The ironclad checklist

This checklist puts the ironclad into git.

If you are able to answer these three questions, you will never get into trouble. Or if you are in trouble, you will know how to get back to safety. The three questions are:

- Where am I?
- What do I want to do?
- How to get back to a safety?

These are the questions I perculate in my head before every git operation I do. Let's explore them now.

## Where am I?

Before every git command, I need to orient myself. If I don't know where I am, I can't expect to get where I want to. This is especially true with git.

When you perform a git command, often you don't end up where you intended to, therefore run `git status` before every action. It is my single most used command with git.

### Git is trying to help

I run `git status` before and after every command. Partly because my command may not do what I intended it to, and second, git is trying to help me. I know it feels just the opposite sometimes, but if you read the output of git status carefully, you will find possible commands that you should run next.

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

In this more complex situation I tried to rebase my branch on main, but there were conflicts. Git is giving me very specific instructions on how I can 
- resolve the conflict and continue the rebase
- or abort the change.

```bash
Auto-merging src/pages/blog/git-the-ironclad-system.md
CONFLICT (content): Merge conflict in src/pages/blog/git-the-ironclad-system.md
error: could not apply 7aab195... conflict
hint: Resolve all conflicts manually, mark them as resolved with
hint: "git add/rm <conflicted_files>", then run "git rebase --continue".
hint: You can instead skip this commit: run "git rebase --skip".
hint: To abort and get back to the state before "git rebase", run "git rebase --abort".
Could not apply 7aab195... conflict
```

### Git history is a tree with pointers

Knowing the basics of git's data model will help you in your everyday git operations.

Git history is a tree. Its root is a single commit and all commits descend from it. Each commit knows its parent, and what diff it introduces to it.

When you branch out, you just create a new commit that has the same parent as an other commit on an other tree branch.

Branches. Branches are just named pointers. So as tags. So as main. They don't exist.

The only two properties branches have are their name, and the commit they point to. That is the branch HEAD, but if you think about it, branches don't identify any code tree. They identify a single commit, and that commit is on a tree branch. The identified commit knows its parent, the parent then knows its parent.. until we reach the first commit that has no parent. That's it, this is git's data model.

Now git has a great limitation in the command line. The default `git log` experience does not give you a good overview to reason about the code tree, so many people resort to git GUIs.

But `git log` is powerful, you only need abnioxious amount of switches to make it useful. Here is my favorite:

```
git log --graph --oneline --all
```

![CICD and Flux](/branches.png)

I created an alias for it in my `~/.gitconfig` and named it `git lola`. Why lola? Not sure, I borrowed it from a colleague 12 years ago. Thanks Peter!

```
[color]
    branch = always
    diff = always
    grep = always
    interactive = always
    pager = true
    showbranch = always
    status = always
    ui = always
[push]
    default = tracking
[log]
    decorate = short
[pretty]
    default = %C(yellow)%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset
    parents = %C(yellow)%h%Creset - %C(red)%p%C(reset) -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)%an%Creset
[alias]
    st = status
    lola = log --graph --oneline --all
    fp = fetch --prune
```

Git lola is my second most used command after git status.

### Remote state

Git users often use `git pull` to get the latest version. But git pull does two things:
- it fetches the remote state
- then tries to bring your working copy up to date with the latest remote state.

It is much less errorprone if instead of using git pull, you run `git fetch` first,then decide on the strategy to move your working copy version to the latest version. 

`git fetch` fits better the ironclad system as it answers the *where am I question* and just that. Git pull on the other hand does not allow you to orient yourself before modifying your working copy and you may end up in states you didn't intend to.

I always run
- `git fetch` to get the remote state
- then a quick `git status` and `git lola` just to orient myself
- and for quick fast-forward situations, I call `git pull --rebase` to get the latest version

## What do I want to do?

When you oriented yourself with `git status` and `git lola` and you know *what you want to do*, it is good if you have a couple of plans to get there. This section highlights a few lesser known techniques to extend your options.

### Navigating

You certainly know how to change branches and move around in git. I just want to highlight a tecnique that quickens many navigation operations. It also has a risk of losing data, so it takes some practice to get a feel for it.

It is `git reset --hard`

- It throws away all working copy changes
- And resets a branch pointer to another hash

If you are on a branch and you want that branch to have the exact same state as another, you run `git reset --hard <another branch>`.

If you have various working copy changes and want to start over, you run `git reset --hard HEAD`. It resets your branch to the latest commit hash, thus throwing away working copy changes.

If you made a few commits locally on a *feature-branch*, but you realized it is a moot effort, you run `git reset --hard origin/feature-branch`. This throws away the commits that you recently made, and you can continue from the state that you have in the remote.

I use `git reset` and its `--hard` flag in versatile situations. There is just one thing to keep in mind. If a commit is not reachable from any pointer, aka branch or tag, that commit is gone. You can't get it back.

### Staging

Staging is the process when you mark files to be included in the next commit.

`git status` is your biggest ally in this process, and its hints to add or remove files from the stagign area. Besides git status, I run `git diff` a lot in this process.

- If I want to unstage a file, I use `git checkout path/to/file`
- or if I want to unstage all files and start over the staging process, I run `git reset HEAD`. This time without the `--hard` as it throws away all changes, while running reset without hard, is just resetting the staging area.

### Integrating 
Branching

Merging
Rebasing
Squashing
Cherry picking

## How to get back to a safety?

Things go wrong with git. Routinely. If your `git status` is not what you thougt it is, or there are conflicts, you have a situation to resolve.

### Git is trying to help

Remember git is trying to help. The output of `git status` often contains possible next commands you can run. They are sometimes enough to get you out of trouble.

### Let's start over

When you want to get back to a safe space with git, you need to know if you have changes that are in risk.

If you don't, you can just `git reset` yourself out of the situation
`git reset --hard HEAD` or `git reset --hard main` will get you to well known points.

If you have uncomitted changes, and yo care about them, commit them first.

If you have everything committed, but you are doint branch operations you are not sure about, best to make a backup pointer to your current state. `git branch backup` will make a new branch called backup that is your current state. Should you mess up something and you want to try again.

##  Assumptions

- integrate often
no amount of git knowledge will save you from merge conflicts
- don't branch from branches

- don't use gitflow and friends

## Onwards
Anything you want to pick up?
What does work for you?
Do you have a system?
