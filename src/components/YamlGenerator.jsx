import { useState, useEffect } from 'react';
import HelmUI from "helm-react-ui";
import { ThemeSelector } from './ThemeSelector';
import ReactDiffViewer from 'react-diff-viewer-continued';
import YAML from "json-to-pretty-yaml";
import * as schema from '@/components/values.schema.json'
import { helmUIJson } from '@/components/helmUIJson'
import axios from "axios";

export function YamlGenerator() {
  const [values, setValues] = useState({})
  const [nonDefaultValues, setNonDefaultValues] = useState({})
  const [kubernetesYaml, setKubernetesYaml] = useState("")

  function validationCallback(errors) {
    if (errors) {
      console.log(errors);
    }
  };

  function valuesSetter(values, nonDefaultValues) {
    setValues(values);
    setNonDefaultValues(nonDefaultValues);
  }

  useEffect(() => {
    postWithAxios("https://yaml-generator.gimlet.io", nonDefaultValues).then(data => {
      setKubernetesYaml(data)
    }).catch(err => {
      console.error(`Error: ${err}`);
    });
  }, [nonDefaultValues]);

  const diffBody = `cat << EOF > values.yaml
${YAML.stringify(nonDefaultValues)}
EOF

helm repo add onechart https://chart.onechart.dev
helm template my-release onechart/onechart -f values.yaml
`

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto p-2 sm:p-4 lg:p-6">
        <header className="grid grid-cols-3 items-center mb-8">
          <h1 className="text-gray-900 dark:text-slate-50 text-2xl font-semibold text-center col-start-2">Kubernetes YAML Generator</h1>
          <div className="col-start-3 justify-self-end mr-10">
            <ThemeSelector className="relative z-10 items-end" />
          </div>
        </header>
        <div className="sm:align-center sm:flex sm:flex-col space-y-2">
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-2 sm:space-y-0 xl:grid-cols-8">
            <div className="dark:bg-white border-2 p-4 rounded-md col-span-5">
              <HelmUI
                schema={schema}
                config={helmUIJson}
                values={values}
                setValues={valuesSetter}

                validate={true}
                validationCallback={validationCallback}
              />
            </div>
            <div className="p-2 rounded-md bg-diff-viewer-dark col-span-3">
              <svg onClick={() => copyToClipboard(kubernetesYaml)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer float-left h-6 w-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <ReactDiffViewer
                oldValue={kubernetesYaml}
                newValue={kubernetesYaml}
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
          <div className="container max-w-5xl mx-auto dark:text-slate-50 pt-16 font-medium text-xl">
            <p className="">This is not magic.</p>
            <p className="pt-4">The YAML is generated with a Helm chart.</p>
            <p className="pt-4">A Helm chart that you can also use on your terminal.</p>
            <p className="pt-4">Try this:</p>
            <div className="mt-8 p-2 rounded-md border-2 bg-diff-viewer-light">
              <svg onClick={() => copyToClipboard(diffBody)} xmlns="http://www.w3.org/2000/svg" className="cursor-pointer float-left h-6 w-6 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <ReactDiffViewer
                oldValue={diffBody}
                newValue={diffBody}
                splitView={false}
                showDiffOnly={false}
                hideLineNumbers={true}
                styles={{
                  diffContainer: {
                    backgroundColor: "#fafbfc",
                    overflowX: "auto",
                    display: "block",
                    "& pre": { whiteSpace: "pre" }
                  }
                }} />
            </div>
            <p className='pt-8 text-base text-blue-500'>Are you new to Helm? Check out <a href="/concepts/the-sane-helm-guide" className="underline">our SANE guide</a>.</p>
            <p className='text-base text-blue-500'>Curious about the onechart/onechart&apos;s configuration options? See <a href="/concepts/the-sane-helm-guide" className="underline">the reference</a>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const postWithAxios = async (path, body) => {
  try {
    const { data } = await axios
      .post(path, body, {
        withCredentials: false,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    return data;
  } catch (error) {
    this.onError(error.response);
    throw error.response;
  }
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
