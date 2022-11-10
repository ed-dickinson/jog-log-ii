import React from 'react'

const StravaActivities = ({activities}) => {
  return (

    <div className="StravaActivities">

      <table>
        {activities.map(activity =>
          <tr>
          <td>{activity.type==='Run'?<img src="/assets/Treasures48-runner.png" />
            :activity.type==='Ride'?<img src="/assets/Treasures49-cyclist.png" />
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
            <td>{(activity.distance / 1609.344).toFixed(1)}mi</td>
          </tr>
        )}
      </table>

    </div>
  )
}

export default StravaActivities
