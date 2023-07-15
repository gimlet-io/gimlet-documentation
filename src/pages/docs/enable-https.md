
## Prerequisites
- we need a real domain name
- real cluster with externally accessible LB IPs
- and ingress controller (from deploy your first app tutorial)

## Map to a real domain name

Add an A record to `*.mycompany.com` to ingress EXTERNAL IP

```
$ kubectl get svc -n infrastructure

NAME                                 TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)                      AGE
registry                             NodePort       10.43.142.56    <none>          5000:32447/TCP               3m52s
image-builder                        ClusterIP      10.43.232.222   <none>          9000/TCP                     3m51s
gimlet-agent                         ClusterIP      10.43.22.124    <none>          80/TCP                       3m51s
ingress-nginx-controller-metrics     ClusterIP      10.43.26.242    <none>          10254/TCP                    40s
ingress-nginx-controller-admission   ClusterIP      10.43.74.138    <none>          443/TCP                      40s
ingress-nginx-controller             LoadBalancer   10.43.78.31     200.100.123.10  80:31273/TCP,443:32217/TCP   40s
```

## Enable Cert-Manager

## Reconfigure app ingress to use the real domain name
Check app on domain name
enable https ingress setting

## Reconfigure Gimlet to use the real domain name - optional
not applicable on SaaS version, you can skip this chapter
Set HOST variable (TODO make it configurable)
update Github OAuth URLs
Access Gimlet on real domain name
