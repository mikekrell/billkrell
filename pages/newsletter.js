import React, { useState, useRef, useEffect} from 'react';
import {useRouter} from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
export default function Newsletter({ children, pageTitle, description, ...props }) {
    const router = useRouter();
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const firstName = useRef(null)
    const lastName = useRef(null)
    const emailAddress = useRef(null)
    const phoneNumber = useRef(null)
    const companyName = useRef(null)
    
    useEffect(()=>{
        if (router.query.email) {
            emailAddress.current.value = (router.query.email)
        }
    }, [])
    const submitForm = async (event) => {
        event.preventDefault();
        fetch('/api/subscribe', { method: "POST", body: JSON.stringify({ firstName: firstName.current.value, lastName: lastName.current.value, emailAddress: emailAddress.current.value, phoneNumber: phoneNumber.current.value, companyName: companyName.current.value }) }).then(data => {
            if (data.status == 200) {
                setSuccess(true)
            }else {
                setAlert("Looks like something went wrong. Maybe you've already signed up before?")
            }
        })   
    }
    
    const setAlert = (text) => {
        Toastify({
            text: text,
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: 'center', // `left`, `center` or `right`
            className: 'notification is-danger',
            backgroundColor: "#f14668",
            stopOnFocus: true, // Prevents dismissing of toast on hover
            onClick: function () { } // Callback after click
        }).showToast();
    }

    return (
        <>
            <Head>
                    <title>Subscribe to my newsletter - Bill Krell | Feenaughty</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <meta name="description" content="Be the first to be notified about the latest used equipment available for purchase. You’ll also get access to my weekly newsletter where you’ll see what sold last week and what’s new, as well as industry info." />

                    <meta property="og:url" content="http://www.billkrell.com/subscribe_to_newsletter.html" key="ogurl" />
                    <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                    <meta property="og:title" content="Subscribe to my newsletter" key="ogtitle" />
                    <meta property="og:description" content="Be the first to be notified about the latest used equipment available for purchase. You’ll also get access to my weekly newsletter where you’ll see what sold last week and what’s new, as well as industry info." key="ogdesc" />
                    <link rel="icon" href="/favicon.ico" />
                    <script async src="https://www.googletagmanager.com/gtag/js?id=G-GHN76ZVXQF"></script>
                    <script>
                        window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments)}
                    gtag('js', new Date());

                    gtag('config', 'G-GHN76ZVXQF');
                    </script>
            </Head>
            <div className="columns">
                <div className="column bg-img">

                </div>
                <section className="column hero is-fullheight has-background-light">
                    {!success ?  <>
                    <div className="hero-head pt-5 mt-5">
                        <div className="column">
                            <h1 className="title mt-5">Join the Used Equipment Newsletter.</h1>
                            <h2 className="subtitle mt-1">All you need to do is let me know what you need.</h2>
                            <p className="pr-5">Be the first to be notified about the latest used equipment available for purchase. You’ll also get access to my weekly newsletter where you’ll see what sold last week and what’s new, as well as industry info.</p>
                        </div> 
                    </div> 
                    <div className="hero-body pt-0">
                        <form className="pt-5" onSubmit={ event=>{submitForm(event)}} >
                            <div className="field is-horizontal">
                                <div className="field-body">
                                    <div className="field">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-medium" type="text" placeholder="First" ref={firstName} />
                                            <span className="icon is-left">
                                                <i className="fa fa-user fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control has-icons-left has-icons-right">
                                            <input className="input is-medium" type="text" placeholder="Last" ref={lastName} />
                                            <span className="icon is-left">
                                                <i className="fa fa-user fa-sm"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left has-icons-right">
                                        <input className="input is-medium" type="email" placeholder="Email Address" ref={emailAddress} />
                                    <span className="icon is-left">
                                        <i className="fa fa-envelope fa-sm"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input is-medium" type="tel" placeholder="Phone" ref={phoneNumber} />
                                    <span className="icon is-left">
                                        <i className="fa fa-phone fa-sm"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left has-icons-right">
                                    <input className="input is-medium" type="tel" placeholder="Company (Optional)" ref={companyName}/>
                                    <span className="icon is-left">
                                        <i className="fa fa-building fa-sm"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="column has-text-centered">
                            <button disabled={loading} type="submit" style={{ "width": "100%" }} className="button is-warning is-large">{!loading ? `Yes, Sign Me Up!` : `Loading...`}</button>
                            </div>
                        </form>
                    </div></>
                    :<>
                    <div className="hero-head pt-5 mt-5">
                        <div className="column">
                            <h1 className="title mt-5">Thank you for joining the newsletter.</h1>
                            <h2 className="subtitle mt-1">You will be hearing from me soon!</h2>
                            <p className="pr-5">Be sure to check your inbox, and keep an eye out for the weekly email. I really apreaciate it.</p>
                        </div>
                    </div>
                    <div className="hero-body pt-0">
                        <div className="column has-text-centered">
                        <Link href="/">
                            <a><button style={{ "width": "100%" }} className="button is-warning is-large">See the inventory</button></a>
                        </Link>
                        </div>
                    </div></>
                    }
                    <div className="hero-footer">
                        <div className="column">
                            <article className="media">
                                <figure className="media-left">
                                    <p className="image is-64x64 level mt-1">
                                        <img src="https://media-exp1.licdn.com/dms/image/C5603AQH_6_OPXQjhfQ/profile-displayphoto-shrink_800_800/0?e=1604534400&v=beta&t=9dBSkH3F-sINjsxOXc5NieU4UrfYu670wpeDVrjoFwQ"/>
                                    </p>
                                </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <p>
                                                <strong>Bill Krell</strong> <small>bill.krell@feenaughty.com</small>
                                                <br/>
                                                    Outside sales New / Used / Rentals. 15+ years in the industry. Machine Operator, and enthusist.
                                                    <br/>Vancouver, Washington, United States.
                                            </p>
                                            </div>
                                        </div>
                                        <div className="media-right">

                                        </div>
                            </article>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
