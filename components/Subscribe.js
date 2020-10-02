import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'
import { Router } from 'next/router'
import {useRouter} from 'next/router'

function Subscribe () {
    const router = useRouter();
    const emailAddress = useRef(null)

    const subscriptionEvent = async () => {
        fetch('/api/subscribe', { method: "POST", body: JSON.stringify({ email: emailInput.current.value })} ).then(data=>{ 
            console.log(data)
         })
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if (emailAddress.current.value !== ''){
            router.push(`/newsletter?email=${emailAddress.current.value}`)
        }
    }

    return (
        <section className="section has-background-dark">
            <div className="columns">
                <div className="column is-one-quarter"></div>
                <div className="column">
                    <div className="title has-text-centered ">
                        <h2 className="has-text-white">Subscribe to the Newsletter!</h2>
                        <p className="subtitle has-text-white pt-1">Stay up to date with all our inventory as we receive it.</p>
                    </div>
                    <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input ref={emailAddress} className="input" type="email" placeholder="Enter your email" />
                        </p>
                        <p className="control">
                                <Link href={`/newsletter?email=${emailAddress.current?.value}`}>
                                <a className="button is-warning">
                                    Join Now
                                </a>
                            </Link>
                        </p>
                    </div>
                    </form>
                </div>
                <div className="column is-one-quarter"></div>
            </div>
        </section>
    )
}

export default Subscribe
