import UseContext from '../Context'
import { useContext, useState } from "react";
import login_icon from '../assets/login.png'
import mario from '../assets/mario.gif'
import '../css/Login.css'

function Login() {

    const [username, setUsername] = useState('admin')
    const [password, setPassword] = useState('1234')

    const { setLogin } = useContext(UseContext);

    function handleLogin(e) {
        e.preventDefault()

        if(username === 'admin' && password === '1234'){
            setLogin(false)
        }
        return;
    }

  return (
    <>
        <div className="mario_div">
          <img src={mario} alt="mario" className='mario' />  
        </div>
        
        <div className='login_container'>
            
            <div className="tap_login">
                <p>Welcome to Windows</p>
                <div className="tap_button">
                    <div className="login_question">
                        <p>?</p>
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
                        value={username} 
                    />
                    <br />
                    <label style={{marginRight: '17px'}}>Password:</label>
                    <input type="password"  maxLength={20} 
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
    </>
  )
}

export default Login
