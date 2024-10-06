import React from 'react'
import Error from '../assets/error.png'
import '../css/ErrorBtn.css'

function ErrorBtn({themeDragBar, stateVal, text, setStateVal, runOpenFuction}) {

  return (
    <div className="error_container">
        <div className="bar_tap"
            style={{ background: themeDragBar }}
        >
            <p>{stateVal}</p>
            <div 
                onClick={() => {
                    setStateVal(false)
                    runOpenFuction()
                }}
            >
                <p>x</p>
            </div>
        </div>
        <div className="error_message_container">
            <img src={Error} alt="error" />
            <p>{text}</p>
        </div>
        <div className="error_ok_btn"
            onClick={() => {
                setStateVal(false)
                runOpenFuction()
            }}
            
        >
            <p>OK</p>
        </div>
    </div>
  )
}

export default ErrorBtn
