
function EquipmentCard( { equip }){
    const getImageUrl = (media) => media.fields.file.url
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    })
    return (
        <div className="card">
            <header className="card-header has-background-warning">
                <p className="card-header-title">
                    {equip.fields.title}
                                    </p>
                <div className="card-header-icon">
                    <span className="tag is-light ml-5">{equip.fields.type}</span>
                </div>
            </header>
            <div className="card-content">
                <div className="content">
                    
                </div>
            </div>
            <div className="card-footer has-background-light">
                <div className="card-footer-item"><p><strong>Hours:</strong> {equip.fields.hours}</p></div>
                <div className="card-footer-item"><p><strong>Weight(lbs): </strong> {equip.fields.weight}</p></div>
                <div className="card-footer-item has-background-success"><p><strong>{formatter.format(equip.fields.price)}</strong></p></div>
            </div>
        </div>
    )
}

export default EquipmentCard
