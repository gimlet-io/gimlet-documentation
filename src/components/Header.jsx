import { MobileNavigation } from '@/components/MobileNavigation'
import { Search } from '@/components/Search'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

export function Header({ navigation }) {
  let [isScrolled, setIsScrolled] = useState(false)
  let router = useRouter()
  let isDocsPage = router.pathname.startsWith('/docs') || router.pathname.startsWith('/concepts')
  let isHomePage = router.pathname === '/'
  let isFrontendPage = router.pathname === '/frontend'
  let isBackendPage = router.pathname === '/backend'
  let isAIPage = router.pathname === '/ai-deployment'

  let barbglight='bg-teal-100'
  let barbgscrolled='dark:bg-teal-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/75'
  if (isFrontendPage) {
    barbglight='bg-teal-100 dark:bg-teal-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-teal-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-teal-900/75'
  }
  if (isAIPage) {
    barbglight='bg-purple-100 dark:bg-purple-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-purple-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-purple-900/75'
  }
  if (isBackendPage) {
    barbglight='bg-amber-100 dark:bg-amber-800'
    barbgscrolled='bg-neutral-100/90 dark:bg-amber-900/50 dark:[@supports(backdrop-filter:blur(0))]:bg-amber-900/75'
  }

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div className="sticky top-0 z-50">
    <header
      className={clsx(
        'max-w-8xl mx-auto flex flex-wrap items-center justify-between ' + barbglight + ' dark:shadow-none shadow-neutral-900/5 transition duration-500 px-4 py-5 sm:px-6 lg:px-8',
        {
          ['dark:backdrop-blur ' + barbgscrolled]: isScrolled,
          'bg-transparent': !isScrolled,
          'shadow-md': isScrolled,
        }
      )}
    >
      <div className="mr-6 lg:hidden">
        <MobileNavigation navigation={navigation} />
      </div>
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/">
          <span className="block lg:w-auto">
            <span className="sr-only">Home page</span>
            <img src="/logo-new.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto block dark:hidden' />
            <img src="/logo-dark.svg" alt="Gimlet" className='h-8 sm:h-10 w-auto hidden dark:block' />
          </span>
        </Link>
      </div>
        
      <div>
        { isDocsPage &&
        <Search />
        }
        { !isDocsPage &&
        <ul className="hidden sm:flex space-x-8 font-semibold text-lg">
          <li className='hover:text-teal-500 dark:hover:text-teal-200'>
            <a href="/blog">Blog</a>
          </li>
          <li className='hover:text-teal-500 dark:hover:text-teal-200'>
            <a href="/docs">Docs</a>
          </li>
        </ul>
        }
      </div>
      
      <div className="relative flex basis-0 justify-end space-x-6 sm:space-x-8 md:flex-grow">
      
      </div>
    </header>
    </div>
  )
}
