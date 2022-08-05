import React, {useState} from 'react'
// , {useState, useEffect}
import timeFormatter from '../formatters/timeFormatter'
import dateFormatter from '../formatters/dateFormatter'

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

const DisplayMonth = ({filteredActivities, metric, filter}) => {

  let by_month = []

  const [activityHighlight, setActivityHighlight] = useState(null)

  const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const now = new Date()

  const month_now = now.getMonth()
  const year_now = now.getFullYear()

  const stats = {longest_day: 0, longest_month: 0, longest_month_adj: 0, longest_day_adj: 0 }

  const compare = (compare, current) => {
    if (compare > current) {
      return compare
    } else {
      return current
    }
  }

  filteredActivities.forEach(activity => {
    let date = new Date(activity.start_date_local)
    let year = date.getFullYear()
    let year_index = year_now - year
    let month = date.getMonth()
    let month_index = month_now - month

    // this sorts it out no matter if month is ahead or behind in the year!
    month_index += (year_index * 12)


    let day = date.getDate()

    if (by_month[month_index]===undefined) {

      by_month[month_index] = {
        month_index, distance: 0, elevation: 0, by_days: [], name: month_names[month], year: (year+'').substr(2,2), adjusted_distance: 0,
        debug:{month_index, year_index}
      }
      let days_in_month = month === 1 ? (year % 4 === 0 ? 29 : 28) : [3,5,8,10].some((x)=>x===month) ? 30 : 31
      for (let i = 0; i < days_in_month; i++) {
        by_month[month_index].by_days.push({day: i, distance: 0, elevation: 0, adjusted_distance: 0})
      }

    }

    by_month[month_index].by_days[day-1].distance += activity.distance
    by_month[month_index].by_days[day-1].elevation += activity.total_elevation_gain
    by_month[month_index].by_days[day-1].activity = activity
    by_month[month_index].by_days[day-1].adjusted_distance += (activity.distance * (activity.type==='Ride'?0.25:activity.type==='Swim'?10:1))

    by_month[month_index].distance += activity.distance
    by_month[month_index].adjusted_distance += activity.adjusted_distance
    by_month[month_index].elevation += activity.total_elevation_gain

    // by_month[month_index].by_months[month].distance += activity.distance

    stats.longest_day = compare(by_month[month_index].by_days[day-1].distance, stats.longest_day)
    stats.longest_day_adj = compare(by_month[month_index].by_days[day-1].adjusted_distance, stats.longest_day_adj)


  })

  by_month.forEach(month => {
    stats.longest_month = compare(month.distance, stats.longest_month)
    stats.longest_month_adj = compare(month.adjusted_distance, stats.longest_month_adj)
  })

  for (let i = 0; i < by_month.length; i++) {
    // if (month===undefined) {
    //
    // }
    if (by_month[i] === undefined) {
      let year = year_now - (i - (i % 12)) / 12
      by_month[i] = {
        month_index : i, distance: 0, elevation: 0, by_days: [],
        name: month_names[(i%12)>month_now?month_now+12-(i%12):month_now-(i%12)],
        year: (year+'').substr(2,2)}
    }
  }

// backgroundColor:`hsl(19.5,100%,${100-((month.distance/stats.longest_month)*50.6)}%)`
  // console.log(by_month)

  // className={"Token "+(filter==='None'?'Leg':filter==='Run'?'Foot':filter==='Ride'?'Bike':'Swimmer')}

  return (
    <div className="DisplayTable DisplayMonth">

      {by_month.map(month =>
        <div className="Row" key={month.month_index}
          style={{
            borderBottomWidth:((month.distance/100000)/(filter==='Run'?0.1:filter==='Swim'?0.01:0.4))+'px'
          }}>

          <label>{month.name + " '" + month.year}</label>
          {month.by_days.map(day =>
            <span
              style={{width:(100/month.by_days.length)+'%', left: ((100/month.by_days.length)*day.day)+'%'}}
              onMouseEnter={()=>setActivityHighlight(day.activity)}
              onMouseLeave={()=>setActivityHighlight(null)}
            >
              <div
                className={"Token "+(day.activity===undefined?'Leg':day.activity.type==='Run'?'Foot':day.activity.type==='Ride'?'Bike':day.activity.type==='Swim'?'Swimmer':'Leg')}
                style={{width:(day.adjusted_distance/stats.longest_day_adj*100)+'%', height: (day.adjusted_distance/stats.longest_day_adj*100)+'%'}}
              ></div>

              {day.distance > 0 &&
                <div className="TokenLabel">{(day.distance/1000).toFixed(0)}</div>
              }

            </span>
          )}
        </div>
      )}

      {(activityHighlight!==null && activityHighlight!==undefined) &&
        <div className="HoverInfo">
          {activityHighlight.name}<br />
          {(activityHighlight.distance/1000).toFixed(1)}km <br />
          {dateFormatter.traditional(activityHighlight.start_date_local)}
        </div>
      }


    </div>

  )
}

export default DisplayMonth
