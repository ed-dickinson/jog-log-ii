import React, {useState, useEffect}  from 'react'
import timeFormatter from '../formatters/timeFormatter'

import DisplayList from './DisplayList'
import DisplayYear from './DisplayYear'


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

const FilterActivityButton = ({badge, activity, filteredActivity, setFilteredActivity, filteredActivities, setFilteredActivities}) => {
  return (
    <button className={'FilterButton '+(filteredActivity===activity?'Selected':'Unselected')} onClick={()=>setFilteredActivity(activity)}>{badge}</button>
  )
}

const DisplayStyleButton = ({style, display, setDisplay}) => {
  return (
    <button className={'DisplayStyleButton '+(display===style?'Selected':'Unselected')} onClick={()=>setDisplay(style)}>{style}</button>
  )
}

const ActivityDisplay = ({activities, setActivities, metric}) => {

  const [filteredActivity, setFilteredActivity] = useState('None')
  const [filteredActivities, setFilteredActivities] = useState(activities)

  const [display, setDisplay] = useState('List')

  const filterActivities = (filteredActivity) => {
    if (filteredActivity === 'None') {
      setFilteredActivities(activities)
      return
    } else {
      let temp_activities = []

      activities.forEach(activity => {
        if (activity.type === filteredActivity) {
          temp_activities.push(activity)
        }
      })

      console.log(temp_activities)

      setFilteredActivities(temp_activities)
    }

  }

  // console.log(display)

  useEffect(() => {
    console.log('filter by', filteredActivity)
    filterActivities(filteredActivity)

  }, [filteredActivity])

  // let temp_activities = []
  // activities.forEach(activity => {
  //   if (activity.type === filteredActivity || filteredActivity === 'None') {
  //     temp_activities.push(activity)
  //   }
  // })
  // setFilteredActivities(temp_activities)

  return (
    <div className="Activites">
      <div className="ActivityControls">
        <FilterActivityButton badge={'🏃'} activity={'Run'} filteredActivity={filteredActivity} setFilteredActivity={setFilteredActivity}
        filteredActivities={filteredActivities} setFilteredActivities={setFilteredActivities} />
        <FilterActivityButton badge={'🚴'} activity={'Ride'} filteredActivity={filteredActivity} setFilteredActivity={setFilteredActivity} filteredActivities={filteredActivities} setFilteredActivities={setFilteredActivities} />
        <FilterActivityButton badge={'🏊'} activity={'Swim'} filteredActivity={filteredActivity} setFilteredActivity={setFilteredActivity} filteredActivities={filteredActivities} setFilteredActivities={setFilteredActivities} />
        -&nbsp;
        <DisplayStyleButton style={'List'} display={display} setDisplay={setDisplay}/>
        <DisplayStyleButton style={'Week'} display={display} setDisplay={setDisplay}/>
        <DisplayStyleButton style={'Month'} display={display} setDisplay={setDisplay}/>
        <DisplayStyleButton style={'Year'} display={display} setDisplay={setDisplay}/>
      </div>
      {display === 'List' && <DisplayList filteredActivities={filteredActivities} metric={metric} />}
      {display === 'Year' && <DisplayYear filteredActivities={filteredActivities} metric={metric} />}
    </div>
  )
}

export default ActivityDisplay
