import moment from 'moment'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
function BlogPost ({post}) {
    return (
        <div>
        <section className="section has-background-light">
            <div className="container">
                <h1 className="title mt-5">{post[0].fields.title}</h1>
                <span className="is-flex" style={{alignItems:'center'}}>
                    <figure className="image is-32x32 noheight">
                        <img className="is-rounded" src="/billkrell_headshot.jpeg" />
                    </figure>
                <p className="ml-2">Bill Krell</p>
                <p className="ml-2 is-size-7"> - {moment(post[0].sys.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                </span>
            </div>
        </section>
        <section>
            <div className="container">
                <div className="mt-5" dangerouslySetInnerHTML={{ __html: documentToHtmlString(post[0].fields.blogContent) }}></div>
            </div>
        </section>
        </div>
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
