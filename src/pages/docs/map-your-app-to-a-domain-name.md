## Prereq
- We build on Deploying your first app

## Steps
- we need an ingress controller
  - spin out the built in env to git
  - configure the nginx ingress
    - The k3d create script must be extended with an arg `k3d cluster create dummy2 --k3s-arg "--disable=traefik@server:0"`
    - Somehow we should incorporate this to the Blog post? Or the installation tutorial
  - wait for infra repo sync

- Edit default app config
  - we add ingress
  - pull request to the app repo

- magic deploy uses this app config (by convention the one that is called as the repo)

## End result
- we access the app on a nip.io DNS
