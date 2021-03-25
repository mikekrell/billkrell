import {useState, useEffect, useRef} from 'react'
import moment from 'moment'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
function BlogPost ({post}) {
    const router = useRouter();
    const emailInput = useRef(null)
    const [payWall, setPayWall] = useState(false);

    useEffect(() => {
        //start for animation paywall
        if (!!router.query.rel) {
            const hasSeen = localStorage.getItem('seen_popup')
            if (hasSeen) {
                setPayWall(false)
            } else {
                setPayWall(true)
            }
        }
    }, [])

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

    const subscriptionEvent = async () => {
        localStorage.setItem('seen_popup', true)
        // Create the new request 
        var xhr = new XMLHttpRequest();
        var url = 'https://api.hsforms.com/submissions/v3/integration/submit/8535484/f82ad281-d08d-4adf-a4eb-25313ec4f71c'

        // Example request JSON:
        var data = {
            "submittedAt": Date.now(),
            "fields": [
                {
                    "name": "email",
                    "value": emailInput.current.value
                }
            ],
            "context": {
                "pageUri": "www.billkrell.com/blog",
                "pageName": "Bill Krell"
            },
            "legalConsentOptions": { // Include this object when GDPR options are enabled
                "consent": {
                    "consentToProcess": true,
                    "text": "I agree to allow Example Company to store and process my personal data.",
                    "communications": [
                        {
                            "value": true,
                            "subscriptionTypeId": 999,
                            "text": "I agree to receive marketing communications from Example Company."
                        }
                    ]
                }
            }
        }

        var final_data = JSON.stringify(data)

        xhr.open('POST', url);
        // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                setPayWall(false)
                alert("Thank you for signing up!"); // Returns a 200 response if the submission is successful.
            } else if (xhr.readyState == 4 && xhr.status == 400) {
                alert(xhr.responseText); // Returns a 400 error the submission is rejected.
            } else if (xhr.readyState == 4 && xhr.status == 403) {
                alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.
            } else if (xhr.readyState == 4 && xhr.status == 404) {
                alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found
            }
        }


        // Sends the request 

        xhr.send(final_data)

    }
    const closePaywall = () => {
        localStorage.setItem('seen_popup', true)
        setPayWall(false)
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
            {payWall ?
                <div className="newsetter-signup">
                    <div className="card">
                        <div className="card-content">
                            <section className="section has-background-dark">
                                <div className="columns">
                                    <div className="column">
                                        <div className="title has-text-centered ">
                                            <h2 className="has-text-white">Subscribe to the Newsletter!</h2>
                                            <p className="subtitle has-text-white pt-1">Stay up to date with all our inventory as we receive it.</p>
                                        </div>

                                        <div className="field is-grouped">
                                            <p className="control is-expanded">
                                                <input ref={emailInput} className="input" type="email" placeholder="Enter your email" />
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </section>
                        </div>
                        <footer className="card-footer">
                            <p onClick={closePaywall} className="card-footer-item footer-button">
                                <span>
                                    Not right now
                </span>
                            </p>
                            <p onClick={subscriptionEvent} className="card-footer-item has-background-success-dark has-text-white footer-button">
                                <span>
                                    Subscribe
                             </span>
                            </p>
                        </footer>
                    </div>
                </div> : null}
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
