import React from 'react'

const StravaReconnectButton = () => {
  return (
    <button className="StravaConnectButton" onClick={()=>{
      window.location.href
      = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="
      + window.location.origin
      + "/approval&approval_prompt=auto&scope=read_all,activity:read_all,activity:write"
    }}>
      <img src="assets/strava-reconnect3-button.png" alt="Reconnect with Strava" />
    </button>
  )
}

export default StravaReconnectButton
