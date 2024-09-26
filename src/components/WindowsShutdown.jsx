import '../css/WindowsShutdown.css';
import windowsshut from '../assets/shuttingdownbg.png'

function WindowsShutdown() {

  return (
    <div className='shitdown_bg_container'>
        <img src={windowsshut} alt="windowsShutdown" />
        <h1 className='text_1_shutdown'>Please wait while your computer  <br /> shut down.</h1>
        <h1 className='text_2_shutdown'>It is now safe to turn off  <br /> your computer.</h1>
           
    </div>
  )
}

export default WindowsShutdown
