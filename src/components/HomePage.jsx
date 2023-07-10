import { Hero } from '@/components/Hero'
import { Footer } from './home/Footer'
import Link from 'next/link'

export function HomePage({ className, tabs, code, language }) {
  const installCommand = `
  helm template gimlet-io/gimlet | kubectl apply -f -
  `

  return (
    <>
      <Link href="/">
        <a className="block lg:w-auto">
          <span className="sr-only">Home page</span>
          <img src="/logo.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
          <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
        </a>
      </Link>
      <Hero />
      <div className="mx-auto max-w-4xl">
      <div className="p-4 bg-gray-900 text-yellow-100 rounded-lg">
        <div className="whitespace-pre-wrap">
          <p className="text-green-100"># Install Gimlet on any Kubernetes cluster.</p>
          <p className="text-green-100"># Even on a cluster running on your laptop - we recommend using <a className="underline cursor-pointer">k3d</a>. </p>
          <p className="text-green-100"># Install with:</p>

          <p className="font-semibold my-4">helm template gimlet-io/gimlet | kubectl apply -f -</p>

          <p className="text-green-100"># Or get started deploying your applications on our <a href="" className="underline cursor-pointer">hosted version</a>.</p>
          <p className="text-green-100"># We have a free tier, that <a href="" className="underline cursor-pointer">won't make you think</a> every corner</p>
        </div>
      </div>
      </div>
      <div className="mt-8 md:flex md:space-x-4 space-x-2 sm:justify-center">
        <a
          href="https://accounts.gimlet.io/signup/"
          className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
          onClick={() => Fathom.trackGoal('XPL4AWPN', 0)}
        >
          Documentation
        </a>
        <a
          href="/docs"
          className="mt-4 md:mt-0 inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20"
          onClick={() => Fathom.trackGoal('VEWYCI7B', 0)}
        >
          Documentation
          USP: deploy any commit
          USP: know what is who deployed what and when, see commits and not a real auditlog, something gitops hasn't delivered
          USP: Ejectable, composable design. Gimlet is Flux underneath, plus workfllows that otherwise you would have to build
          USP: gitops unbroken ci feedback loop
          USP: stair-step, as little, no steep ramp up
        </a>
      </div>
      {/* <Message />
      <Shot />
      <Gitops />
      <ClickOps />
      <Integration />
      <Bring />
      <YamlAuthoring />
      <Configuration />
      <AppPlatform />
      <CTA /> */}
      <Footer />
    </>
  )
}