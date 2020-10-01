import {useEffect, useRef, useState} from 'react'
import Link from 'next/link'

function Subscribe () {
    const [emailAddress, setEmailAddress] = useState('')

    const subscriptionEvent = async () => {
        fetch('/api/subscribe', { method: "POST", body: JSON.stringify({ email: emailInput.current.value })} ).then(data=>{ 
            console.log(data)
         })
    }

    const handleEmailChange = (e) =>{
        setEmailAddress(e.target.value)
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
                    <div className="field is-grouped">
                        <p className="control is-expanded">
                            <input value={emailAddress} onChange={handleEmailChange} className="input" type="email" placeholder="Enter your email" />
                        </p>
                        <p className="control">
                            <Link href={`/newsletter?email=${emailAddress}`}>
                                <a className="button is-warning">
                                    Subscribe
                                </a>
                            </Link>
                        </p>
                    </div>
                </div>
                <div className="column is-one-quarter"></div>
            </div>
        </section>
    )
}

export default Subscribe
