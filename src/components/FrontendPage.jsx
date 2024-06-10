import { Footer } from './home/Footer'
import Link from 'next/link'
import { languages } from './Languages'
import { CTA } from './CallToAction'
import { recommendation } from './Testimonial'

const sections = {
  "Branch Previews": [
    { title: "Frontend Testing", desc: "Ship changes and take a look at your application before deploying to production." },
    { title: "Rollbacks & Auto-Deployments", desc: "Advanced deployment capabilities to turn your frontend highly available." },
  ],
  "Security and Support": [
    { title: "HTTPS/SSL", desc: "Secure communication between your app and your users." },
    { title: "All Languages Supported", desc: "Deploy any language and framework you prefer to use." },
  ],
  "Observability": [
    { title: "Integrate with Grafana & Prometheus", desc: "Track performance data of your frontend in real-time." },
    { title: "Analyze Performance Issues", desc: "Find out how you can further improve the performance of your application." },
  ],
  "Fixed Pricing": [
    { title: "One-Time Annual Payment", desc: "$299 billed annually without usage limits, transfer fees and monetization restrictions." },
    { title: "Migrate from Gimlet Anytime", desc: "No strings attached. Feel free to migrate your services anytime." },
  ],
};

export function FrontendPage() {
  return (
    <div className="bg-teal-700">
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Host Your Frontend Without Billing Surprises
            </p>
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-3xl">
        <div className="px-6 py-32 lg:px-8">
          <div className="text-base leading-7 text-neutral-900 dark:text-white space-y-8">
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl text-center">
              Add Social Sign-In To Your Project Without Next Auth PhD
            </h1>
            <p className="mt-6 text-lg leading-8 text-neutral-900 dark:text-white text-center">
              Deploy frontend with social media platform integrations for user authentication.
            </p>
            {Object.entries(sections).map(([title, items]) => (
              <div key={title} className="mt-10 max-w-2xl">
                <h1 className="text-xl font-bold tracking-tight sm:text-3xl">
                  {title}
                </h1>
                <ul>
                  {items.map((item) => (
                    <li key={item.title}>
                      <span>
                        <strong className="font-semibold">{item.title}:</strong> {item.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The most popular frontend frameworks are supported.
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none space-y-8">
            <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mt-4">
              {languages["Frontend"].map(i => {
                return (
                  <div key={i.title}
                    className="group flex flex-col justify-between overflow-hidden rounded-xl bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
                  >
                    <div className="pointer-events-none z-10 flex flex-col gap-1 p-6">
                      <img src={i.source} alt={i.title} className="h-14 w-14 origin-left text-neutral-700" />
                      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{i.title}</h3>
                      <p className="max-w-lg text-neutral-400">{i.description}</p>
                    </div>
                    <div className="pointer-events-none bottom-0 flex w-full flex-row items-center p-4 mt-auto">
                      <a
                        href={i.link}
                        className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300 pointer-events-auto underline"
                      >
                        {i.deploy}
                        <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 h-5 w-5 relative top-px -mr-1"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                      </a>
                    </div>
                    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10"></div>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>

      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Already proven its worth in emerging AI businesses
            </p>
          </div>
          <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none grid grid-cols-3">
            {
              recommendation.map((r, idx) => (
                <div key={idx} className="h-full px-2.5">
                  <div className="flex flex-col justify-between rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 px-8 py-6">
                    <div className="pb-4 font-light text-white/75">
                      {`“${r.body}”`}
                    </div>
                    <div className="flex items-center gap-4">
                      <img src={r.author.imageUrl} className="h-9 w-9 rounded-full" />
                      <div className="flex flex-col text-sm">
                        <div className="text-white">{r.author.name}</div>
                        <div className="text-white/75">{r.author.handle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="py-16 sm:py-48 mx-auto max-w-6xl">
        <CTA
          title="Deploy your frontend now, for free."
          list={["Social sign-in to your app", "Next.js, React, Remix, you name it - you can deploy it", "One-time annual payment. No hidden fees and TOS traps", "Migrate from Gimlet anytime"]}
        />
      </div>
      <div className="bg-white dark:bg-neutral-700 pt-8">
        <Footer />
      </div>
    </div>
  )
}