import {useState, useRef} from 'react'
import { faImage, faChevronDown, faChevronUp, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapReact from 'google-map-react';
import AwesomeSlider from 'react-awesome-slider';
import ImageSlider from './ImageSlider';

function EquipmentCard({ equip }){
    const [showContent, setShowContent] = useState(false)
    const [slideshow, setSlideshow] = useState(false)

    const formatter = new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'USD',
    })

    const toggleCardContent = () => {
        setShowContent(!showContent)
        //setSlideShow(!slideShow)
    }

    const onMouseEnterEvent = (event) => {
        setSlideshow(true)
        //console.log('in')
    }

    const onMouseOutEvent = () => {
        setSlideshow(false)
        //console.log('out')
    }

    return (

            <div className="card p-3"  onMouseEnter={onMouseEnterEvent} onMouseOut={onMouseOutEvent}>
                <div className={!showContent ? "card-image" : "card-image card-image-active"}>
                <ImageSlider showContent={showContent} slideshow={slideshow} media={equip.fields.media}></ImageSlider>
                        <div className="card-content is-overlay is-clipped">
                        <span className="tags has-addons is-pulled-right">
                                 {equip.fields.price == 0 ?
                                <span className='tag  is-medium has-addon has-background-warning '><FontAwesomeIcon className="icon is-small" icon={faPhone}/></span> : <span className='tag  is-medium has-addon has-background-success has-text-white'>$</span>
                                }
                                <span className={equip.fields.price == 0 ? 'tag is-medium' : 'tag is-medium'}>
                                    {equip.fields.price == 0 ? `Call for Quote` : formatter.format(equip.fields.price)}
                                </span>
                        </span>
                        <span className="tags has-addons is-pulled-left" style={{ "opacity": "0.8", "marginRight": "10px"}}>
                                <span className="tag" style={{ "opacity": "1" }}>{equip.fields.media !== undefined  && equip.fields.media.length > 0 ? equip.fields.media.length : '0'}</span>
                                <span className="tag" style={{ "opacity": "1" }}><FontAwesomeIcon className="icon is-small" icon={faImage} /></span>
                            </span>
                        {equip.fields.type !== '' ? 
                            <span className="tags has-addons" style={{ "opacity": "0.8", "marginRight": "10px" }}>
                                <span className={`tag ${equip.fields.type.toLowerCase()}`}>{equip.fields.type}</span>
                            </span> 
                            : null
                        }
                        </div>
                    </div>
                    <span className="image-title">
                        <p className="is-size-5 has-text-white image-manufacture-title"><span className="has-text-weight-bold">{equip.fields.year}</span> {equip.fields.manufacture}</p>
                        <h1 className="is-size-2 has-text-white has-text-weight-bold">{equip.fields.title}</h1>
                    {!showContent ? null :
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
                        <div className="container is-fluid" onClick={toggleCardContent}>
                            { !showContent ? <p className="is-size-7 has-text-centered has-text-white">MORE INFO</p> : null }
                            <span className="more-info-icon">
                                <FontAwesomeIcon className="icon is-small has-text-white" icon={showContent ? faChevronDown : faChevronUp } />
                            </span>
                            </div>
                    </div>
                    </span>
                </div>
    )
}

export default EquipmentCard
