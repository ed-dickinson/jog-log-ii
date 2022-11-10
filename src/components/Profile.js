import React from 'react'

// import { UserContext } from '../App.js'

const Profile = ({profileOpen, setProfileOpen, athlete, user}) => {

  // const user = useContext(UserContext)

  return (
    <div className="ProfileContainer">
      <div className={"Profile" + (profileOpen ? ' show' : ' hide')}>
        <div className="PageTitle">Profile:</div>
        <div className="UserConnection"><img src={user ? 'assets/123-connection.png': 'assets/122-noconnection.png'} /> {user ?
          'user connected' : 'user unconnected'}</div>
        {athlete
          ?
          <div>
            <strong>{athlete.firstname} {athlete.lastname}</strong> <span className="StravaID">#{athlete.id}</span>
          </div>
          :
          <div>
            <div>Hmm, it doesn't look like the browser recognises you.</div>
            <div>Please log in, create a profile, or connect with Strava.</div>
            <div>
              <label>Username/email: </label>
              <input></input>
            </div>
            <div>
              <label>Password: </label>
              <input type="password"></input>
            </div>
            <button>Log in</button><button>Sign Up</button><br />
            <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri=http://localhost:3000/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
              <img src="assets/strava-connect-button.png" />
            </button>
          </div>
        }

      </div>
    </div>
  )
}

export default Profile
