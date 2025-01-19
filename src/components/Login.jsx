import UseContext from '../Context'
import { useContext, useState, useEffect } from "react";
import login_icon from '../assets/login.png'
import mario from '../assets/mario.gif'
import tunnel from '../assets/tunnel.png'
import '../css/Login.css'

function Login() {

    const [ username, setUsername ] = useState('admin')
    const [ password, setPassword ] = useState('1234')
    const [ sizeUp, setSizeUp ] = useState(1)

    const { setLogin, themeDragBar } = useContext(UseContext);

    function handleLogin(e) {
        e.preventDefault()

        if(username === 'admin' && password === '1234'){
            setLogin(false)
        }
        return;
    }

    function handleMarioSizeUp() {
        if(sizeUp >= 3) {
            return
        }
        setSizeUp(prev => prev + 0.1)
    }

    useEffect(() =>{
      const sectionBG = document.getElementsByClassName('login_section')[0];
      const localtheme = localStorage.getItem('theme')
      const localbg = localStorage.getItem('background')
      const bodyBG = document.getElementsByTagName('body')[0];
      const localEffect = localStorage.getItem('effect')
      
        if(localEffect) {
          const rootEffect = document.getElementById('root')

          rootEffect.style.setProperty('--before-bg-image', `url(${localEffect})`);
        }
        if (localtheme && localbg) {
          bodyBG.style.backgroundColor = localtheme
          sectionBG.style.backgroundColor = localtheme
          bodyBG.style.backgroundImage = `url(${bodyBG})`
        } else {
          bodyBG.style.backgroundColor = '#098684'
          sectionBG.style.backgroundColor = '#098684'
        }
      
    },[])

    useEffect(() => {
        // Create a <style> element
            const style = document.createElement('style');
            style.innerHTML = `
              @keyframes run {
                0% {
                  left: -3%;
                  transform: scale(${sizeUp}) rotateY(0deg);
                  opacity: 1;
                }
                25% {
                  transform: scale(${sizeUp}) rotateY(0deg);
                }
                50% {
                  left: 94%;
                  transform: scale(${sizeUp}) rotateY(180deg);
                }
                75% {
                  transform: scale(${sizeUp}) rotateY(180deg); 
                }
                100% {
                  left: -3%;
                  transform: scale(${sizeUp}) rotateY(360deg);
                  opacity: 1;
                }
              }
        
              @keyframes tunnel {
                0% {
                  top: 0;
                  left: -3%;
                }
                30% {
                  opacity: 0;
                }
                40% {
                  opacity: 1;
                }
                100% {
                  left: -3%;
                  top: -1.9rem;
                  opacity: 1;
                }
              }
            `;
            
            // Append the <style> element to the document head
            document.head.appendChild(style);
            
            return () => {
              document.head.removeChild(style);
            };
          }, [sizeUp]);
  
    return (
    <section className='login_section'>
        <div className="mario_div">
          <img src={mario} alt="mario" className='mario' 
          style={{
            animation: 'tunnel 2s ease, run 5s ease infinite forwards',
            animationDelay: '2.8s, 4.6s',
            transform: `scale(${sizeUp})`
          }} 
          />
          <img src={tunnel} alt="tunnel" className='tunnel' />
        </div>
        
        <div className='login_container'>
            
            <div className="tap_login" style={{backgroundColor: themeDragBar}}>
                <p>Welcome to Windows</p>
                <div className="tap_button">
                    <div className="login_question"
                        onClick={handleMarioSizeUp}
                    >
                        <p className='login_question_mark'>?</p>
                    </div>
                </div>
            </div>
            <div className="logo_icon">
                <img src={login_icon} alt="login_icon" />
            </div>
            <div className="login_input">
                <p className='login_des'>Type a user name and password to log on to Windows.</p>
                    <label>User name:</label>
                    <input type="text" maxLength={20} 
                      onChange={() => null}
                      value={username} 
                    />
                    <br />
                    <label style={{marginRight: '17px'}}>Password:</label>
                    <input type="password"  maxLength={20} 
                      onChange={() => null}
                      value={password} 
                    />
            </div>
            <div className="login_button">
                <div className="login_btn"
                    onClick={handleLogin}
                >
                    <p>OK</p>
                </div>
                <div className="login_btn">
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Login
