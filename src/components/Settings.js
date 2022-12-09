import React from 'react'

const Profile = ({settingsOpen, setSettingsOpen}) => {


  return (
    <div className="SettingsContainer">
      <div className={"Profile" + (settingsOpen ? ' show' : ' hide')}>
        Settings
        <div className="Setting">
          Metric:
          <button></button>
        </div>
      </div>
    </div>
  )
}

export default Profile
