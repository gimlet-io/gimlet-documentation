export const languages = {
  'Frontend': [
    { title: "Next.js", description: "React framework for building scalable, high-performance applications.", link: "/docs/frontend/next-js-deployment-tutorial", source: "next-js.svg", deploy: "How to deploy Next.js" },
    { title: "React", description: "JavaScript library for building dynamic, interactive user interfaces.", link: "/docs/frontend/react-deployment-tutorial", source: "react-js.svg", deploy: "How to deploy React" },
    { title: "Remix", description: "A web framework for building fast, modern web applications with React.", link: "/docs/frontend/remix-deployment-tutorial", source: "remix.svg", deploy: "How to deploy Remix" },
  ],
  'Backend': [
    { title: "Laravel", description: "PHP framework for web applications, offering a clean and elegant syntax.", link: "/docs/backend/laravel-deployment-tutorial", source: "laravel.svg", deploy: "How to deploy Laravel" },
    { title: "Django", description: "Python framework that encourages rapid development and clean design.", link: "/docs/backend/django-deployment-tutorial", source: "django.svg", deploy: "How to deploy Django" },
  ],
  'AI': [
    { title: "vLLM", description: "High-performance and cost-effective Large Language Model serving solution.", link: "/docs/ai-deployments/vllm-deployment-tutorial", source: "vllm-logo-text-dark.png", deploy: "How to deploy vLLM" },
    { title: "Hugging face", description: "State-of-the-art NLP models for text analysis and generation.", link: "/docs/ai-deployments/hugging-face-model-deployment-tutorial", source: "huggingface.svg", deploy: "How to deploy Hugging Face models" },
    { title: "Dockerfile", description: "Ensuring consistency through reproducible environments.", link: "/docs/ai-deployments/dockerfile-deployment-tutorial", source: "docker.svg", deploy: "How to deploy with Dockerfiles" },
    { title: "Streamlit", description: "Library for quickly building and sharing web apps for machine learning and data science projects.", link: "/docs/ai-deployments/streamlit-deployment-tutorial", source: "streamlit.svg", deploy: "How to deploy Streamlit" },
    { title: "Jupyter Notebook", description: "Interactive computing environment for live code, equations, visualizations, and narrative text.", link: "/docs/ai-deployments/jupyter-notebook-deployment-tutorial", source: "jupyter-logo.png", deploy: "How to deploy Jupyter Notebook" },
    { title: "Flowise", description: "Open source low-code tool for developers to build customized LLM orchestration flow & AI agents.", link: "/docs/ai-deployments/flowise-deployment-tutorial", source: "flowise.png", deploy: "How to deploy Flowise" },
  ]
};

export default function Languages(props) {
  const {headline, groups} = props

  return (
    <div className="mx-auto max-w-4xl px-4 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h3 className="subheading">
          {headline}
        </h3>
      </div>
      <div className="mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none space-y-16">
        {groups.map(group => {
          const title = group
          const items = languages[group]
          return (
            <div key={title}>
              {groups.length > 1 && <h4 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">{title}</h4>}
              <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3 mt-4">
                {items.map(i => {
                  return (
                    <a
                      href={i.link}
                      key={i.title} >
                      <div key={i.title}
                        className="group flex flex-col p-6 justify-between overflow-hidden rounded-xl bg-white hover:bg-white/10 dark:bg-transparent dark:hover:bg-white/10 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] cursor-pointer"
                      >
                        <div className="pointer-events-none z-10 flex flex-col gap-1">
                          <img src={i.source} alt={i.title} className="h-12 w-12 object-scale-down origin-left text-neutral-700 bg-neutral-700 dark:bg-white/0 rounded p-1" />
                          <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{i.title}</h3>
                          {/* <p className="max-w-lg text-neutral-400">{i.description}</p> */}
                        </div>
                        <div className="pointer-events-none bottom-0 flex w-full flex-row items-center pt-4 mt-auto">
                          <span
                            // href={i.link}
                            className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition text-neutral-900 dark:text-neutral-100 pointer-events-auto underline"
                          >
                            {i.deploy}
                            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="mt-0.5 h-5 w-5 relative top-px -mr-1"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"></path></svg>
                          </span>
                        </div>
                        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.05] group-hover:dark:bg-neutral-800/10"></div>
                      </div>
                    </a>
                  )
                })}
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}
