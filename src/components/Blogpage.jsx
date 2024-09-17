import { Prose } from '@/components/Prose'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import { useTableOfContents } from './DocsPage'

export function BlogPage({ children, className, tabs, code, language, title, section, pageProps, tableOfContents }) {
  
  let router = useRouter()
  const ref = router.pathname.slice(1).replaceAll("/", "-")
  let isBlogSubPage = !router.pathname.endsWith('/blog') && !router.pathname.endsWith('/blog/')

  const date = pageProps.markdoc?.frontmatter.date
  const image = pageProps.markdoc?.frontmatter.image
  const imageAuthor = pageProps.markdoc?.frontmatter.image_author
  const imageURL = pageProps.markdoc?.frontmatter.image_url

  let author = pageProps.markdoc?.frontmatter.author
  let authorAvatar = pageProps.markdoc?.frontmatter.authorAvatar
  const coAuthor = pageProps.markdoc?.frontmatter.coAuthor
  const coAuthorAvatar = pageProps.markdoc?.frontmatter.coAuthorAvatar

  let currentSection = useTableOfContents(tableOfContents)

  function isActive(section) {
    if (section.id === currentSection) {
      return true
    }
    if (!section.children) {
      return false
    }
    return section.children.findIndex(isActive) > -1
  }

  if (!author) {
    author = "Laszlo Fogas"
  }
  if (!authorAvatar) {
    authorAvatar = "/laszlo.jpg"
  }

  return (
    <div className="relative mx-auto flex max-w-8xl justify-center sm:px-2 xl:grid xl:grid-cols-12 gap-16 pb-32">
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-hidden xl:py-16 xl:col-span-3">
        </div>
        <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-none xl:col-span-6">
          <article>
            {(title || section) && (
              <header className="mb-9 space-y-1">
                {section && (
                  <p className="font-display text-sm font-medium text-sky-500">
                    {section.title}
                  </p>
                )}
                {title && (
                  <>
                  <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white mb-2">
                    {title}
                  </h1>
                  {isBlogSubPage &&
                  <div className="flex">
                    <div className='flex items-center py-2'>
                      <img className="inline-block h-12 w-12 rounded-full" alt={author} src={authorAvatar} />
                      <h5 className="pl-2 text-slate-900 dark:text-white font-medium">{author}</h5>
                    </div>
                    {coAuthor &&
                    <div className='flex items-center py-2 pl-8'>
                      <img className="inline-block h-12 w-12 rounded-full" alt={coAuthor} src={coAuthorAvatar} />
                      <h5 className="pl-2 text-slate-900 dark:text-white font-medium">{coAuthor}</h5>
                    </div>
                    }
                  </div>
                  }
                  <div className="text-slate-900 dark:text-white">{date}</div>
                  </>
                )}
              </header>
            )}
            {image &&
            <img alt={`${imageAuthor - imageURL}`} src={`/${image}`} className="lg:h-96 object-contain w-full"/>
            }
            <Prose className="mt-16">{children}</Prose>
          </article>
          {isBlogSubPage &&
          <>
            <div className="relative py-32">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
            </div>
            <h3 className='font-medium text-lg dark:text-gray-300'>More from our blog</h3>
            <div className='flex mt-8'>
              <img src="/kubernetess-remote-gpu-ollama-blog-post-cover.jpg" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/how-to-use-nvidia-gpu-with-kubernetes?ref="+ref}>Use Ollama with Cloud Nvidia GPU Kubernetes Cluster</a></h2>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="https://api.placid.app/u/ghvjld730lsgd?title[text]=Open-Source%20as%20a%20Bootstrapped%20Company%20-%20We%20Are%20Changing%20License" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/open-source-as-a-bootstrapped-company-we-are-changing-license?ref="+ref}>Open-Source as a Bootstrapped Company – We Are Changing License</a></h2>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/why-hetzner.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/announcing-the-gimlet-saas-early-access?ref="+ref}>The how and why we built our SaaS platform on Hetzner and Kubernetes</a></h2>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/gitops-broke-cicd.jpg" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/how-flux-broke-the-cicd-feedback-loop-and-how-we-pieced-it-back-together?ref="+ref}>How Flux broke the CI/CD feedback loop, and how we pieced it back together</a></h2>
              </div>
            </div>
            <div className='flex mt-8'>
              <img src="/introducing-kyverno.png" className="w-48 object-contain"></img>
              <div className='ml-2'>
                <h2 className="mb-2 font-medium underline dark:text-gray-300"><a href={"/blog/are-you-sure-none-of-your-containers-run-as-root?ref="+ref}>Are you sure none of your containers run as root?</a></h2>
              </div>
            </div>
          </>
          }
        </div>
        <div className="hidden xl:sticky xl:top-[4.5rem] xl:block xl:h-[calc(100vh-4.5rem)] xl:flex-none xl:overflow-y-hidden xl:py-16 xl:col-span-3">
          <nav aria-labelledby="on-this-page-title" className="w-56">
            {tableOfContents.length > 0 && (
              <>
                <h2
                  id="on-this-page-title"
                  className="font-display text-sm font-medium text-slate-900 dark:text-white"
                >
                  On this page
                </h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {tableOfContents.map((section) => (
                    <li key={section.id}>
                      <h3>
                        <Link href={`#${section.id}`}>
                          <span
                            className={clsx(
                              isActive(section)
                                ? 'text-sky-500'
                                : 'font-normal text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                            )}
                          >
                            {section.title}
                          </span>
                        </Link>
                      </h3>
                      {section.children.length > 0 && (
                        <ul className="mt-2 space-y-3 pl-5 text-slate-500 dark:text-slate-400">
                          {section.children.map((subSection) => (
                            <li key={subSection.id}>
                              <Link href={`#${subSection.id}`}>
                                <span
                                  className={
                                    isActive(subSection)
                                      ? 'text-sky-500'
                                      : 'hover:text-red-600 dark:hover:text-slate-300'
                                  }
                                >
                                  {subSection.title}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </nav>
        </div>
      </div>
  )
}
