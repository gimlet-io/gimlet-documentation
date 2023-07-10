import { Hero } from '@/components/Hero'
import { Footer } from './home/Footer'

export function HomePage({ className, tabs, code, language }) {
  return (
    <>
      <Hero />
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