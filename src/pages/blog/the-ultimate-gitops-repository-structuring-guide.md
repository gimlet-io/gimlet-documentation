---
layout: post
title: The ultimate GitOps repository structuring guide
date: "2023-05-02"
image: gitops-repo-structure.png
description: "The way you structure your repository can greatly impact the efficiency and reliability of your gitops workflow. In this article, we'll explore different approaches to structuring your gitops repository so you gain a better understanding of how to structure your gitops repository to optimize your deployment process."
author: Youcef Guichi
authorAvatar: /youcef.jpg
coAuthor: Laszlo Fogas
coAuthorAvatar: /laszlo.jpg
---

Welcome to this article about gitops repository structuring! If you're new to gitops, it's a modern approach to continuous delivery that uses git as the source of truth for application deployments. Gitops is becoming the de-facto deployment approach as more teams adopt cloud-native architectures and embrace devops practices.

One important aspect of gitops is the structure of the git repository used to manage your application configurations and deployment manifests. The way you structure your repository can greatly impact the efficiency and reliability of your gitops workflow.

In this article, we'll explore different approaches to structuring your gitops repository so you gain a better understanding of how to structure your gitops repository to optimize your deployment process.

Ok. On to the good stuff!

## Approaches to structure gitops repositories

Since we use git to store deployment manifests, there are only limited options available to structure things:

- utilizing folders,
- branches
- or repositories.

Moreover, based on experience, long-running branches for each environment (such as QA, staging, and production) with pull requests to promote changes through them are not a real option. Although it may seem like a good idea initially, in practice, promoting changes is seldom a simple git merge but a manual process of selecting good changes and rejecting bad changes to reach production.

Allow me to provide you with some examples:
- Environment variables are frequently included in the configuration verbatim.
- Infrastructure configuration is distinct from code changes due to the existence of environment-specific strings such as host names.
- Certain long-running tasks may exclusively target a specific environment, such as load tests or penetration tests that necessitate temporary yet prolonged settings.

Additionally, popular tools in the ecosystem such as Kustomize utilize environment overlays represented as files or Helm, which advocates for having a values file for each environment. These approaches differ from utilizing branches.

Now that we know we can only use folders and repositories to structure the gitops repository, let's continue with what should we model.

## What to model in the gitops repository

The gitops repository should model the following:

- Applications: These are the primary focus of deployment and should be modeled.
- Infrastructure components: This includes logs shippers, metric agents, ingress controllers and other auxilary components that facilitate application operations.
- Environment: The gitops repository should also model environments to enable deploying distinct application configurations to each environment.

As a best practice, the gitops repository should avoid modeling real-world topologies such as cluster, namespace, or team membership, wherever possible. This approach allows for reshaping clusters or namespaces without having to handle gitops changes.

In advanced cases, it may be necessary to model real-world topologies, such as when certain tenant instances must be deployed in a Europe-based cluster and others in the US. Both deployments are part of the production environment, but cluster membership must be modeled. In simpler situations, this may fit into the concept of an environment, such as `production-eu` and `production-us`. However, with multiple clusters, cluster modeling may warrant a top-level model category.

## Common approaches

What all approaches share is the separation of deployment manifests from the application source code. This separation allows for greater flexibility in workflows and structure, such as:

- Developers who are developing the application may not be the same individuals who push to production environments.
- A cleaner audit log with only configuration changes in the Git history.
- Common repository structures that we discuss in this chapter are also enabled by the separation.

## Monorepo
A monorepo is a single Git repository that contains all the configuration files and scripts for both infrastructure and the application.

people can use different appraoches within the monorepo strategy.

### Folder based environment separation

```
repo-name
|
├── apps
│   ├── dev
|     |-- folder1
|     |-- folder2
│   ├── prod
|     |-- folder1
|     |-- folder2
├── infrastructure
|   ├── dev
|     |-- folder1
|     |-- folder2    
|   ├── prod
|     |-- folder1
|     |-- folder2    

```
#### Pros:

* Easy collaboration and versioning across all the components.
* A single source of truth for all changes.
* good for small projects and temporary trials.

