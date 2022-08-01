import React from 'react'
// , {useState, useEffect}
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

  let by_year = []

  const now = new Date()

  const stats = {longest_month: 0}

  filteredActivities.forEach(activity => {
    let date = new Date(activity.start_date_local)
    let year = date.getFullYear()
    let year_index = now.getFullYear() - year
    let month = date.getMonth()
    // console.log(month)
    if (by_year[year_index]===undefined) {
      by_year[year_index] = {year, distance: 0, elevation: 0, by_months: []}
      for (let i = 0; i < 12; i++) {
        by_year[year_index].by_months.push({distance: 0})
      }

    }

    by_year[year_index].distance += activity.distance
    by_year[year_index].elevation += activity.elevation


    // if (by_year[year_index].by_months[month]===undefined) {
    //   by_year[year_index].by_months[month] = {distance : 0}
    // }
    by_year[year_index].by_months[month].distance += activity.distance

    if (by_year[year_index].by_months[month].distance > stats.longest_month) {
      stats.longest_month = by_year[year_index].by_months[month].distance
    }
    // console.log(date.getFullYear())
  })
  //
  // // console.log(filteredActivities)
  console.log(by_year, stats.longest_month)

  // console.log(filteredActivities)

  return (
    <table className="DisplayYearTable">
      <thead>
        <tr>

        </tr>
      </thead>
      <tbody>
      {by_year.map(year =>
        <tr key={year.year}>
          <th>{year.year}</th>
          {year.by_months.map(month =>
            <td>
              <div className="Foot" style={{width:(month.distance/stats.longest_month*100)+'%', height: (month.distance/stats.longest_month*100)+'%'}}></div>
              {(month.distance/1000).toFixed(0)}
            </td>
          )}
        </tr>
      )}
      </tbody>
    </table>

  )
}

export default DisplayYear
