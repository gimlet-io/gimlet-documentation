import { Footer } from './home/Footer'
import { CTA } from './CallToAction'
import Testimonials from './Testimonial'
import Languages from './Languages'
import How from './How'

export function AIPage() {
  return (
    <div>
      <div className="py-16 sm:py-64 mx-auto max-w-6xl">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto lg:text-center">
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-center sm:text-4xl">
            Introduce Kubernetes to Your AI Project
            </h1>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl p-2">
        <div className='mx-auto sm:flex sm:space-x-8 space-y-8 sm:space-y-0 w-fit'>
          <iframe width="560" height="315" className='h-44 w-80 sm:w-[560px] sm:h-[315px]' src="https://www.youtube-nocookie.com/embed/pP32Ldaj-Kw?si=SWOGS0lHwWv9cB1J" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe width="560" height="315" className='h-44 w-80 sm:w-[560px] sm:h-[315px]' src="https://www.youtube-nocookie.com/embed/JCtnxbEpTGc?si=A6UsokbonxPO48Oq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>
      <div className="py-16 sm:py-32 p-4">
        <How 
          headline="Use Remote GPUs"
          features = {[
            {
              name: 'Remote NVIDIA GPU Containers',
              description: 'Use remote GPU resources from your laptop. Read on our blog.',
              image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              href: "/blog/how-to-use-nvidia-gpu-with-kubernetes"
            },
            {
              name: 'File syncing',
              description: 'Keep code and data consistent with your laptop with file syncing utilities. Read on our blog.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
              href: "/blog/file-syncing-remote-kubernetes-clusters"
            },
            {
              name: 'Any cloud supported',
              description: 'Wherever Kubernetes is available.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
          ]}
        />
      </div>
      <div className="py-16 p-4">
        <How 
          headline="Put Your Models To Production"
          features = {[
            {
              name: 'Scale Your Training Infrastructure',
              description: "Kubernetes automatically scales to match your models' needs.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'Any cloud supported',
              description: 'Wherever Kubernetes is available.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'Compatible With Your Company',
              description: 'Built on Gitops and Kubernetes. Uses all the open-source tools that your colleagues are using.',
              image: <svg className="h-5 w-5 fill-white/10 text-white" width="24" height="24" strokeWidth="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>,
            },
            {
              name: 'Grafana & Prometheus Compatibility',
              description: "Track and visualize memory and GPU use of your deployed models.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'Fine-Tune Your Infrastructure',
              description: 'Identify and address performance bottlenecks based on monitoring data.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
          ]}
        />
      </div>
      <div className="py-16 p-4">
        <How 
          headline="Model Version Management"
          features = {[
            {
              name: 'Centralized Version Control',
              description: "Track, preview, and deploy your model versions with ease.",
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
            {
              name: 'Advanced Deployment Capabilities',
              description: 'Rollbacks and automated deployments to even hundreds of models.',
              image: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 fill-white/10 text-white"><path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" /></svg>,
            },
          ]}
        />
      </div>
      <div className="py-16 sm:py-32 p-4">
        <Languages 
          headline="Experiment with the most popular AI frameworks and technologies."
          groups={["AI"]}
        />
      </div>
      <div className="py-16 sm:py-32 px-4 sm:px-0 hidden sm:block">
        <div className="mx-auto max-w-4xl">
          <h3 id="testimonials" className="subheading">
          Already proven its worth in emerging AI businesses
          </h3>
        </div>
        <div className="pt-8 sm:pt-16 lg:pt-24">
          <Testimonials />
        </div>
      </div>
      <div className="py-16 sm:py-32 sm:pb-56 p-4">
        <CTA
          title="Try with your model now, for free."
          list={["Hugging Face, Streamlit, and other technologies are supported", "Lowered Kubernetes entry-point", "Migrate from Gimlet anytime"]}
        />
      </div>
      <Footer />
    </div>
  )
}
