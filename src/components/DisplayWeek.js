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

const DisplayWeek = ({filteredActivities, metric, filter}) => {

  let by_month = []

  let by_week = []

  const [activityHighlight, setActivityHighlight] = useState(null)

  const month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const now = new Date()

  const day_now = now.getDay()===0 ? 6 : now.getDay()-1 //[out of 0-6] (0 is sunday)

  // day index today should be 0

  const month_now = now.getMonth()
  const year_now = now.getFullYear()

  const stats = {longest_day: 0, longest_month: 0, longest_month_adj: 0, longest_day_adj: 0, longest_week: 0, longest_week_adj: 0}

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



    let day_of_week = date.getDay()===0 ? 6 : (date.getDay()-1)
    let day_index = Math.round((new Date(now.toDateString()) - new Date(date.toDateString()))  / (1000*3600*24))

    let week_index = Math.floor((day_index) / 7)

    if (day_of_week > day_now) {
      week_index++
    }



    // this sorts it out no matter if month is ahead or behind in the year!
    month_index += (year_index * 12)


    let day = date.getDate()



    if (by_week[week_index]===undefined) {

      let date_copy = date
      date_copy = date_copy - (day_of_week*24*3600*1000)
      let date_plus_6 = date_copy + (6*24*3600*1000)

      by_week[week_index] = {
        week_index, distance: 0, elevation: 0, by_days: [], name: `${dateFormatter.week(new Date(date_copy), new Date(date_plus_6))}`, adjusted_distance: 0,
        debug:{week_index}
      }
      for (let i = 0; i < 7; i++) {
        by_week[week_index].by_days.push({day: i, distance: 0, elevation: 0, adjusted_distance: 0})
      }

    }

    by_week[week_index].by_days[day_of_week].distance += activity.distance
    by_week[week_index].by_days[day_of_week].elevation += activity.total_elevation_gain
    by_week[week_index].by_days[day_of_week].activity = activity
    by_week[week_index].by_days[day_of_week].adjusted_distance += (activity.distance * (activity.type==='Ride'?0.25:activity.type==='Swim'?10:1))

    by_week[week_index].distance += activity.distance
    by_week[week_index].adjusted_distance += activity.adjusted_distance
    by_week[week_index].elevation += activity.total_elevation_gain

    // by_week[week_index].by_weeks[week].distance += activity.distance

    stats.longest_day = compare(by_week[week_index].by_days[day_of_week].distance, stats.longest_day)
    stats.longest_day_adj = compare(by_week[week_index].by_days[day_of_week].adjusted_distance, stats.longest_day_adj)


  })

  by_week.forEach(week => {
    stats.longest_week = compare(week.distance, stats.longest_week)
    stats.longest_week_adj = compare(week.adjusted_distance, stats.longest_week_adj)
  })

  // for (let i = 0; i < by_week.length; i++) {
  //
  //   if (by_week[i] === undefined) {
  //     let year = year_now - (i - (i % 12)) / 12
  //     by_week[i] = {
  //       week_index : i, distance: 0, elevation: 0, by_days: [],
  //       name: month_names[(i%12)>month_now?month_now+12-(i%12):month_now-(i%12)],
  //       year: (year+'').substr(2,2)}
  //   }
  // }

// backgroundColor:`hsl(19.5,100%,${100-((month.distance/stats.longest_month)*50.6)}%)`
  // console.log(by_month)

  // className={"Token "+(filter==='None'?'Leg':filter==='Run'?'Foot':filter==='Ride'?'Bike':'Swimmer')}

  return (
    <div className="DisplayTable DisplayWeek">

      {by_week.map(week =>
        <div className="Row" key={week.week_index}>

          <label><span className="Name">{week.name}</span>
            <div className="WeekStats">
              {(week.distance/(metric?1000:1609.344)).toFixed(0)} {metric?'km':'mi'}
            </div>
            <span className="WeekRelative" style={{width:(week.distance/stats.longest_week*100)+'%'}}></span>
          </label>

          {week.by_days.map(day =>

            <span
              style={{width:(100/week.by_days.length)+'%', left: ((100/7)*day.day)+'%'}}
              onMouseEnter={()=>setActivityHighlight(day.activity)}
              onMouseLeave={()=>setActivityHighlight(null)}
            >
            {day.day}
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
          {dateFormatter.traditionalWithDay(activityHighlight.start_date_local)}
        </div>
      }


    </div>

  )
}

export default DisplayWeek
