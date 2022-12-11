import React, {useState} from 'react'

// import { UserContext } from '../App.js'

import accountService from '../services/account'

import StravaReconnectButton from './StravaReconnectButton'

const current_base_url = window.location.origin

const Profile = ({profileOpen, setProfileOpen, athlete, user, setUser, token}) => {

  // const user = useContext(UserContext)

  // this is to show the second password form
  const [signingUp, setSigningUp] = useState(false)
  const [message, setMessage] = useState(null)

  const [working, setWorking] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')


  const signUp = async () => {
    if (!signingUp) {
      setSigningUp(true)
      setMessage('Please confirm password.')
    } else {
      if (username.length < 2) {
        setMessage('Username too short.')
        return
      } else if (password.length < 5) {
        setMessage('Password too short.')
        return
      } else if (password !== passwordConf) {
        console.log(password, passwordConf)
        setMessage("Passwords don't match.")
        return
      }
      try {
        if (working) {return}
        setWorking(true)
        // const response = await
        accountService.userNew({
          email: username, password
        }).then(response2 => {
          setMessage("Registered!")
          setWorking(false)
        })
      } catch (exception) {
        console.log('error registering')
        setTimeout(() => {
          console.log('timeout - register')
          setWorking(false)
        }, 5000)
        setMessage("Error registering.")
        setWorking(false)
      }
    }
  }

  const logIn = async () => {
    if (username.length < 2) {
      setMessage('Invalid username.')
      return
    } else if (password.length < 5) {
      setMessage('Invalid password.')
      return
    }

    setWorking(true)
    accountService.userLogin({
      email: username, password
    }).then(response=>{
      setWorking(false)
      setMessage('Logged in!')
      setUser(response.user)
      setProfileOpen(false)
    }).catch(error=>{
      setWorking(false)
      setMessage(
        error.response.status === 401 ? 'No such user.' :
        error.response.status === 403 ? 'Wrong password' : 'Error logging in.'
      )
      // error.response.data.message
    })

  }



  return (
    <div className="ProfileContainer">
      <div className={"Profile" + (profileOpen ? ' show' : ' hide')}>

        <div className="UserConnection">
          <span className={user ? "Connected" : "Unconnected"}>{user ? 'user connected' : 'user unconnected'}</span> <img src={user ? 'assets/123-connection.png': 'assets/122-noconnection.png'} alt="" />
        </div>
        {athlete
          &&
          <div>
            <div style={{cursor: 'pointer'}} onClick={()=>{window.location.href=current_base_url +"/strava-profile"}}>
              <strong>{athlete.firstname} {athlete.lastname}</strong> <span className="StravaID"><span style={{fontSize:'0em'}}>ID</span >#{athlete.id}</span>
            </div>

            <div>{!token.valid && <div>Strava Token Expired<br />
              <StravaReconnectButton />
            </div>}</div>
          </div>
        }
        {!user && !athlete &&
          <div className="UserForm">
            <div>Hmm, it doesn't look like the browser recognises you.</div>
            <div>Please log in, create a profile, or connect with Strava.</div>
            <div className="LabelAndInput">
              <label>Username/email: </label>
              <input onChange={({target}) => setUsername(target.value)}></input>
            </div>
            <div className="LabelAndInput">
              <label>Password: </label>
              <input type="password"
                onChange={({target}) => setPassword(target.value)}
                onKeyPress={(e)=>{if(e.code==='Enter'){logIn()}}}
              ></input>
            </div>
            <div className="LabelAndInput" style={!signingUp ? {display: 'none'} : {display: 'block'}}>
              <label>Confirm password: </label>
              <input type="password"
                onChange={({target}) => setPasswordConf(target.value)}
                onKeyPress={(e)=>{if(e.code==='Enter'){signUp()}}}
              ></input>
            </div>
            <span>{working?<img className="StackingGif" src="../assets/tinystacker.gif" alt="Stacking papers."/>:message} </span>
            <button onClick={()=>{logIn()}}>Log in</button><button onClick={()=>{signUp()}}>Sign Up</button><br />
            <button className="StravaConnectButton" onClick={()=>{window.location.href = "http://www.strava.com/oauth/authorize?client_id=70098&response_type=code&redirect_uri="+current_base_url+"/approval&approval_prompt=auto&scope=read_all,activity:read_all"}}>
              <img src="assets/strava-connect-button.png" alt="Connect with Strava" />
            </button>
          </div>
        }
        {user && !athlete &&
          <div className="User">"<strong>{user.email}</strong>"</div>
        }

      </div>
    </div>
  )
}

export default Profile
