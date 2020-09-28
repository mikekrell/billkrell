import { useRouter } from 'next/router'
import Head from 'next/head'
import useSWR from 'swr'
import Slider from 'react-slick';
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

    const getImageUrl = (equipment) => `${equipment.fields.media[0].fields.file.url}?w=400&fm=png`
    return (
        <>
        <Head>
            <title>{`${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title} | Feenaughty`}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="utf-8" />
            <meta name="description" content={equipment[0].fields.description} />
            <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                <meta property="og:title" content={`${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title} | ${formatter.format(equipment[0].fields.price)}`} key="ogtitle" />
                <meta property="og:image" content={getImageUrl(equipment[0])} />
            <meta property="og:description" content={equipment[0].fields.description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="section mt-2">
            <div className="container">
                <div className="columns">
                    <div className="column is-one-third">
                        <Slider ref={sliderRef} className="pt-3 pl-3 pr-3">
                            {
                                equipment[0].fields.media.map((image, i) => (
                                    <div>
                                        <img key={image.fields.file.url} src={image.fields.file.url} className="image" width="400" height="auto"></img>
                                    </div>
                                ))
                            }
                        </Slider>
                            <div className="columns pl-5 pr-5 is-multiline is-mobile">
                                    {
                                        equipment[0].fields.media.map(function (image, i) {
                                            return (
                                                <div className="column is-one-quarter-desktop is-one-quarter-mobile is-one-quarter-tablet p-3">
                                                    <img onClick={() => handleThumbnailChange(i)} key={image.fields.file.url} src={image.fields.file.url} className="image" width="64" height="64"></img>
                                                </div>
                                            )
                                        })}
                                </div>
                    </div>
                        <div className="column pt-5 pl-5 has-background-light">
                            <p className="is-size-5image-manufacture-title"><span className="has-text-weight-bold">{equipment[0].fields.year}</span> {equipment[0].fields.manufacture}</p>
                            <h1 className="is-size-2 has-text-weight-bold">{equipment[0].fields.title}</h1>

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
                                <table className="table is-fullwidth table-trans is-size-6">
                                    <tr>
                                        <th width="10%" align="left" className="is-size-6 ">Daily</th>
                                        <th width="10%" align="left" className="is-size-6 ">Weekly</th>
                                        <th width="20%" align="left" className="is-size-6 ">Monthly</th>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>{formatter.format(equipment[0].fields.weeklyRate)}</td>
                                        <td>{formatter.format(equipment[0].fields.monthlyRate)}</td>
                                    </tr>
                                </table>
                                <p className="is-size-6 ">{equipment[0].fields.description}</p>
                            </div>

                        </div>
                    </div>

            </div>
        </section>
        </>
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



