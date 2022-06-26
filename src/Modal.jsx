import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ showPopUp, onBtnsClick, children, onAcceptRequest }) => {
    if(!showPopUp) return null;
    const acceptRequest = () => {
        onBtnsClick()
        setTimeout(() => onAcceptRequest(), 300)
        console.log(`deleted`)
    }
    return ReactDOM.createPortal (
        <>
        <div className='fixed inset-0 bg-[#000000ab] z-40'></div>
        <div className='fixed p-12 text-black z-50'
        style={{transform: 'translate(-50%, -50%)', top: '50%', left: '50%', backgroundColor: 'white', width: '50%'}}
        >
            <p>The task will be {children}</p>
            <div 
            className='btns flex items-center justify-end gap-4 mt-10'
            >
                <button className='px-4 py-2 text-center bg-[#d1d1d1] hover:bg-[#bebebe] cursor-pointer' onClick={onBtnsClick}>Cancel</button>
                <button className='px-4 py-2 text-center bg-[#d1d1d1] hover:bg-red-500 cursor-pointer' 
                onClick={acceptRequest}
                >OK</button>
            </div>
        </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal