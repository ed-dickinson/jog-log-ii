import React, {useState}  from 'react'
import timeFormatter from '../formatters/timeFormatter'

/*
  activity has:

  commute (true or false)
  distance
  gear_id
  id
  location_country
  moving_time
  name
  sport_type & type (typically 'Run' or 'Ride')
  start_date ["2021-05-14T11:03:16Z"], start_date_local , utc_offset (3600)
  total_elevation_gain , elev_high & elev_low
*/

const IsolateActivityButton = ({badge, activity, isolatedActivity, setIsolatedActivity, isolatedActivities, setIsolatedActivities}) => {
  return (
    <button className={isolatedActivity===activity?'Selected':'Unselected'} onClick={()=>setIsolatedActivity(activity)}>{badge}</button>
  )
}

const ActivityDisplay = ({activities, metric}) => {

  const [isolatedActivity, setIsolatedActivity] = useState('None')
  const [isolatedActivities, setIsolatedActivities] = useState(activities)

  // let temp_activities = []
  // activities.forEach(activity => {
  //   if (activity.type === isolatedActivity || isolatedActivity === 'None') {
  //     temp_activities.push(activity)
  //   }
  // })
  // setIsolatedActivities(temp_activities)

  return (
    <div className="Activites">
      <div className="ActivityControls">
        <IsolateActivityButton badge={'🏃'} activity={'Run'} isolatedActivity={isolatedActivity} setIsolatedActivity={setIsolatedActivity}
        isolatedActivities={isolatedActivities} setIsolatedActivities={setIsolatedActivities} />
        <IsolateActivityButton badge={'🚴'} activity={'Ride'} isolatedActivity={isolatedActivity} setIsolatedActivity={setIsolatedActivity} isolatedActivities={isolatedActivities} setIsolatedActivities={setIsolatedActivities} />
        <IsolateActivityButton badge={'🏊'} activity={'Swim'} isolatedActivity={isolatedActivity} setIsolatedActivity={setIsolatedActivity} isolatedActivities={isolatedActivities} setIsolatedActivities={setIsolatedActivities} />
      </div>
      <table>
      {isolatedActivities.map(activity =>
        <tr>
          <td>{activity.type==='Run'?'🏃'
            :activity.type==='Ride'?'🚲'
            :activity.type==='Swim'?'🏊'
            :activity.type==='Hike'?'🥾'
            :activity.type==='InlineSkate'?'🛼'
            :activity.type==='RockClimb'?'🧗'
            :activity.type==='Canoe'?'🛶'
            :activity.type==='Kayak'?'🛶'
            :activity.type==='Row'?'🚣'
            :activity.type==='Walk'?'🚶'
            :'🕴️'}</td>
          <td>{activity.name}</td>
          <td>{(activity.distance / (metric?1000:1609.344)).toFixed(1)}<em>.</em>{metric?'km':'mi'}</td>
          <td>{(activity.total_elevation_gain*(metric?1:3.28084)).toFixed(0)}{metric?'m':'ft'}</td>
          <td>{timeFormatter.fromSeconds(activity.moving_time)}</td>
        </tr>
      )}
      </table>
    </div>
  )
}

export default ActivityDisplay
