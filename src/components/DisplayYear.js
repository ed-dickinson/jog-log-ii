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

// {activities.map(activity =>
//   <tr>
//     <td>{activity.type==='Run'?'🏃'
//       :activity.type==='Ride'?'🚲'
//       :activity.type==='Swim'?'🏊'
//       :activity.type==='Hike'?'🥾'
//       :activity.type==='InlineSkate'?'🛼'
//       :activity.type==='RockClimb'?'🧗'
//       :activity.type==='Canoe'?'🛶'
//       :activity.type==='Kayak'?'🛶'
//       :activity.type==='Row'?'🚣'
//       :activity.type==='Walk'?'🚶'
//       :'🕴️'}</td>
//     <td>{activity.name}</td>
//     <td>{(activity.distance / (metric?1000:1609.344)).toFixed(1)}<em>.</em>{metric?'km':'mi'}</td>
//     <td>{(activity.total_elevation_gain*(metric?1:3.28084)).toFixed(0)}{metric?'m':'ft'}</td>
//     <td>{timeFormatter.fromSeconds(activity.moving_time)}</td>
//   </tr>
// )}

const DisplayYear = ({filteredActivities, metric}) => {

  let by_year = {}

  filteredActivities.forEach(activity => {
    let date = new Date(activity.start_date_local)
    let year = parseInt(date.getFullYear())
    let month = date.getMonth()
    // console.log(month)
    if (by_year[year]===undefined) {
      by_year[year] = []
    }

    if (by_year[year][month]===undefined) {
      by_year[year][month] = {distance : 0}
    }
    by_year[year][month].distance += activity.distance
    // console.log(date.getFullYear())
  })

  // console.log(filteredActivities)
  console.log(by_year)

  return (
    <table>
      <thead>
        <tr>

        </tr>
      </thead>
      <tbody>
      {filteredActivities.map(activity =>
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

export default DisplayYear
