import React, {useState} from 'react'

import stravaService from '../services/strava'
import dateTool from '../services/dates'

const LatestStravaActivity = ({latestStravaActivity}) => {

  const activity = latestStravaActivity

  return (

    <div className="LatestStravaActivity">
      <div className="Title">
        {activity.name}
        <button className="StoreActivity"></button>
      </div>
      <div className="Description">
        {activity.description}
      </div>




    </div>
  )
}

export default LatestStravaActivity
