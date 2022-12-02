import { Hero } from '@/components/Hero'
import { YamlAuthoring } from '@/components/home/YamlAuthoring'
import { Configuration } from './home/Configuration'
import { Gitops } from './home/Gitops'
import { ClickOps } from './home/ClickOps'
import { AppPlatform } from './home/AppPlatform'
import { Footer } from './home/Footer'
import { Message } from './home/Message'
import { Integration } from './home/Integration'
import { Bring } from './home/Bring'
import { Shot } from './home/Shot'

export function HomePage({ className, tabs, code, language }) {
  return (
    <>
      <Hero />
      <Message />
      <Shot />
      <Gitops />
      <Integration />
      <Bring />
      <Configuration />
      <ClickOps />
      <YamlAuthoring />
      <AppPlatform />
      <div className="bg-white">
      <div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to give it a try?</span>
          <span className="block">The SaaS version takes just a few clicks.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
            >
              Try the SaaS version
            </a>
          </div>
          <div className="ml-3 inline-flex">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-100 px-5 py-3 text-base font-medium text-indigo-700 hover:bg-indigo-200"
            >
              Or self-host Gimlet
            </a>
          </div>
        </div>
      </div>
    </div>
      <Footer />
    </>
  )
}