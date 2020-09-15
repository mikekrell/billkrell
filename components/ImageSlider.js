import Slider from 'react-slick';
import {useEffect, useRef} from 'react'

function ImageSlider({ media, slideshow, swipeLeft, slideIndex }) {

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

    useEffect(()=>{
        if (swipeLeft) {
            console.log('left', swipeLeft)
            //sliderRef.current.slickNext();
        }
    }, [swipeLeft])

    useEffect(()=>{
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(slideIndex, true)
        }

    }, [slideIndex])


    return (
        <>
        <figure className="image">
            {media !== undefined ?
                    <Slider ref={sliderRef} autoplay={slideshow} {...slideshowSettings}>
                    {
                        media.map((image, i) => (
                            <div>
                                <img key={image.fields.file.url} src={image.fields.file.url} className="image" width="200" height="auto"></img>
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
