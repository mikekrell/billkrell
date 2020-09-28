import { useRouter } from 'next/router'
import useSWR from 'swr'
import Slider from 'react-slick';
import { useEffect, useRef } from 'react'

function ModalEquipmentPage({ equipment }) {

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
            <section className="section">

                        <div className="column has-background-light">
                            <p className="is-size-5 image-manufacture-title"><span className="has-text-weight-bold">{equipment[0].fields.year}</span> {equipment[0].fields.manufacture}</p>
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
            </section>
        </>
    )
}

export default ModalEquipmentPage



