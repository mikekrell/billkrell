import Slider from 'react-slick';
import {useEffect, useRef} from 'react'
import { CompositionPage } from 'twilio/lib/rest/video/v1/composition';

function ImageSlider({ media, slideshow }) {

    const slideshowSettings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 2500,
        autoplaySpeed: 2225,
        cssEase: "ease-in",
        pauseOnHover: true,
        fade: true
    } ;

    const sliderRef = useRef(null)

    const getImageUrl = (media) => media.fields.file.url

    useEffect(()=>{
        if (sliderRef.current) {
            if (slideshow) {
                sliderRef.current.slickPlay()
            }else {
                sliderRef.current.slickPause()
            }
            
        }
    }, [slideshow])

    return (
        <>
        <figure className="image">
            {media !== undefined ?
                    <Slider ref={sliderRef} autoplay={slideshow} {...slideshowSettings}>
                    {
                        media.map((image) => (
                            <div>
                                <img key="image.fields.file.url" src={image.fields.file.url} className="image" width="200" height="auto"></img>
                            </div>
                        ))
                    }
                    </Slider>
                : <img src="nopreview.jpg" className="image" width="200" height="auto"yarn></img>}
        </figure>
        </>
    )
}

export default ImageSlider;
