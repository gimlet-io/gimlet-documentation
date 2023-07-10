import { Fragment, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import * as Fathom from "fathom-client";
import { ButtonLink } from '@/components/Button'
import { composePlugins } from 'next-compose-plugins/lib/compose';



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
          <div className="mx-auto max-w-4xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-100/10">
                  <span className="text-gray-600 dark:text-gray-300">
                    Announcing our SaaS Early Access. <a href="/blog/announcing-the-gimlet-saas-early-access" onClick={() => Fathom.trackGoal('KDOSOUVD', 0)} className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
                  </span>
                </div>
              </div>
              <div>
                <p className="mb-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-center">
                  Adopting Kubernetes is a big endevaur. But it is the deployment platform today.
                </p>
                <h1 className="text-4xl font-bold tracking-tight dark:text-slate-100 sm:text-center sm:text-5xl">
                  As little Kubernetes as you want.
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:text-center">
                  With Gimlet you can start with one-click-deploys, then stair-step your way to a gitops based application delivery platform when you need to.
                  Gimlet features the best of open-source out of the box, it is ejectable and open-source. It is the tooling you would build - given enough time.
                </p>
                <div className="mt-8 md:flex md:space-x-4 space-x-2 sm:justify-center">
                  <a
                    href="https://accounts.gimlet.io/signup/"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                    onClick={() => Fathom.trackGoal('XPL4AWPN', 0)}
                  >
                    Start deploying now
                  </a>
                  <a
                    href="/docs"
                    className="mt-4 md:mt-0 inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20"
                    onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
                  >
                    Read more
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
