import Head from 'next/head'
import { client } from '../lib/sanity'
import Link from 'next/link'

export default function Sanitytest({ posts }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>Blog</title>
        <meta name="description" content="Blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-8">
        <h1 className="mt-10 mb-10 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          Welcome to my blog
        </h1>

        <div className="mx-auto mt-20 max-w-3xl px-10 text-center">
          {posts.map((post, index) => (
            <Link key={index} as={`/posts/${post.slug}`} href="/posts/[slug]">
              <a className="mb-10 flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                <p className="mb-6 text-sm uppercase text-gray-400">
                  {new Date(post.publishedAt).toDateString().slice(4)}
                </p>
                <h3 className="text-3xl font-semibold text-gray-900">
                  {post.title}
                </h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const posts =
    await client.fetch(`*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    publishedAt,
    'slug': slug.current,
  }`)

  return {
    props: { posts },
  }
}
