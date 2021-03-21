import Link from 'next/link'
import {useState} from 'react'
import moment from 'moment'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { faRProject } from '@fortawesome/free-brands-svg-icons';

var contentful = require('contentful');

function Blog({blogPosts}) {

    return (
        <div>
        <section className="section has-background-light mt-2">
            <div className="container">
                <h1 className="title mt-5">
                    The Blog
                </h1>
                <h2 className="subtitle">
                    A list of my content and articles.
                </h2>
            </div>
        </section>
        <section className="section">
            <div className="container">
                {blogPosts.map(post=>(
                <div>
                <Link href={`/blog/${post.fields.slug}`} as={`/blog/${post.fields.slug}`}><a className="title mt-5 mb-5 has-text-success-dark">{post.fields.title}</a></Link>
                <div style={{width: '100%', height: '25px', display: 'flex', alignItems: "center"}} className="mt-3">
                <span>
                    <figure className="image is-32x32 noheight">
                        <img className="is-rounded" src="/billkrell_headshot.jpeg" />
                    </figure>
                </span>
                <p className="ml-2">Bill Krell</p>
                <p className="ml-2 is-size-7"> - {moment(post.sys.createdAt).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
                <div className="mt-5" style={{flex: "1", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}} dangerouslySetInnerHTML={{__html: documentToHtmlString(post.fields.blogContent)}}></div>
                <Link href={`/blog/${post.fields.slug}`} as={`/blog/${post.fields.slug}`}><button className="mt-5 button has-background-success-dark has-text-white">More Info</button></Link>
                <div style={{width: "100%", height:'2px', backgroundColor: "grey", opacity: '50%', marginTop: '50px'}}></div>
                </div>
            ))}
                    
            </div>
        </section>
        </div>
    )
}

export const getServerSideProps = async () => {
    // Call an external API endpoint to get posts.
    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'blogPost' })
    const blogPosts = await resp.items

    return {
        props: {
            blogPosts
        },
    }
}

export default Blog
