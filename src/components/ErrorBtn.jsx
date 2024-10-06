import UseContext from '../Context'
import { useContext } from 'react'
import Error from '../assets/error.png'
import '../css/ErrorBtn.css'

function ErrorBtn({themeDragBar, stateVal, text, setStateVal, runOpenFuction}) {

    const { handleSetFocusItemTrue } = useContext(UseContext);

  return (
    <div className="error_container"
    onClick={(e) => {
        e.stopPropagation();
        handleSetFocusItemTrue('');
      }}
    >
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
