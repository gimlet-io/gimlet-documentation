import { Fragment, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'

export function Hero() {
  const [deploying, setDeploying] = useState(false)
  const [processed, setProcessed] = useState(false)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const deploy = () => {
    setDeploying(true);

    setTimeout(() => {
      setProcessed(true);

      setTimeout(() => {
        setApplying(true);
        setTimeout(() => {
          setApplied(true);
        }, 3000);
      }, 1000);

    }, 1500);
  }
  
  return (
    <div className="overflow-hidden dark:-mb-32 dark:-mt-[4.5rem] dark:pb-32 dark:pt-[4.5rem] dark:lg:-mt-[4.75rem] dark:lg:pt-[4.75rem]">
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-100/10">
                  <span className="text-gray-600 dark:text-gray-300">
                    Announcing our SaaS Beta. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight dark:text-slate-100 sm:text-center sm:text-6xl">Need to deploy on Kubernetes?</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-center">But not sure how to put things together? We got you covered.</p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a href="/signup" className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
                    Few clicks to get started for free
                    <span className="text-indigo-200" aria-hidden="true">&rarr;</span>
                  </a>
                  <a href="/docs" className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20">
                    Learn about the open-source version
                    <span className="text-gray-400" aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function deployStatus(deploying, processed, applying, applied) {

  let gitopsWidget = Loading();
  if (processed) {
    gitopsWidget = (
      <div className="mt-2">
        <p className="text-yellow-100 font-semibold">
          Manifests written to git
        </p>
        <div className="pl-2 mb-2">
          <p className="font-semibold truncate mb-1" title="test-app">
            test-app
            <span className='mx-1 align-middle'>✅</span>
            <span className="font-normal">7d2e268</span>
          </p>
        </div>
      </div>
    )
  }

  let appliedWidget = null
  if (applying && !applied) {
    appliedWidget = (
      <p className={`font-semibold text-yellow-300`}>
        <span className="h-4 w-4 rounded-full relative top-1 inline-block bg-yellow-400" />
        <span className='ml-1'>
          7d2e268
        </span>
        <span className='ml-1'>applying</span>
      </p>
    )
  }
  if (applied) {
    appliedWidget = (
      <p className={`font-semibold text-green-300`}>
        <span>✅</span>
        <span className='ml-1'>
          7d2e268
        </span>
        <span className='ml-1'>applied</span>
      </p>
    )
  }

  return (
    <>
      <div
        aria-live="assertive"
        className="px-4 py-6 pointer-events-none sm:p-6 sm:items-start"
      >
        <div className="w-full flex flex-col space-y-4">
          <Transition
            show={deploying}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="max-w-lg w-full bg-gray-800 text-gray-100 text-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex">
                  <div className="w-0 flex-1 justify-between">
                    <p className="text-yellow-100 font-semibold">
                      Rolling out test-app
                    </p>
                    <p className="pl-2  ">
                      🎯 staging
                    </p>
                    <p className="pl-2">
                      <span>📎</span>
                      <span className='ml-1'>ba52941</span>
                    </p>
                    {gitopsWidget}
                    <div className='pl-2 mt-4'>{appliedWidget}</div>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}

function Loading() {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
      viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4}></circle>
      <path className="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}
