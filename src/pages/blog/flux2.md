H1: Introducing Capacitor, a general purpose UI for Flux

Body:

Flux has been one of the most popular GitOps tools available for years. Yet, it only existed as a CLI tool until now. Capacitor is a GUI that acts as a dashboard for Flux where engineers can get fast feedback about performance and get to the cause of errors in their source code.

And now a word from Laszlo, one of the maintainers of Capacitor:

“Hello Flux blog,

Long time reader here, always shy to speak up. We’re standing on the shoulders of giants, Flux maintainers.
It’s an odd fact that there was no de facto Flux GUI so far. How come?
We thought we could make one, introducing Capacitor.

Why?
because it is not easy to observe Kustomization / Helm release states,
not easy to spot errors,
and the tools that display Kustomizations and Helm releases in tables are not giving enough context.

We hope you’re going to find the tool useful.”

H2: Use cases

H3: Debugging feedback loop

Capacitor gives instant feedback of the performance of runtimes. When an issue emerges, the tool links to the cause of the error in the source code, as you can see in the screenshot below.

[image]

H3: Commandless Flux observation

The GUI substitutes for interacting with runtimes via Flux commands in multiple terminal windows.

H2: What’s supported?

The tool supports native Kubernetes deployments of Git branches, as well as Helm charts and Kustomizations.

H2: Who made Capacitor?

Capacitor is an open-source project backed by Gimlet, a team that creates several Kubernetes and GitOps related tools.

H2: How to get started?

Capacitor doesn’t come with Flux natively, you’ll need to set it up separately with one of the methods described below: as Kubernetes manifest or Helm chart.

H3: Kubernetes manifest

You can set up the Kubernetes manifest as described below:

```k8s manifests from readme```

H3: Deploy as a Helm chart

Below you can look at the Helm chart of Capacitor.

```Helm chart from readme```
