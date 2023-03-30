import { useState } from 'react';
import HelmUI from "helm-react-ui";
import ReactDiffViewer from 'react-diff-viewer-continued';
import YAML from "json-to-pretty-yaml";
import * as schema from '@/components/values.schema.json'
import { helmUIJson } from '@/components/helmUIJson'

export function YamlGenerator() {
    const [values, setValues] = useState({})
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
        <div className="bg-white dark:bg-gray-900">
            <div className="mx-auto p-2 sm:p-4 lg:p-6">
                <h1 className="text-gray-900 text-xl font-semibold text-center mb-8">Kubernetes YAML Generator</h1>
                <div className="sm:align-center sm:flex sm:flex-col space-y-2">
                    <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 xl:grid-cols-2">
                        <div className="border-2 p-4 rounded-md">
                            <HelmUI
                                schema={schema}
                                config={helmUIJson}
                                values={values}
                                setValues={valuesSetter}

                                validate={true}
                                validationCallback={validationCallback}
                            />
                        </div>
                        <div className="p-2 rounded-md bg-diff-viewer">
                            <svg onClick={() => copyToClipboard(k8sSample)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer float-left h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <ReactDiffViewer
                                oldValue={k8sSample}
                                newValue={k8sSample}
                                splitView={false}
                                showDiffOnly={false}
                                hideLineNumbers={true}
                                useDarkTheme={true}
                                styles={{
                                    diffContainer: {
                                        backgroundColor: "#044B53",
                                        overflowX: "auto",
                                        display: "block",
                                        "& pre": { whiteSpace: "pre" }
                                    }
                                }} />
                        </div>
                    </div>
                    <div className="p-2 rounded-md bg-diff-viewer">
                        <svg onClick={() => copyToClipboard(YAML.stringify(nonDefaultValues))} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer float-left h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <ReactDiffViewer
                            oldValue={YAML.stringify(nonDefaultValues)}
                            newValue={YAML.stringify(nonDefaultValues)}
                            splitView={false}
                            showDiffOnly={false}
                            hideLineNumbers={true}
                            useDarkTheme={true}
                            styles={{
                                diffContainer: {
                                    backgroundColor: "#044B53",
                                    overflowX: "auto",
                                    display: "block",
                                    "& pre": { whiteSpace: "pre" }
                                }
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function copyToClipboard(copyText) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(copyText);
    } else {
        unsecuredCopyToClipboard(copyText);
    }
}

function unsecuredCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
}


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
                topologyKey: kubernetes.io/hostname`;
