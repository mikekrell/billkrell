import Slider from 'react-slick';
import {useEffect, useRef} from 'react'
import ContentfulImage from '@moxy/react-contentful-image';

function ImageSlider({ media, slideshow, swipeLeft, slideIndex, equip }) {

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

    const getImageUrl = (media) => `${media.fields.file.url}?w=400&fm=png`

    useEffect(() => {
        if (media.fields) {
            console.log(equip)
        }
    }, [])

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
            {media || media.fields !== undefined ?
                <Slider ref={sliderRef} autoplay={slideshow} {...slideshowSettings}>
                {
                    media.map((image, i) => (
                        <div>
                            <ContentfulImage key={image.fields.file.url} image={getImageUrl(image)} className="image" format="jpeg" width="200" height="auto" resize={{width: 200}}></ContentfulImage>
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
