import {useState} from 'react'
import { faImage, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import GoogleMapReact from 'google-map-react';
import AwesomeSlider from 'react-awesome-slider';

function EquipmentCard( { equip }){
    const [showContent, setShowContent] = useState(false)
    const getImageUrl = (media) => media.fields.file.url
    const formatter = new Intl.NumberFormat('en-US', {
        // style: 'currency',
        // currency: 'USD',
        minimumFractionDigits: 2
    })

    const toggleCardContent = () => {
        setShowContent(!showContent)
    }

    return (
            <div className="column is-one-third-desktop is-half-tablet" onClick={toggleCardContent}>
                <div className="card p-3">
                <div className={!showContent ? "card-image" : "card-image card-image-active"}>
                        <figure className="image">
                            {equip.fields.media !== undefined ? <img src={getImageUrl(equip.fields.media[0])} className="image" width="200" height="auto" alt={equip.fields.title}></img> : <img src="nopreview.jpg" className="image" width="200" height="auto" alt={equip.fields.title}></img>}
                        </figure>
                        <div className="card-content is-overlay is-clipped">
                        <span className="tags has-addons is-pulled-right">
                                 {equip.fields.price == 0 ?
                                null : <span className='tag  is-medium has-addon has-background-success has-text-white'>$</span>
                                }
                                <span className={equip.fields.price == 0 ? 'tag is-medium is-warning' : 'tag is-medium'}>
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
                            <p className="is-size-6 has-text-white ">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    }
                    </span>
                    <span className="more-info">
                    <div className="column is-centered" style={{"margin":"0", "padding": "0"}}>
                        <div className="container is-fluid">
                            { !showContent ? <p className="is-size-7 has-text-centered has-text-white">MORE INFO</p> : null }
                            <span className="more-info-icon">
                                <FontAwesomeIcon className="icon is-small has-text-white" icon={showContent ? faChevronDown : faChevronUp } />
                            </span>
                            </div>
                    </div>
                    </span>
                </div>
            </div>
    )
}

export default EquipmentCard
