import '../css/WindowsShutdown.css';
import windowsshut from '../assets/shuttingdownbg.png'
import { useState } from 'react'

function WindowsShutdown() {

  const [ textShutDown, setTextShutDown ] = useState(true)

  const text = (
    <h1>
      {textShutDown? 'Please wait while your computer' : 'It is now safe to turn off'}
      <br />
      {textShutDown? 'shut down.' : 'your computer.'}
    </h1>
  )


  setTimeout(() => {
    setTextShutDown(false)
    
  }, 4800);

  return (
    <div className='shitdown_bg_container'>
        <img src={windowsshut} alt="windowsShutdown" />
            {text}
    </div>
  )
}

export default WindowsShutdown
