import Link from '@/components/Link'
import Image from 'next/image'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { renderCanvas } from '../components/renderCanvas'
import { ScrollContext } from '../components/scrollObserver'
import { useRef, useContext, useEffect } from 'react'
import { RoughNotation } from 'react-rough-notation'

const MAX_DISPLAY = 3

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }) {
  const ref = useRef(null)
  const { scrollY } = useContext(ScrollContext)

  let progress = 0

  const { current: elContainer } = ref

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight)
  }

  useEffect(() => {
    renderCanvas()
  }, [])
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div>
        <div className="height-canvas not-sr-only relative z-10 grid grid-cols-1 space-y-10 py-4 sm:space-y-5 sm:py-10 xl:grid-cols-5">
          <div
            ref={ref}
            className="col-span-3 mx-auto mt-[-120px] md:text-4xl"
            style={{
              transform: `translateY(${progress * 20}vh)`,
            }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="relative pb-12 pt-2  sm:pb-14 sm:pt-3">
                <h1 className="py-3 text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 xl:text-6xl">
                  Hey, <span className="animate-fade-text">I'm</span> &nbsp;
                  <span className="text-red-500">Nikita</span>{' '}
                  <span className="waving-hand text-5xl">👋🏻</span>
                </h1>
                <p className="mt-1 text-black dark:text-white sm:pr-6 sm:text-lg sm:leading-8">
                  I am a Full Stack developer with expertise designing websites and mobile apps in
                  the business. I specialize in &nbsp;
                  <RoughNotation
                    animate="true"
                    animationDelay={1000}
                    animationDuration={1000}
                    color="#EF4444"
                    show={true}
                    className="dark:text-slate-200"
                    type="box"
                  >
                    Java
                  </RoughNotation>{' '}
                  and have{' '}
                  <RoughNotation
                    animate="true"
                    animationDelay={1000}
                    animationDuration={1000}
                    color="#EF4444"
                    show={true}
                    className="dark:text-slate-200"
                    type="box"
                  >
                    two years of professional
                  </RoughNotation>{' '}
                  expertise. <br />
                  <br />
                  In addition, I work on{' '}
                  <RoughNotation
                    animate="true"
                    animationDelay={1000}
                    animationDuration={1000}
                    color="#EF4444"
                    show={true}
                    className="dark:text-slate-200"
                    type="box"
                  >
                    Javascript frameworks{' '}
                  </RoughNotation>{' '}
                  such as React, Node, and J-query.{' '}
                </p>
                <p className="mt-6 leading-7 text-gray-500 underline underline-offset-4 sm:pr-6 sm:text-lg">
                  <Link
                    href="/about"
                    className="hover:cursor-pointer hover:text-primary-500 dark:text-gray-500 hover:dark:text-primary-500"
                  >
                    <a>Read the rest of my bio &rarr;</a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              Recent Posts
            </h1>
          </div>
          <ul className="gap-5 xl:grid xl:grid-cols-3">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-10">
                  <article>
                    <div className="group relative">
                      <div className="group:hover:opacity-100 absolute inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 opacity-75 blur-sm transition duration-200"></div>
                      <div className="relative rounded-md bg-white px-5 py-5 dark:bg-black">
                        <div className="space-y-5">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${slug}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {title}
                                </Link>
                              </h2>
                              <div className="flex flex-wrap">
                                {tags.map((tag) => (
                                  <Tag key={tag} text={tag} />
                                ))}
                              </div>
                            </div>
                            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                              {summary}
                            </div>
                          </div>
                          <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                              <time dateTime={date}>{formatDate(date)}</time>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {posts.length > MAX_DISPLAY && (
          <div className="flex justify-end text-base font-medium leading-6">
            <Link
              href="/blog"
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="all posts"
            >
              All Posts &rarr;
            </Link>
          </div>
        )}
        <canvas className="bg-skin-base pointer-events-none absolute inset-0" id="canvas"></canvas>
      </div>
    </>
  )
}
