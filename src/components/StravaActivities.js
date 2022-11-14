import React from 'react'

const StravaActivities = ({activities}) => {
  return (

    <div className="StravaActivities">

      <table>
        <tbody>
          {activities.map(activity =>
            <tr key={activity.id}>
            <td>{activity.type==='Run'?<img src="/assets/Treasures48-runner2.png" alt="Run"/>
              :activity.type==='Ride'?<img src="/assets/Treasures49-cyclist2.png" alt="Ride"/>
              :activity.type==='Swim'?<img src="/assets/Treasures53-swimmer.png" alt="Swim"/>
              :activity.type==='Hike'?'🥾'
              :activity.type==='InlineSkate'?'🛼'
              :activity.type==='RockClimb'?'🧗'
              :activity.type==='Canoe'?'🛶'
              :activity.type==='Kayak'?'🛶'
              :activity.type==='Row'?'🚣'
              :activity.type==='Walk'?<img src="/assets/Treasures49-walker.png" alt="Walk"/>
              :'🕴️'}</td>
              <td>{activity.name}</td>
              <td className="ButtonCell"><button className="ActivityLogButton">LOG</button></td>
              <td style={{textAlign: 'right'}}>{(activity.distance / 1609.344).toFixed(1)}mi</td>
              <td style={{textAlign: 'right'}}>
                <span className="ElevationIcon" style={(activity.total_elevation_gain /activity.distance * 30) < 1
                  ?{borderTopWidth:(activity.total_elevation_gain /activity.distance * 30)+'em', borderRightWidth: '1em'
                }
                  :{borderTopWidth:'1em',borderRightWidth:1/(activity.total_elevation_gain /activity.distance * 30)+'em'}}></span>
              </td>
              <td>{(activity.total_elevation_gain).toFixed(0)}m</td>

            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default StravaActivities
