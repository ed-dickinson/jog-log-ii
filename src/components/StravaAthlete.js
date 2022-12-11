import React from 'react'
// {athlete.firstname} {athlete.lastname}
// athlete.profile / athlete.profile_medium
// athlete.city .state .country
// {athlete.city},<br />
// {athlete.state},<br />
// {athlete.country}
// <br />

import dateTool from '../services/dates'

const StravaAthlete = ({athlete}) => {
  return (
    <div className="StravaAthlete">
      <span className="AthleteDetails">
        <strong>{athlete.firstname} {athlete.lastname}</strong>
        <br />

        c. {dateTool.simpleDateTrad(athlete.created_at)}
        <br />

        <span className="StravaID"><a href={"https://www.strava.com/athletes/" + athlete.id}> ID: {athlete.id}</a></span>
      </span>
      <span className="StravaPhoto">
        <img src={athlete.profile_medium} alt="Small Athlete, provided by Strava." />
      </span>

    </div>
  )
}

export default StravaAthlete
