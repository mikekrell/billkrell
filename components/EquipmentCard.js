import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function EquipmentCard( { equip }){
    const getImageUrl = (media) => media.fields.file.url
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })

    return (
            <div class="column is-one-third-desktop is-half-tablet">
            <div class="card p-3">
                    <div class="card-image">
                        <figure class="image">
                        {equip.fields.media !== undefined ? <img src={getImageUrl(equip.fields.media[0])} className="image" width="200" height="auto" alt={equip.fields.title}></img> : <img src="nopreview.jpg" className="image" width="200" height="auto" alt={equip.fields.title}></img>}
                        </figure>
                        <div class="card-content is-overlay is-clipped">
                        <span className={equip.fields.price == 0 ? 'tag is-pulled-right has-background-warning is-medium' : 'tag is-pulled-right is-medium has-background-success has-text-white-ter' }>
                                {equip.fields.price == 0 ? `Call for Quote` : formatter.format(equip.fields.price) }
                            </span>
                            <span class="tags has-addons" style={{ "opacity": "0.5"}}>
                                <span class="tag" style={{ "opacity": "1" }}>{equip.fields.media !== undefined  && equip.fields.media.length > 0 ? equip.fields.media.length : '0'}</span>
                                <span class="tag" style={{ "opacity": "1" }}><FontAwesomeIcon className="icon is-small" icon={faImage} /></span>
                            </span>
                        </div>
                    </div>
                    <span className="image-title">
                    <p className="is-size-5 has-text-white image-manufacture-title"><span className="has-text-weight-bold">{equip.fields.year}</span> {equip.fields.manufacture}</p>
                        <h1 className="is-size-2 has-text-white has-text-weight-bold">{equip.fields.title}</h1>
                    </span>
                    <span className="more-info">
                        <p></p>
                    </span>
                </div>
            </div>
    )
}

export default EquipmentCard
