import Head from 'next/head'
import { client } from '../../lib/sanity'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'

export default function Post({ post }) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content="A blog post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="py-8">
        <Link as="/" href={'/'}>
          <a className="block text-center underline">&#8592; Back</a>
        </Link>
        <h1 className="mt-10 mb-10 text-center text-3xl font-extrabold tracking-tight text-gray-900">
          {post.title}
        </h1>

        <div className="mx-auto mt-20 max-w-3xl px-10 text-center">
          <div className="mb-10 flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
            <p className="mb-6 text-sm uppercase text-gray-400">
              {new Date(post.publishedAt).toDateString().slice(4)}
            </p>
            <PortableText value={post.body} />
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const posts = await client.fetch(
    `*[_type == "post" && slug.current == $slug] {
    _id,
    title,
    publishedAt,
    body,
    'slug': slug.current,
  }`,
    { slug: params.slug }
  )

  return {
    props: { post: posts[0] },
  }
}

export async function getStaticPaths() {
  const posts = await client.fetch(`*[_type == "post"]{ 'slug': slug.current }`)
  return {
    paths:
      posts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: false,
  }
}
