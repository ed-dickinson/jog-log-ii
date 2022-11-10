import React from 'react'

const StravaActivities = ({activities}) => {
  return (

    <div className="StravaActivities">

      <table>
        <tbody>
          {activities.map(activity =>
            <tr>
            <td>{activity.type==='Run'?<img src="/assets/Treasures48-runner2.png" />
              :activity.type==='Ride'?<img src="/assets/Treasures49-cyclist2.png" />
              :activity.type==='Swim'?<img src="/assets/Treasures53-swimmer.png" />
              :activity.type==='Hike'?'🥾'
              :activity.type==='InlineSkate'?'🛼'
              :activity.type==='RockClimb'?'🧗'
              :activity.type==='Canoe'?'🛶'
              :activity.type==='Kayak'?'🛶'
              :activity.type==='Row'?'🚣'
              :activity.type==='Walk'?<img src="/assets/Treasures49-walker.png" />
              :'🕴️'}</td>
              <td>{activity.name}</td>
              <td>{(activity.distance / 1609.344).toFixed(1)}mi</td>
              <td><span className="ElevationIcon" style={{borderTopWidth:(activity.total_elevation_gain /activity.distance * 20)+'em'}}></span></td>
              <td>{(activity.total_elevation_gain).toFixed(0)}m</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default StravaActivities
