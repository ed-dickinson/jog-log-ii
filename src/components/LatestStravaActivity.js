import React from 'react'

import dateTool from '../services/dates'

const LatestStravaActivity = ({latestStravaActivity, setRunInMemory, setWriterOpen}) => {

  const activity = latestStravaActivity

  // onChange={({target}) => setRunDescription(target.value)}

  return (

    <div className="LatestStravaActivity">
      <div className="Title">
        {activity.name}
        <button className="StoreActivity" onClick={()=>{
          setRunInMemory(activity)
          setWriterOpen(true)
        }}></button>
      </div>
      <div className="Description">
        {activity.description ? activity.description : 'No description.'}
      </div>
      <div className="Date">
        {dateTool.fullDateTrad(activity.start_date_local)}
      </div>




    </div>
  )
}

export default LatestStravaActivity
