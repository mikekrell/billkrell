import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import Slider from 'react-slick';
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Subscribe from '../../components/Subscribe'
var contentful = require('contentful');

function EquipmentPage({ equipment }) {

    const slideshowSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 2000,
        autoplaySpeed: 1750,
        cssEase: "ease-in",
        pauseOnHover: true,
        swipeToSlide: true,
    };

    const sliderRef = useRef(null)

    useEffect(() => {
        console.log(equipment[0])
    }, [])

    const handleThumbnailChange = (slideIndex) => {
        sliderRef.current.slickGoTo(slideIndex, true)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    const getImageUrl = (equipment) => `${equipment.fields.media[0].fields.file.url}?w=500&fm=png`
    return (
        <div class="container is-fluid mt-5">
            <section class="section pb-0">
                <div className="container">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>
                            <li class="is-active"><a>{`${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title}`}</a></li>
                        </ul>
                    </nav>
                </div>

            </section>
            <section class="section">
                <div class="container">
                    <div class="columns is-desktop is-vcentered">
                        <div class="column is-6-desktop">
                            <p className="is-size-5 image-manufacture-title"><span className="has-text-weight-bold">{equipment[0].fields.year}</span> {equipment[0].fields.manufacture}</p>
                            <h2 class="is-size-2 has-text-weight-bold">{equipment[0].fields.title}</h2>
                            <p class="subtitle mt-2"><span className="tags has-addons">
                                <span className='tag is-medium has-addon has-background-success has-text-white'>$</span>
                                <span className="tag is-medium">{formatter.format(equipment[0].fields.price)}</span>
                            </span></p>
                            <div className="column is-centered more-info-content-active">
                                <table className="table is-fullwidth table-trans is-size-6">
                                    <tr>
                                        <th width="10%" align="left" className="is-size-6 ">Hours</th>
                                        <th width="10%" align="left" className="is-size-6 ">Weight</th>
                                        <th width="20%" align="left" className="is-size-6 ">Price</th>
                                    </tr>
                                    <tr>
                                        <td>{equipment[0].fields.hours}</td>
                                        <td>{equipment[0].fields.weight}</td>
                                        <td>{formatter.format(equipment[0].fields.price)}</td>
                                    </tr>
                                </table>
                            </div>
                            <p class="subtitle mt-3">{equipment[0].fields.description}</p>
                            <section>
                                <div className="container">
                                    <div className="column is-size-6" style={{'textAlign':'center'}}>
                                        <strong>Rental Rates</strong>
                                    </div>
                                </div>
                            </section>
                            <table class="table is-fullwidth">
                                <tbody>
                                    <tr>
                                        <td>Daily Rates</td>
                                        <td class="has-text-right">{formatter.format(equipment[0].fields.weeklyRate)}</td>
                                    </tr>
                                    <tr>
                                        <td>Weekly</td>
                                        <td class="has-text-right">{formatter.format(equipment[0].fields.weeklyRate)}</td>
                                    </tr>
                                    <tr>
                                        <td>Monthly</td>
                                        <td class="has-text-right">{formatter.format(equipment[0].fields.motnhlyRate)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="column is-6-desktop">
                            <div className="columns">
                                <div className="container">
                                    <div className="column"><img src={getImageUrl(equipment[0])} className="image pt-5" width="500" height="auto"></img></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export const getStaticPaths = async () => {

    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'equipment' })
    const equipment = await resp.items
    const paths = equipment.map((equip) => {
        return {
            params: { equipment: equip.sys.id }
        }
    })
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

export const getStaticProps = async (ctx) => {
    const id = ctx.params.equipment;

    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'equipment' })
    const equipment = await resp.items

    return {
        props: {
            equipment: equipment.filter(item => item.sys.id == id)
        },
    }
}


export default EquipmentPage



