import moment from 'moment'
import Head from 'next/head'
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
function BlogPost ({post}) {
    const setDocToHTMLString = (htmlContent) => {
        const options = {
            renderNode: {
                [BLOCKS.PARAGRAPH]: (node, text) => {
                    return `<p class="px-4 mt-4 mb-4 mr-3 ml-3">${node.content[0].value}</p>`
                }
            }
        }
        return `<div style="margin-top:40px"> ${documentToHtmlString(htmlContent, options)} </div>`
    }
    const getImageUrl = (post) => {
        return `${post.fields.pictures.fields.file.url}?w=500&fm=png`
    }
    
    return (
        <>
        <Head>
            <title>{`${post[0].fields.title} | Bill Krell's Blog`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={post[0].fields.blogContent.content[0].value} />
                <meta prefix="og: http://ogp.me/ns#" property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                <meta prefix="og: http://ogp.me/ns#" property="og:title" content={post[0].fields.title} key="ogtitle" />
                <meta prefix="og: http://ogp.me/ns#" property="og:description" content={post[0].fields.blogContent.content[0].value} />
                <meta prefix="og: http://ogp.me/ns#" property="og:image" content={getImageUrl(post[0])} />
                <meta prefix="og: http://ogp.me/ns#" property='og:type' content='article' />
                <meta name="author" content="Bill Krell"></meta>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
        <section className="section has-background-light">
            <div style={{display:"flex", flexDirection: 'column', alignItems: 'center'}} className="container flex justify-center items-center">
                <h1 className="title mt-5">{post[0].fields.title}</h1>
                <span className="is-flex -mt-2" style={{alignItems:'center'}}>
                    <figure className="image is-32x32 noheight">
                        <img className="is-rounded" src="/billkrell_headshot.jpeg" />
                    </figure>
                <p className="ml-2">Bill Krell</p>
                <p className="ml-2 is-size-7"> - {moment(post[0].sys.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                </span>
            </div>
        </section>
        <section>
            <div className="container mt-12 bg-red-400">
                    <div dangerouslySetInnerHTML={{ __html: setDocToHTMLString(post[0].fields.blogContent) }}></div>
            </div>
        </section>
        </div>
        </>
    )
}

var contentful = require('contentful');

export const getStaticPaths = async () => {

    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'blogPost' })
    const blogPosts = await resp.items
    const paths = blogPosts.map((post) => {
        return {
            params: { slug: post.fields.slug }
        }
    })
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
    const slug = ctx.params.slug;

    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'blogPost' })
    const blogPosts = await resp.items

    return {
        props: {
            post: blogPosts.filter(item => item.fields.slug == slug)
        },
    }
}


export default BlogPost
