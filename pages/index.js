import { useState, useEffect } from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import Head from 'next/head'
import EquipmentCard from '../components/EquipmentCard'
import useWindowSize from '../hooks/use-window-size';
import Modal from 'react-modal';
import EquipmentPage from './used/[equipment]'

Modal.setAppElement("#__next");

var contentful = require('contentful');


function Home({ equipment } ){ 
    const router = useRouter();
    const size = useWindowSize();
    const [windowSize, setWindowSize] = useState({height:0, width:0})
    const [swipeLeft, setSwipeLeft] = useState(false)
    const [modalActive, setModalActive] = useState(false)

    const handleModalOpen = () => setModalActive(true)
    const handleModalClose = () => setModalActive(false)

    useEffect(() => { 
        if (size) {
            console.log(windowSize.height, windowSize.width)
            setWindowSize({ height: size.height, width: size.width})
        }
    }, [size])


    return (
            <>
                <Head>
                    <title>Bill Krell | Feenaughty</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <meta name="description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." />

                    <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                    <meta property="og:title" content="Used Inventory - Bill Krell / Feenaughty" key="ogtitle" />
                    <meta property="og:description" content="Our used equipment available for purchase. Sign up for my weekly newsletter, and get access to all our new/used inventory on a regular basis, as well as industry info." key="ogdesc" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
            <Modal style={{
                    overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    },
                    content: {
                        position: 'absolute',
                        top: '100px',
                        left: '10%',
                        right: '10%',
                        bottom: '100px',
                        border: '1px solid #ccc',
                        background: '#fff',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '4px',
                        outline: 'none'
                    }
            }} isOpen={!!router.query.id} onRequestClose={()=>router.push('/')}>
                {!!router.query.id ? <EquipmentPage equipment={equipment.filter(item => item.sys.id == router.query.id)}></EquipmentPage> : null }
            </Modal>
                <section className="section has-background-light mt-2">
                    <div className="container">
                        <h1 className="title mt-5">Used Inventory</h1>
                        <h2 className="subtitle">
                            A complete list of what we currently have in our <strong>Inventory</strong>. If you see anything you like, please contact me.
                    </h2>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="table-container">
                            <div className="columns is-multiline">
                                {equipment.map((equip, i) => (
                                    <div className="column is-one-third-desktop is-half-tablet" >
                                        <Link href={`/?id=${equip.sys.id}`} as={`/used/${equip.sys.id}`}>
                                        <a>
                                            <EquipmentCard swipeLeft={swipeLeft} key={i} equip={equip}></EquipmentCard> 
                                        </a>
                                    </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </>
    )
}

export const getStaticProps = async () => {
        // Call an external API endpoint to get posts.
        var client = contentful.createClient({
            space: process.env.CONTENTFUL_SPACE,
            accessToken: process.env.CONTENTFUL_TOKEN
        })

        const resp = await client.getEntries({ content_type: 'equipment' })
        const equipment = await resp.items

    return {
        props: {
            equipment
        },
    }
}


export default Home
