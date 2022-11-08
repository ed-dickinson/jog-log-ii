import React from 'react'

const Profile = ({profileOpen, setProfileOpen, athlete}) => {
  return (
    <div className="ProfileContainer">
      <div className={"Profile" + (profileOpen ? ' show' : ' hide')}>
        <div className="PageTitle">Profile:</div>
        {athlete
          ?
          <div>
            <strong>{athlete.firstname} {athlete.lastname}</strong> #{athlete.id}
          </div> 
          :
          <div>
            <div>Hmm, it doesn't look like the browser recognises you.</div>
            <div>Please log in or create a profile.</div>
            <input></input>
            <input></input>
            <button>Log in</button>
          </div>
        }

      </div>
    </div>
  )
}

export default Profile
