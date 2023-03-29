import { useState } from 'react';
import HelmUI from "helm-react-ui";
import ReactDiffViewer from 'react-diff-viewer-continued';
import { CodeWindow } from '@/components/CodeWindow'
import * as schema from '@/components/values.schema.json'
import { helmUIJson } from '@/components/helmUIJson'

export function YamlGenerator() {
    const [values, setValues] = useState({
        vars: {
            myvar: "myvalue",
            myvar2: "myvalue2",
        }
    })
    const [nonDefaultValues, setNonDefaultValues] = useState({})

    function validationCallback(errors) {
        if (errors) {
            console.log(errors);
        }
    };

    function valuesSetter(values, nonDefaultValues) {
        setValues(values);
        setNonDefaultValues(nonDefaultValues);
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-900">
                <div className="mx-auto p-4 sm:p-6 lg:p-8">
                    <div className="sm:align-center sm:flex sm:flex-col">
                        <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
                            <div>
                                <HelmUI
                                    schema={schema}
                                    config={helmUIJson}
                                    values={values}
                                    setValues={valuesSetter}
                                    validate={true}
                                    validationCallback={validationCallback}
                                />
                            </div>
                            <div>
                                <ReactDiffViewer
                                    newValue={valuesSample}
                                    splitView={false}
                                    showDiffOnly={false}
                                    hideLineNumbers={true}
                                    useDarkTheme={true}
                                    styles={{
                                        diffContainer: {
                                            overflowX: "auto",
                                            display: "block",
                                            "& pre": { whiteSpace: "pre" }
                                        }
                                    }} />
                            </div>
                            <div>
                                <ReactDiffViewer
                                    newValue={k8sSample}
                                    splitView={false}
                                    showDiffOnly={false}
                                    hideLineNumbers={true}
                                    useDarkTheme={true}
                                    styles={{
                                        diffContainer: {
                                            overflowX: "auto",
                                            display: "block",
                                            "& pre": { whiteSpace: "pre" }
                                        }
                                    }} />
                            </div>
                            <div>
                                <CodeWindow
                                    tabs={[
                                        {
                                            name: 'values.yaml',
                                            code: valuesSample,
                                        },
                                        {
                                            name: 'k8s-yaml.yaml',
                                            code: k8sSample,
                                        },
                                    ]}
                                    language="yaml"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const valuesSample = `gitRepository: xxx/frontend
gitSha: '{{ .CIRCLE_SHA1 }}'
image:
    pullPolicy: Always
    repository: xx/frontend
    tag: '{{ .CIRCLE_SHA1 }}'
ingress:
    annotations:
        cert-manager.io/cluster-issuer: letsencrypt
        kubernetes.io/ingress.class: nginx
host: xxxxx
tlsEnabled: true
probe:
    enabled: true
    path: /healthcheck
settings:
    failureThreshold: 5
replicas: 3
resources:
ignore: true
sealedSecrets:
    hello: I want this to be sealed
vars:
    NODE_ENV: production
    X_ENV: staging
`

const k8sSample = `apiVersion: apps/v1
kind: Deployment
metadata:
  name: octopus-deployment
  labels:
    app: web
spec:
  selector:
    matchLabels:
      octopusexport: OctopusExport
  replicas: 1
  strategy:
    type: RollingUpdate
  template:
    metadata:
      labels:
        app: web
        octopusexport: OctopusExport
    spec:
      containers:
        - name: nginx
          image: nginx
          ports:
            - containerPort: 80
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              podAffinityTerm:
                labelSelector:
                  matchExpressions:
                    - key: app
                      operator: In
                      values:
                        - web
                topologyKey: kubernetes.io/hostname`


// const helmUIJson = [
//     {
//         "schemaIDs": [
//             "#/properties/image",
//             "#/properties/containerPort",
//             "#/properties/replicas"
//         ],
//         "uiSchema": {
//             "#/properties/replicas": {
//                 "ui:widget": "range"
//             }
//         },
//         "metaData": {
//             "name": "Basics",
//             "icon": "M17 8l4 4m0 0l-4 4m4-4H3"
//         }
//     },
//     {
//         "schemaIDs": [
//             "#/properties/resources"
//         ],
//         "uiSchema": {
//         },
//         "metaData": {
//             "name": "Resources",
//             "icon": "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//         }
//     },
//     {
//         "schemaIDs": [
//             "#/properties/probe"
//         ],
//         "uiSchema": {
//         },
//         "metaData": {
//             "name": "Health",
//             "icon": "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//         }
//     },
//     {
//         "schemaIDs": [
//             "#/properties/vars"
//         ],
//         "uiSchema": {
//             "#/properties/vars": {
//                 "additionalProperties": {
//                     "type": "string"
//                 }
//             }
//         },
//         "metaData": {
//             "name": "Environment Variables",
//             "icon": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//         }
//     },
//     {
//         "schemaIDs": [
//             "#/properties/sealedSecrets"
//         ],
//         "uiSchema": {
//             "#/properties/sealedSecrets": {
//                 "additionalProperties": {
//                     "type": "string"
//                 }
//             }
//         },
//         "metaData": {
//             "name": "Sealed Secrets",
//             "icon": "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//         }
//     },
//     {
//         "schemaIDs": [
//             "#/properties/ingress"
//         ],
//         "uiSchema": {},
//         "metaData": {
//             "name": "Host Names",
//             "icon": "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
//         }
//     }
// ]