#### Cons:
* Can become difficult to manage as it grow.
* Can be challenging to separate concerns.
* if you have the access to the repo you have acces to everything.


### Branches based environment separation
the idea is to create two long live branches dev and prod, where the changes on the dev branch get merged to production,

```
dev-branch
|
├── apps
│   ├── folder1
│   ├── folder2
├── infrastructure
    ├── folder1
    ├── folder2
prod-branch
|
├── apps
│   ├── folder1
│   ├── folder2
├── infrastructure
    ├── folder1
    ├── folder2    
```
#### Pros:

* extra layer pf security only valide changes can be submited to the prod branch. 
* bla bla 
* bla bla 

#### Cons:
* huge mess between application branches and environment branches.
* still challenging to separate concerns.

## Multirepo
A multirepo approach involves creating separate Git repositories for each type of component.
bla bal 
bla 
bla bla 
bla bla 

### Namespace-based MultiRepo

A namespace-based repository approach is based on organizing Git repositories according to namespaces. prod namespace and dev namespace are two different branches, how ever infrastructure and application reseources are still separated using folders.

```
dev-repo
|
├── apps
│   ├── folder1
│   ├── folder2
├── infrastructure
    ├── folder1
    ├── folder2
    
prod-repo
|
├── apps
│   ├── folder1
│   ├── folder2
├── infrastructure
    ├── folder1
    ├── folder2    
```


#### Pros:

* More granular control over each infrastructure component.
* Easier to separate concerns.
* Better isolation and fewer risks of conflicts between changes in different repos.
#### Cons:

* Can be challenging to manage dependencies across multiple repositories.
* More difficult to enforce security policies and collaboration standards.
* May require more management and tools to orchestrate the updates.


### Resource-based MultiRepo 
A Resource-based repository approach is based on organizing Git repositories according to resources. infrastructure and application are two different repositories, how ever prod and app namespaces are still separated using folders.

```
infrastructure-repo
|
├── dev
│   ├── folder1
│   ├── folder2
├── prod
    ├── folder1
    ├── folder2
    
application-repo
|
├── dev
│   ├── folder1
│   ├── folder2
├── prod
    ├── folder1
    ├── folder2    
```
#### Pros:

* easy to separate concerns 
* Collaboration multiple repositories can help you organize your team's work by allowing you to assign specific repositories to specific team members
* can increase security by separating the environments using bracnhes, only valide changes submitted to prod environment.

#### Cons:

* needs to manage changes acrross multiple repositories  
* bla bla bla 
* bla bla bla 

### Context-based MultiRepo (Gimlet) 
at gimlet each repo represent a context `resource@namespace` , were we separate environment into staging and production, and resources into infrastructure and application. 

given that, we will have the following repositories.

* `staging@infrastructure`
* `prod@infrastructure`
* `staging@application`
* `prod@application`

we use the following convetion for naming:
`gitops-namespace-resource`

bla bla ....
```
resource@namespace
|
├── folder1
│   ├── file1
│   ├── file2
├── folder2
    ├── file1
    ├── file2

example:
gitops-staging-infra
|
├── folder1
│   ├── file1
│   ├── file2
├── folder2
    ├── file1
    ├── file2    
```
#### Pros:

* effective way to separate concerns 
* Collaboration multiple repositories can help you organize your team's work by allowing you to assign specific repositories to specific team members
* can increase security by separating the environments using bracnhes, only valide changes submitted to prod environment.
#### Cons:

* needs to sync changes accross multiple repositories  
* bla bla bla 
* bla bla bla 

## Key considerations

In conclusion, the structure of your git repository can greatly impact the development and deployment process of your project.

By carefully planning and organizing your repository structure, you can improve collaboration, maintainability, and scalability of your codebase. Some key considerations to keep in mind when structuring your repository include your
- project's size and complexity,
- the nature of your development team,
- and the tools and workflows that you use.

By following best practices and taking the time to design a thoughtful repository structure, you can set yourself up for success and make it easier to maintain and evolve your project over time.

Remember that there is no one-size-fits-all approach to gitops repository structuring, and that it's important to experiment and iterate as you go to find the structure that works best for your team and your project's goals.
