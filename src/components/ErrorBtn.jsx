import UseContext from '../Context'
import { useContext, useState, useEffect } from 'react'
import Error from '../assets/error.png'
import '../css/ErrorBtn.css'

function ErrorBtn({themeDragBar, stateVal, text, setStateVal, runOpenFuction}) {
    const [YesNo, setYesNo] = useState(false)
    const [Content, setContent] = useState('')

    const { 
        handleSetFocusItemTrue, setRunCatVideo 

    } = useContext(UseContext);
    const textResetStroage = "Warning: Resetting local storage will erase all your info. Are you sure you want to continue?"
    const textGithub = "Warning: You will be redirecting to another site, are you sure you want to continue?"
    const textCat = "Warning: Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai Oiiai !"


    useEffect(() => {
        handleBtn(stateVal)
    }, [stateVal]); 

    function handleBtn(name) {
        switch (name.toLowerCase()) {
            case "resetstorage":
                setYesNo(true);
                setContent(textResetStroage);
                break;

            case "github":
                setYesNo(true);
                setContent(textGithub);
                break;

            case "webresume":
                setYesNo(true);
                setContent(textGithub);
                break;

            case "cat":
                setYesNo(true);
                setContent(textCat);
                break;

            default:
                setYesNo(false);
                setContent(text);
                break;
        }
    }
    

    function handleFunction(name) {
        switch (name.toLowerCase()) {
            case "resetstorage":
                return removeLocalStorage();

            case "github": 
                return window.open('https://github.com/Yuteoctober/wins95Portfolio/', '_blank');

            case "webresume": 
                
            return window.open('https://yuteoctober.github.io/resume_web/', '_blank');
            
            case "cat": 
                setRunCatVideo(true)
                return;

            default:
                return runOpenFuction();
        }
    }
    
    function removeLocalStorage() {
        localStorage.clear();
        location.reload();
    }

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
                <p>×</p>
            </div>
        </div>
        <div className="error_message_container">
            <img src={Error} alt="error" />
            <p>{Content}</p>
        </div>
        <div className={`confirm_container${YesNo ? '' : 'none'}`}>
            <div className="error_ok_btn"
                onClick={() => {
                    setStateVal(false)
                    handleFunction(stateVal)
                }}
                
            >
                <p>{YesNo ? 'YES' : 'OK'}</p>
            </div>
            {YesNo && (
             <div className="error_ok_btn"
                onClick={() => {
                    setStateVal(false)
                }}
                
            >
                <p>NO</p>
            </div>   
            )}
            
        </div>
    </div>
  )
}

export default ErrorBtn
