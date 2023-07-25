---
title: Setting up DNS and HTTPS
description: "In this tutorial, you will map a DNS name to your app and enable HTTPS."
---

In this tutorial, you will map a DNS name to your app and enable HTTPS.

## Prerequisites
- An application that you deployed with Gimlet. Practically, you have finished the [Deploying your first app](/docs/deploy-your-first-app) tutorial.
- You need a real cluster that is capable of creating externally accessible load balancers. Practically any Kubernetes cluster that is running on a cloud provider.
- You are going to need a real domain name, or you can use the nip.io dynamic DNS service as this tutorial is going to.

## Setting up an Nginx ingress controller

In this section you are going to install an Nginx server that will be accessible on a publicly accessible IP address.

This Nginx will be the reverse proxy that will route traffic to your application based on the host name.

Navigate to the "Environments" tab to get started.

### Convert to a gitops environment to be able to make changes

Gimlet generated a dummy environment at first start. You used that environment so far to deploy applications.

You are going to continue using this dummy environment in this tutorial and set up Nginx in it. But before you can make changes to this built-in environment,  you have to convert it to a gitops environment. Practically, you have to push the "convert it to a gitops environment" link in the notice bellow.

It will create two repositories on Github, one for application manifests, and one for infrastructure manifests. It is a good time to inspect the contents now. These are the manifests that are synchronized to Kubernetes on every commit.

![](/convert.png)

### Enabling Nginx

Enable Nginx under Environments > Brief-Pond > Infrastructure components tab > Nginx > Config tab, where brief-pond is the name of my dummy environment.

If you have a real domain name to map your application to, add that under the host field. Later you will set a wildcard DNS entry for it. If you use the `test.mycompany.com` DNS name, services will be put under `*.test.mycompany.com`.

Set `test.mycompany.com` in the host field.

If you don't have a real domain name, set the value `tbd` for now.

![](/nginx-tbd.png)

Save the configuration with the "Save componentes" button. Inspect and merge the pull request that is created by Gimlet.

Once you merged the pull request, the changes will be synchronized to your cluster.

You can track the syncronization status on the bottom toolbar.

![](/gitops-status.png)

### Locate the external IP address

The Nginx deployment has a `LoadBalancer` service type in Kubernetes, thus the cloud provider will provision a cloud load balancer for it. It may take a couple of minutes until the load balancer is created.

Find the service IP address now.

```
$ kubectl get svc -n infrastructure

NAME                     TYPE           CLUSTER-IP      EXTERNAL-IP     AGE
registry                 NodePort       10.43.142.56    <none>          3m52s
image-builder            ClusterIP      10.43.232.222   <none>          3m51s
gimlet-agent             ClusterIP      10.43.22.124    <none>          3m51s
ingress-nginx-controller LoadBalancer   10.43.78.31     100.200.0.2     40s
```

Set an A record in your DNS provider to `*.test.mycompany.com` to this EXTERNAL IP.

If you are using the nip.io dynamic DNS service, `*.100.200.0.2.nip.io` will be the domain name where you are going to access applications in this tutorial. Also, if you are using nip.io, now is the time to go back and reconfigure Nginx-s `tbd` value to `100.200.0.2.nip.io`.

## Map your application to the domain name

Now that the Nginx reverse proxy is accessible on a public IP address and a domain name, it is time to map your application to that domain name.

### Edit application config

Navigate to the "Repositories" tab in Gimlet and pick your application repository.

Pick the environment configuration you want to edit, and click the cog wheel icon.

![](/cog.png)

  - On the "Basics" tab set the "Port" your app is listening on
  - Then on the "Ingress" tab set the following
    - "Host Name" to `your-app.test.mycompany.com` if you expose services under `test.mycompany.com`. In this tutorial we use nip.io `reactjs-test-app.100.200.0.2.nip.io`
    - and add an "Annotation" with key `kubernetes.io/ingress.class` and value `nginx`.

![](/ingress-settings.png)
 

Press save, then inspect and merge the pull request.

Navigate back to the repository, refresh the commits if necessary, then deploy the latest commit.

### Access on the domain name

Open [http://reactjs-test-app.100.200.0.2.nip.io](http://reactjs-test-app.100.200.0.2.nip.io)

## Enable HTTPS

To get free SSL certificates from Let's Encrypt, let's deploy now the Cert-Manager component.

### Install Cert-Manager

Enable Cert-Manager under Environments > Brief-Pond > Infrastructure components tab > Cert-Managaer > Config tab

Save components, then merge the pull request like you did earlier with the Nginx component.

## Reconfigure app ingress to use Cert Manager

To tell Cert-Manager to provision new SSL certificates for your application, edit the deployment application deployment configuration again.

On the "Ingress" tab toggle the HTTPS tab, then add an annpotation with key `cert-manager.io/cluster-issuer` and value `letsencrypt`.

Save the configuration, merge the pull request then redeploy the application.

Open [https://reactjs-test-app.100.200.0.2.nip.io](https://reactjs-test-app.100.200.0.2.nip.io), this time over a secured connection. 🎉

{% callout title="HTTPS is not secure?" %}
It takes about a minute for Cert-Manager to provision the certificate. Anything more indicates an issue. Join our Discord community to get help.

Please note that Let's Encrypt does not issue certificates for nip.io domains.
{% /callout %}
