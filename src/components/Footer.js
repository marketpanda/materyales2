import React, {useState} from 'react'
import Modal from './Modal'

const Footer = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [contactUs, setContactUs] = useState(false)

    return (
        <div>
            <div>
                <ul>
                    <li href='#' onClick={() => setIsOpen(true)}>About Us</li>
                    <li href='#' onClick={() => setContactUs(true)}>Contact Us</li> 
                    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
                        Created by Architect. In Deo Speramus!
                    </Modal>
                    <Modal open={contactUs} onClose={() => setContactUs(false)}>
                        Send us an email at: jrdollesin@gmail.com
                    </Modal>
                </ul>
            </div>
        </div>
    )
    }

export default Footer