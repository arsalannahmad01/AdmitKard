import React from 'react'
import './Welcome.css'
import WelcomeIcon from '../images/welcomeIcon.png'

const Welcome = () => {
  return (
    <div className='welcome' >
        <img src={WelcomeIcon} width={305} height={308} />
        <div className='welcome-msg' >Welcome to AdmitKard</div>
        <div className='welcome-statement' >
            <div className='firstP' >In order to provide you with a custom experience,</div>
            <div className='secondP' >we need to ask you a few questions.</div>
            <button className='start-btn' >Get Started</button>
            <div className='end-stat' >*This will only take 5 min.</div>
        </div>
    </div>
  )
}

export default Welcome