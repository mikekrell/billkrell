import Link from 'next/link'
import Head from 'next/head'
import Slider from 'react-slick';
import { useEffect, useRef } from 'react'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
var contentful = require('contentful');

function EquipmentPage({ equipment }) {

    const slideshowSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "ease-in",
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
        <>
            <Head>
                <title>{`${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title} | Feenaughty`}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <meta name="description" content={equipment[0].fields.description} />
                <meta property="og:site_name" content="Bill Krell / Feenaughty" key="ogsitename" />
                <meta property="og:title" content={equipment[0].fields.price == 0 ? `${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title} | Feenaughty` : `${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title} | ${formatter.format(equipment[0].fields.price)}`} key="ogtitle" />
                <meta property="og:image" content={getImageUrl(equipment[0])} />
                <meta property="og:description" content={equipment[0].fields.description} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <script type="application/ld+json">
                {`{
                    "@context" : "http://schema.org",
                    "@type" : "Product",
                    "name" : "${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title}",
                    "image" : "${getImageUrl(equipment[0])}",
                    "description" : "${equipment[0].fields.description}",
                    "brand" : {
                        "name": "Feenaughty"
                    },
                    "offers" : {
                        "@type" : "Offer",
                        "price" : "${formatter.format(equipment[0].fields.price)}"
                    }
                }`}
            </script>
        <div className="container is-fluid mt-5">
            <section className="section pb-0">
                <div className="container">
                    <nav className="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li><Link href="/"><a>Home</a></Link></li>
                            <li className="is-active"><a>{`${equipment[0].fields.year} ${equipment[0].fields.manufacture} ${equipment[0].fields.title}`}</a></li>
                        </ul>
                    </nav>
                </div>

            </section>
            <section className="section">
                <div className="container">
                    <div className="columns is-desktop is-vcentered">
                        <div className="column is-6-desktop">
                            <p className="is-size-5 image-manufacture-title"><span className="has-text-weight-bold">{equipment[0].fields.year}</span> {equipment[0].fields.manufacture}</p>
                            <h2 className="is-size-2 has-text-weight-bold">{equipment[0].fields.title}</h2>
                            <p className="subtitle mt-2">
                                {equipment[0].fields.price == 0 ?
                                        <span className="tags has-addons">
                                            <span className='tag is-medium has-addon has-background-warning'><FontAwesomeIcon className="icon is-small" icon={faPhone} /></span>
                                            <span className='tag is-medium'>
                                                Call Me
                                            </span>
                                        </span>
                                        : <span className="tags has-addons">
                                            <span className='tag is-medium has-addon has-background-success has-text-white'>$</span>
                                            <span className="tag is-medium">{formatter.format(equipment[0].fields.price)}</span>
                                        </span>}
                            </p>
                            <div className="column is-centered more-info-content-active">
                                <table className="table is-fullwidth table-trans is-size-6">
                                    <tr>
                                        <th width="10%" align="left" className="is-size-6 ">Hours</th>
                                        <th width="10%" align="left" className="is-size-6 ">Weight</th>
                                        <th width="20%" align="left" className="is-size-6 ">Price</th>
                                    </tr>
                                    <tr>
                                        <td>{equipment[0].fields.hours !== NaN ? equipment[0].fields.hours : "N/A" }</td>
                                            <td>{equipment[0].fields.weight !== NaN && equipment[0].fields.weight !== 0 ? equipment[0].fields.weight : "N/A" }</td>
                                            <td>{equipment[0].fields.price !== NaN && equipment[0].fields.price !== 0 ?  formatter.format(equipment[0].fields.price): "N/A"}</td>
                                    </tr>
                                </table>
                            </div>
                            <p className="subtitle mt-3">{equipment[0].fields.description}</p>
                            <section>
                                <div className="container">
                                    <div className="column is-size-6" style={{'textAlign':'center'}}>
                                        <strong>Rental Rates</strong>
                                    </div>
                                </div>
                            </section>
                            <table className="table is-fullwidth">
                                <tbody>
                                    <tr>
                                        <td>Weekly</td>
                                            <td className="has-text-right">{ equipment[0].fields.weeklyRate !== NaN && equipment[0].fields.weeklyRate !== 0 ? formatter.format(equipment[0].fields.weeklyRate) : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td>Monthly</td>
                                            <td className="has-text-right">{equipment[0].fields.monthlyRate !== NaN && equipment[0].fields.monthlyRate !== 0 ? formatter.format(equipment[0].fields.monthlyRate) : "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="column is-6-desktop" style={{ 'width': '325px' }}>
                                {equipment[0].fields.media ?
                                    <Slider ref={sliderRef} autoplay={false} {...slideshowSettings}>
                                        {
                                            equipment[0].fields.media.map((image, i) => (
                                                <div>
                                                    <img key={image.fields.file.url} src={image.fields.file.url} className="image" width="325" height="auto"></img>
                                                </div>
                                            ))
                                        }
                                    </Slider>
                                    : <img src="nopreview.jpg" className="image" width="325" height="auto"></img>}
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </>
    )
}

// export const getStaticPaths = async () => {

//     var client = contentful.createClient({
//         space: process.env.CONTENTFUL_SPACE,
//         accessToken: process.env.CONTENTFUL_TOKEN
//     })

//     const resp = await client.getEntries({ content_type: 'equipment' })
//     const equipment = await resp.items
//     const paths = equipment.map((equip) => {
//         return {
//             params: { slug: equip.fields.slug }
//         }
//     })
//     // We'll pre-render only these paths at build time.
//     // { fallback: false } means other routes should 404.
//     return { paths, fallback: false }
// }

export const getServerSideProps = async (ctx) => {
    const slug = ctx.params.slug;

    var client = contentful.createClient({
        space: process.env.CONTENTFUL_SPACE,
        accessToken: process.env.CONTENTFUL_TOKEN
    })

    const resp = await client.getEntries({ content_type: 'equipment' })
    const equipment = await resp.items

    return {
        props: {
            equipment: equipment.filter(item => item.fields.slug == slug)
        },
    }
}


export default EquipmentPage



