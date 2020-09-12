import {useRef, useState} from 'react'
export default function Modal({isOpen, closeModal}) {
    const [checked, setChecked] = useState("text")
    const firstNameInput = useRef(null)
    const lastNameInput = useRef(null)
    const emailInput = useRef(null)
    const phoneInput = useRef(null)
    const submitModal = async () => {

        let response = await fetch("/api/contact", { method: "POST", body: JSON.stringify({ first: firstNameInput.current.value, last: lastNameInput.current.value, email: emailInput.current.value, phone: phoneInput.current.value, contact_type: checked })})
    
        closeModal()
    }

    const setRadio = (e) => {
        setChecked(e.target.value)
     }
     
    return (
        <div className={isOpen ? "modal is-active" : "modal"}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Let's Chat</p>
                    <button className="delete" aria-label="close" onClick={closeModal}></button>
                </header>
                <section className="modal-card-body">
                    <div className="subtitle">
                        <h2>Leave me your name and phone number, as well as your email and I will get back with you withing 15mins of your request.</h2>
                    </div>
                    <div className="field is-horizontal">
                        <div className="field-body">
                            <div className="field">
                                <div className="control has-icons-left has-icons-right">
                                    <input ref={firstNameInput} className="input is-medium" type="text" placeholder="First" />
                                    <span className="icon is-left">
                                        <i className="fa fa-user fa-sm"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <div className="control has-icons-left has-icons-right">
                                    <input ref={lastNameInput} className="input is-medium" type="text" placeholder="Last" />
                                    <span className="icon is-left">
                                        <i className="fa fa-user fa-sm"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        </div>
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                            <input ref={emailInput} className="input is-medium" type="email" placeholder="Email Address" />
                            <span className="icon is-left">
                                <i className="fa fa-envelope fa-sm"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control has-icons-left has-icons-right">
                            <input ref={phoneInput} className="input is-medium" type="tel" placeholder="Phone" />
                            <span className="icon is-left">
                                <i className="fa fa-phone fa-sm"></i>
                            </span>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <h2>Prefered Contact:</h2>
                            <div className="mt-1 ml-2 ">
                                <label className="radio mr-2">
                                    <input onChange={setRadio} checked={checked=="text" ? true : false} className="mr-2" type="radio" value="text" name="text" />
                        Text Me
                  </label>
                                <label className="radio">
                                    <input onChange={setRadio} checked={checked=="call" ? true : false} className="mr-2" type="radio" value="call" name="call" />
                          Call Me
                  </label>
                            </div>
                        </div>
                    </div>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={submitModal}>Submit</button>
                    <button className="button" onClick={closeModal}>Cancel</button>
                </footer>
            </div>
            <button className="modal-close is-large" aria-label="close"></button>
        </div>
    )
}
