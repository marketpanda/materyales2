import React from 'react';
import '../fontawesome.css'

const MODAL_STYLES = {
  borderRadius: '5px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor:'#FFF',
  padding: '50px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.7)',
  zIndex: 1000
}

const Modal = ({open, children, onClose}) => {
  if (!open) return null
  return (
    <>
      <div onClick={onClose}  style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
      
        {children}
        <button onClick={onClose} style={{position:'absolute', top:'20px', right:'20px', border: '0', background:'none', color:'gray'}}>
          <i className="fas fa-window-close"></i>
        </button>
      </div>
    </>
  )
}

export default Modal