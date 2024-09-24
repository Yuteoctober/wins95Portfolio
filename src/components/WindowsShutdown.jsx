import '../css/WindowsShutdown.css';
import windowsshut from '../assets/shuttingdownbg.jpg'

function WindowsShutdown() {

  return (
    <div className='shitdown_bg_container'>
        <img src={windowsshut} alt="windowsShutdown" />
        <h1 className="shutdown_text">
            It is now safe to turn off<br />your computer.
        </h1>
    </div>
  )
}

export default WindowsShutdown
