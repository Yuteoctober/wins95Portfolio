import { useState, useContext, useEffect } from 'react';
import UseContext from '../Context';
import pcshutdown from '../assets/shutdown.png';
import '../css/Shutdown.css';

function Shutdown() {
    const [selectedOption, setSelectedOption] = useState(null);

    const { shutdownWindow, setShutdownWindow, 
            setLogin, setWindowsShutDownAnimation,
            themeDragBar,
        } = useContext(UseContext);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const style = {
        shutdown: {
            border: selectedOption === "option1" ? '1px dotted black' : ''
        },
        restart: {
            border: selectedOption === "option2" ? '1px dotted black' : ''
        },
        logoff: {
            border: selectedOption === "option3" ? '1px dotted black' : ''
        }
    };

    function handleYesShutdown() {
        if (selectedOption === "option1") {
            setWindowsShutDownAnimation(true)
            const bodyBG = document.getElementsByTagName('body')[0];
            bodyBG.style.background = '#040404'; 
        }

        if (selectedOption === "option2") {
            window.location.reload();
        }

        if (selectedOption === "option3") {
            setLogin(true)
            setShutdownWindow(false)
        }
    }

    function handleNoShutdown() {
        setShutdownWindow(false)
        setSelectedOption(null)
    }

    // useEffect(() => { // change body bg darker tone, when shutdown is toggled
    //     const bodyElement = document.body;
    
    //     if (shutdownWindow) {
    //         bodyElement.style.background = '#09807e';
    //     } else {
    //         bodyElement.style.background = '';
    //     }
    
    // }, [shutdownWindow]);
    

    return (
        shutdownWindow ? (
            <div className='shutdown_bg'>
                <div className="shutdown_container">
                    <div className="nav_shutdown" style={{backgroundColor: themeDragBar}}>
                        <p>Shut Down Windows</p>
                        <div className='x_shutdown_container'
                            onClick={handleNoShutdown}
                        >
                            <p>×</p>
                        </div>
                    </div>
                    <div className="shutdown_main_container">
                        <img src={pcshutdown} alt="pcshutdown" />
                        <div className="shutdown_text_container">
                            <p>Are you sure you want to:</p>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option1"
                                    checked={selectedOption === "option1"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.shutdown}>Shut down the computer?</span>
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option2"
                                    checked={selectedOption === "option2"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.restart}>Restart the computer?</span>
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="option"
                                    value="option3"
                                    checked={selectedOption === "option3"}
                                    onChange={(e) => handleOptionChange(e)}
                                />
                                <span style={style.logoff}>Log off?</span>
                            </label>
                        </div>
                        <div className="shutdown_btn_container">
                            <div className="yes" onClick={handleYesShutdown}>Yes</div>
                            <div className="no" onClick={handleNoShutdown}>No</div>
                            <div className="no">Help</div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null
    );
}

export default Shutdown;
