import {useState, useEffect} from 'react'
import Head from 'next/head'
import EquipmentRow from '../components/EquipmentRow'
import useWindowSize from '../hooks/use-window-size';
var contentful = require('contentful');


function Used( {posts, equip} ){ 
    const size = useWindowSize();
    const [windowSize, setWindowSize] = useState({height:0, width:0})

    useEffect(() => { 
        if (size) {
            setWindowSize({ height: size.height, width: size.width})
        }

        console.log(windowSize.height,windowSize.width)
    }, [size])

    const showColumns = windowSize.width >= 400
    
    return (
                    <>
                <Head>
                    <title>Used Inventory - Bill Krell / Feenaughty</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <meta name="description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." />

                    <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                    <meta property="og:title" content="Subscribe to my newsletter" key="ogtitle" />
                    <meta property="og:description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." key="ogdesc" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <section className="section has-background-light mt-2">
                    <div className="container">
                        <h1 className="title mt-5">Used Inventory</h1>
                        <h2 className="subtitle">
                            A complete list of what we currently have on our <strong>Inventory</strong>. If you see anything you like, please contact me.
                    </h2>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="table-container">
                        <table className={showColumns ? "table is-striped is-hoverable is-scrollable" : "table is-striped is-hoverable is-scrollable is-narrow is-bordered" }>
                                <thead>
                                {showColumns ?
                                    <tr>
                                        <th></th>
                                        <th>Year</th>
                                        <th>Manufacture</th>
                                        <th>Model</th>
                                        <th>Type</th>
                                        <th>Hours</th>
                                        <th>Weight(lb)</th>
                                        <th>Weekly Rental</th>
                                        <th>Monthly Rental</th>
                                        <th>Price</th>
                                    </tr>
                                    : 
                                    <tr>
                                        <th>Year</th>
                                        <th>Manufacture</th>
                                        <th>Model</th>
                                        <th>Weekly Rental</th>
                                        <th>Monthly Rental</th>
                                        <th>Price</th>
                                    </tr>
                                    }
                                </thead>
                                <tbody>
                                    {equip.map((equip, i) => (
                                        <EquipmentRow showColumns={showColumns} key={i} equip={equip}></EquipmentRow>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </>
    )
}

export const getStaticProps = async () => {
    // Call an external API endpoint to get posts.
    console.log('fetching data')
        var client = contentful.createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: process.env.CONTENTFUL_TOKEN
        })

            const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
            const posts = await res.json()

            const resp = await client.getEntries({ content_type: 'equipment' })
            const equip = await resp.items

    //const equip = await client.getEntries({ content_type: 'equipment' }).then(entry => entry.items)
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    // const posts = await res.json()
    return {
        props: {
            posts,
            equip
        },
    }
}


export default Used
