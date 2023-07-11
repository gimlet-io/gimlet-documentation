import { Hero } from '@/components/Hero'
import { Footer } from './home/Footer'
import Link from 'next/link'

export function HomePage({ className, tabs, code, language }) {
  const installCommand = `
  helm template gimlet-io/gimlet | kubectl apply -f -
  `

  return (
    <>
      <div className="text-center pt-12 sm:pt-16">
        <Link href="/">
          <a>
            <span className="sr-only">Home page</span>
            <img src="/logo.svg" alt="Gimlet" className='h-10 sm:h-16 inline dark:hidden' />
            <img src="/logo-dark.svg" alt="Gimlet" className='h-10 sm:h-16 hidden dark:inline' />
          </a>
        </Link>
      </div>
      <div className="pt-20 pb-32 sm:pt-20 sm:pb-32">
        <Hero />
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