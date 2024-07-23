---
title: 'Volumes'
description: |
  Volumes provide a way to store persistent data for your applications.
---

Volumes provide a way to store persistent data for your applications.

You can add volumes to your deployment after you deployed the application. You can do this in the [application settings](/docs/deployment-settings/deployment-configuration#editing-deployment-configs) or directly in the [Gimlet manifest file](/docs/deployment-settings/deployment-configuration#the-gimlet-manifest). This page shows Gimlet manifest examples.

![Adding a volume in Gimlet](/docs/screenshots/volumes/gimlet-io-volume-configuration.png)

## Basic Volume Configuration

Example:

```
  volumes:
    - name: data
      path: /data
      size: 10Gi
```

More settings:
- `pvcAnnotations`: Key-value pairs that you can configure for various purposes. Learn more about annotations here. When you use annotations this way, you don't need the `name` variable.
- `storageClass`: Slug indicating the disk type of your cloud provider.

## Use an Existing Volume Claim

Example:

```
  volumes:
    - path: /data
      existingClaim: my-pvc
```

## Use a Path From The Host

Example:

```
  volumes:
    - name: data
      path: /data
      hostPath:
        path: /somewhere/over/the/rainbow
```

## Use an Ephemeral Volume

Example:

```
  volumes:
    - name: ephemeral-volume
      path: /data
      size: 10Gi
      emptyDir: true
```

## Mount an Existing configMap as a File

Example:

```
  volumes:
    - name: data
      path: /data/dummy.conf
      existingConfigMap: data
      subPath: dummy.conf
```

## Custom String to Mount as a File

Example:

```
  volumes:
    - name: data
      path: /data
      size: 10Gi
      fileContent: mysecretjsoncontent
      fileName: credentials.json
```
