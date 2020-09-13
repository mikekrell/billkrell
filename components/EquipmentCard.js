
function EquipmentCard( { equip }){
    const getImageUrl = (media) => media.fields.file.url
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return (
            <div class="column is-one-quarter-desktop is-half-tablet">
                <div class="card">
                    <div class="card-image">
                        <figure class="image">
                        {equip.fields.media !== undefined ? <img src={getImageUrl(equip.fields.media[0])} className="image" width="200" height="auto" alt={equip.fields.title}></img> : null}
                        </figure>
                        <div class="card-content is-overlay is-clipped">
                            <span class="tag">
                                {equip.fields.title}
                            </span>
                        <span className={equip.fields.price == 0 ? 'tag is-pulled-right has-background-warning' : 'tag is-pulled-right has-background-success has-text-white-ter' }>
                            {equip.fields.price == 0 ? `Call for Quote` : formatter.format(equip.fields.price) }
                        </span>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default EquipmentCard
