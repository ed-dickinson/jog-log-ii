import React from 'react'

// {athlete.firstname} {athlete.lastname}

// const current_base_url = window.location.origin

const Nav = ({writerOpen, setWriterOpen, profileOpen, setProfileOpen, settingsOpen, setSettingsOpen}) => {

// <button className="UserButton" onClick={()=>{window.location.href = "/profile"}}>

// <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="+current_base_url+"/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
//   <img src="/strava-connect-button@2x.png" alt="" />
// </button>

  return (
    <nav>
    <span className="AppleLogo" onClick={()=>window.location.href = window.location.origin}>
      <img className="AppleGuy" src="/running-apple.png"  alt="Illustration of a half man, half apple running along jauntily."/>
      <img className="HalfAppleGuy" src="/assets/running-apple-slice.png"  alt="Illustration of a half man, half apple running along jauntily."/>
      </span>

      <img src="/san-fran-logo.png" style={{filter: 'drop-shadow(0px 0px 0.5px black)', display: 'none'}} alt="" />

      <span className="MainTitle">Jog Log</span>

      <button className="NewRunButton" onClick={()=>setWriterOpen(!writerOpen)} >
        <img src="assets/188-handwrite.png" alt="Open writer." />
      </button>

      <button className="SettingsButton" onClick={()=>setSettingsOpen(!settingsOpen)} >
        <img src="assets/99-compass.png" alt="Open writer." />
      </button>

      <button className="UserButton" onClick={()=>setProfileOpen(!profileOpen)}>
        <img src="assets/194-head.png" alt="Open profile." />
      </button>



    </nav>
  )
}

export default Nav

// bifurkate: >>> https://www.strava.com/oauth/authorize?client_id=38178&response_type=code&redirect_uri=https://www.bifurkate.com/callback&approval_prompt=force&scope=read,profile:read_all,activity:read,activity:read_all

// stravisu: >>>> http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri=http://localhost:3001/approval&approval_prompt=auto&scope=read_all,activity:read_all


// redirect> http://localhost:3001/approval?state=&code=f4d2294ce9e0e0f9d33b4b33699aecb1649d58e4&scope=read,activity:read_all,read_all
