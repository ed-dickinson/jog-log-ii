import React from 'react'

import StravaAthlete from './StravaAthlete'

const Approval = ({athlete}) => {
  return (
    <div className="Approval">
      {athlete !== null &&
        <StravaAthlete athlete={athlete}/>
      }
      <p>
        Hi {athlete ? athlete.firstname : '___'}! Good to see you.
      </p>
      <p>
        Here's your latest Strava Activity, <br />and a list of your most recents:
      </p>

    </div>
  )
}

export default Approval
