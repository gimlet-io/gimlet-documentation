import { Footer } from './home/Footer'
import { CheckIcon } from '@heroicons/react/solid'

const tiers = [
  {
    name: 'Hobbyist',
    href: '/signup',
    priceMonthly: "Free",
    description: 'The perfect tier to automate your blog or test-drive Gimlet without commitments.',
    includedFeatures: [
      'All Gimlet fearures.',
      'Unlimited users.',
      '1 deployed service.',
      'Community support.'
    ],
  },
  {
    name: 'Startup',
    href: '/signup',
    priceMonthly: "$99/mo",
    description: 'Use Gimlet to deploy your MVP. Upgrade when you build more services.',
    includedFeatures: [
      'All Gimlet fearures.',
      'Unlimited users.',
      'Up to 5 deployed services.',
      'Community support.'
    ],
  },
  {
    name: 'Growth',
    href: '/signup',
    priceMonthly: "$299/mo",
    description: 'Things are getting serious. Let&apos;s roll out Gimlet for your growing team. 🚀',
    includedFeatures: [
      'All Gimlet fearures.',
      'Unlimited users.',
      'Up to 50 deployed services.',
      'Slack support in businness-hours.',
      'Custom scale-out plan.',
    ],
  },
  {
    name: 'Enterprise',
    href: '#',
    priceMonthly: "Get in touch",
    description: 'We probably know each other by name at this point.',
    includedFeatures: [
      'All Gimlet fearures.',
      'Unlimited users.',
      'Unlimited services.',
      '24/7 Slack support.',
      'Custom scale-out plan.',
      'Bespoke cloud consultancy.'
    ],
  },
]
export function PricingPage() {
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-center">Pricing Plans</h1>
            <p className="mt-5 text-xl text-gray-500 sm:text-center">
              Evaluate Gimlet for free, then upgrade to add more services as you roll out. All plans include all features.
            </p>
            <div className="relative mt-6 flex self-center rounded-lg bg-gray-100 p-0.5 sm:mt-8">
              {/* <button
                type="button"
                className="relative ml-0.5 w-1/2 whitespace-nowrap rounded-md border border-transparent py-2 text-sm font-medium text-gray-700 focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8"
              >
                Monthly billing
              </button> */}
              <button
                type="button"
                className="relative w-full whitespace-nowrap rounded-md border-gray-200 bg-white py-2 text-sm font-medium text-gray-900 shadow-sm focus:z-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-auto sm:px-8"
              >
                Yearly billing
              </button>
            </div>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.name} className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
                <div className="p-6">
                  <h2 className="text-lg font-medium leading-6 text-gray-900">{tier.name}</h2>
                  <p className="mt-4 text-sm text-gray-500 h-16">{tier.description}</p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.priceMonthly}</span>
                  </p>
                  {tier.priceMonthly !== 'Get in touch' &&
                  <a
                    href={tier.href}
                    className="mt-10 block w-full rounded-md border border-indigo-600 bg-indigo-600 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                  >
                    Get Started
                  </a>
                  }
                  {(tier.priceMonthly === 'Get in touch') &&
                  <div className='h-20'></div>
                  }
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-sm font-medium text-gray-900">What&apos;s included</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.includedFeatures.map((feature) => (
                      <li key={feature} className="flex space-x-3">
                        <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                        <span className="text-sm text-gray-500">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="relative mx-auto mt-8 max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-md lg:max-w-4xl">
            <div className="flex flex-col gap-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 lg:flex-row lg:items-center lg:gap-8">
              <div className="lg:min-w-0 lg:flex-1">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Purchase support</h3>
                <div className="mt-2 text-base leading-7 text-gray-600">
                  You can get 24/7 Slack support, Gimlet and bespoke consultancy for any tier.
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-md lg:max-w-4xl mt-8">
            <div className="flex flex-col gap-6 rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10 lg:flex-row lg:items-center lg:gap-8">
              <div className="lg:min-w-0 lg:flex-1">
                <h3 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">Self-host</h3>
                <div className="mt-2 text-base leading-7 text-gray-600">
                  You get all Gimlet features without user and number of deployed services limitation if you self-host.
                </div>
              </div>
              <div>
                <a
                  href="/docs/installation"
                  className="inline-block rounded-lg bg-indigo-50 px-4 py-2.5 text-center text-sm font-semibold leading-5 text-indigo-700 hover:bg-indigo-100"
                >
                  Install Gimlet now<span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer />
    </>
  )
}