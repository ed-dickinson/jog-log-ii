import React, {useState, useEffect}  from 'react'
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

const DisplayList = ({filteredActivities, metric}) => {

  const [sortBy, setSortBy] = useState('Default')
  const [sortedActivities, setSortedActivities] = useState(filteredActivities)

  const sortActivities = (sortType) => {
    let temp_activities = filteredActivities
    if (sortType === 'Distance') {
      temp_activities.sort(function(a, b){return b.distance-a.distance})
    } else if (sortType === 'Elevation') {
      temp_activities.sort(function(a, b){return b.total_elevation_gain-a.total_elevation_gain})
    } else {
      // temp_activities = filteredActivities
      setSortedActivities(filteredActivities)
      return
    }

    setSortedActivities(temp_activities)
  }

  useEffect(() => {
    sortActivities(sortBy)
  }, [sortBy, filteredActivities])

  // console.log(sortBy)

  return (
    <table className="DisplayListTable">
      <thead>
        <tr>
          <th></th><th></th>
          <th><button onClick={()=>setSortBy(sortBy==='Distance'?'Default':'Distance')}>👇</button></th>
          <th><button onClick={()=>setSortBy(sortBy==='Elevation'?'Default':'Elevation')}>👇</button></th><th>👇</th>
        </tr>
      </thead>
      <tbody>
      {sortedActivities.map(activity =>
        <tr key={activity.id}>
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
      </tbody>
    </table>

  )
}

export default DisplayList
