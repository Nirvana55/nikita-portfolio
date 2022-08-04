import Link from '@/components/Link'
import Image from 'next/image'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import Card from '@/components/Card'
import { renderCanvas } from '../components/renderCanvas'
import { ScrollContext } from '../components/scrollObserver'
import { useRef, useContext, useEffect } from 'react'

const MAX_DISPLAY = 1

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
        <div className="flex justify-center">
          {/* <Image
            className="rounded-3xl"
            src={HomeImg}
            alt="Picture of the author"
            width={250}
            height={300}
          /> */}
        </div>
        <div className="height-canvas not-sr-only relative z-10 flex items-center">
          <div
            ref={ref}
            className="mx-auto mt-[-120px] flex justify-center md:text-4xl"
            style={{
              transform: `translateY(${progress * 20}vh)`,
            }}
          >
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="relative pb-12 pt-2 text-center sm:pb-14 sm:pt-3">
                <h1 className="py-3 text-4xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 xl:text-6xl">
                  Hi, <span className="animate-fade-text">I'm</span> &nbsp;
                  <span>Nikita</span> <span className="animate-fade-text">Lama</span>
                </h1>
                <p className="px-2 text-xl font-light leading-6 text-gray-500 dark:text-gray-400 sm:px-6 xl:px-0">
                  Full Stack Developer.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
              Recent Posts
            </h1>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={date}>{formatDate(date)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
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
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            Read more &rarr;
                          </Link>
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
