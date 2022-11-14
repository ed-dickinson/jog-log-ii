import React from 'react'
// {athlete.firstname} {athlete.lastname}

const StravaAthlete = ({athlete}) => {
  return (
    <div className="StravaAthlete">
      from strava with athlete in tow:
      <br />
      {athlete.firstname} {athlete.lastname}
      <br />
      {athlete.city}, {athlete.state}, {athlete.country}
      <br />
      since: {athlete.created_at}
      <br />
      ID: {athlete.id} <img src={athlete.profile} alt="Athlete, provided by Strava." /> <img src={athlete.profile_medium} alt="Small Athlete, provided by Strava." />

    </div>
  )
}

export default StravaAthlete
