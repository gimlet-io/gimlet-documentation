## Prereq
- We build on Deploying your first app

## Steps
- we need an ingress controller
  - spin out the built in env to git (1 click)
  - configure the nginx ingress
  - wait for infra repo sync

- Edit default app config
  - we add ingress
  - pull request to the app repo

- magic deploy uses this app config (by convention the one that is called as the repo)

## End result
- we access the app on a nip.io DNS
