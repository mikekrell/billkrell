import {useState, useRef} from 'react'
import { faImage, faChevronDown, faChevronUp, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageSlider from './ImageSlider';

function EquipmentCard({ equip, swipeLeft }){
    const [showContent, setShowContent] = useState(false)
    const [slideshow, setSlideshow] = useState(false)
    const [showThumbs, setShowThumbs] = useState(false)
    const [slideIndex, setSlideIndex] = useState(0)

    const formatter = new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'USD',
    })

    const toggleCardContent = () => {
        setShowContent(!showContent)
        //setSlideShow(!slideShow)
    }

    const toggleThumbnails = () => {
        setShowThumbs(!showThumbs)
    }

    const onMouseEnterEvent = (event) => {
        setSlideshow(true)
        //console.log('in')
    }

    const onMouseOutEvent = () => {
        setSlideshow(false)
        //console.log('out')
    }

    const handleThumbnailChange = i => {
        setSlideIndex(i)
    }

    return (

            <div className="card p-3"  onMouseEnter={onMouseEnterEvent} onMouseOut={onMouseOutEvent}>
                    <span className="image-title">
                        <p className="is-size-5 has-text-white image-manufacture-title"><span className="has-text-weight-bold">{equip.fields.year}</span> {equip.fields.manufacture}</p>
                        <h1 className="is-size-2 has-text-white has-text-weight-bold">{equip.fields.title}</h1>
                    {showContent ? null :
                        <div className="column is-centered more-info-content-active">
                            <table className="table has-text-white is-fullwidth table-trans is-size-6">
                                <tr>
                                    <th className="is-size-6 has-text-white">Hours</th>
                                    <th className="is-size-6 has-text-white">Weight</th>
                                    <th className="is-size-6 has-text-white">Weekly</th>
                                    <th className="is-size-6 has-text-white">Monthly</th>
                                </tr>
                                <tr>
                                    <td>{equip.fields.hours}</td>
                                    <td>{equip.fields.weight}</td>
                                    <td>{formatter.format(equip.fields.weeklyRate)}</td>
                                    <td>{formatter.format(equip.fields.monthlyRate)}</td>
                                </tr>
                            </table>
                            <p className="is-size-6 has-text-white ">{equip.fields.description}</p>
                        </div>
                    }
                    </span>
                    <span className="more-info">
                    <div className="column is-centered" style={{"margin":"0", "padding": "0"}}>
                        <div className="container is-fluid">
                            { showContent ? <p className="is-size-7 has-text-centered has-text-white">MORE INFO</p> : null }
                            <span className="more-info-icon">
                                <FontAwesomeIcon className="icon is-small has-text-white" icon={showContent ? faChevronDown : faChevronUp } />
                            </span>
                            </div>
                    </div>
                    </span>
                <div className={showContent ? "card-image" : "card-image card-image-active"}>
                    <ImageSlider slideIndex={slideIndex} swipeLeft={swipeLeft} showContent={showContent} slideshow={false} media={equip.fields.media} equip={equip}></ImageSlider>
                    <div className="card-content is-overlay is-clipped">
                    {equip.fields.price == 0 ?
                        <a href="tel:+15039563956">
                        <span className="tags has-addons is-pulled-right">
                            <span className='tag is-medium has-addon has-background-warning'><FontAwesomeIcon className="icon is-small" icon={faPhone} /></span>
                            <span className='tag is-medium'>
                                    Call Me
                            </span>
                        </span></a> : <span className="tags has-addons is-pulled-right">
                            <span className='tag is-medium has-addon has-background-success has-text-white'>$</span>
                            <span className="tag is-medium">{formatter.format(equip.fields.price)}</span>
                            </span>
                        }
                        <span className="tags has-addons is-pulled-left" style={{ "marginRight": "10px" }} onClick={toggleThumbnails}>
                            <span className="tag">{equip.fields.media !== undefined && equip.fields.media.length > 0 ? equip.fields.media.length : '0'}</span>
                            <span className="tag"><FontAwesomeIcon className="icon is-small" icon={faImage} /></span>
                        </span>
                        {equip.fields.type !== '' ?
                            <span className="tags has-addons" style={{ "marginRight": "10px" }}>
                                <span className={`tag`}>{equip.fields.type}</span>
                            </span>
                            : null
                        }
                    </div>
                </div>
                { showThumbs ? 
                    <div className="column is-fullwidth thumbnail-container">
                        <div className="columns is-multiline is-mobile">
                            {
                            equip.fields.media.map( function (image, i){
                                return (
                                    <div className="column is-one-quarter-desktop is-one-quarter-mobile is-one-quarter-tablet p-3">
                                        <img onClick={() => handleThumbnailChange(i)} key={image.fields.file.url} src={image.fields.file.url} className="image" width="64" height="64"></img>
                                    </div>
                                )
                            }) }
                        </div>
                    </div> : null
                }

                </div>
    )
}

export default EquipmentCard
