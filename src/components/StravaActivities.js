import React from 'react'

import stravaService from '../services/strava'

const StravaActivities = ({activities, runs, setRunInMemory, setWriterOpen, token, setActivities}) => {
  // activities : activities ,
  // setActivities : setActivities
  const getMoreActivities = () => {
    //pagination starts at 1
    stravaService.moreActivities({
      access_token : token.token,
      page : 2

    }).then(res => {
      console.log('fetched runs:', res)
      // setActivities(res)
      // setLoaded(true)
    })
  }

  activities.forEach(activity => {
    let found = runs.find(x => x.strava_id === activity.id)
    if (found) {
      activity.linked_run = found

    }
  })

  return (

    <div className="StravaActivities">



      <table>
        <tbody>
          {activities.map(activity =>
            <tr key={activity.id} className={activity.linked_run ? 'isLinked' : 'isNotLinked'}>
            <td className="RunIcon StravaRun">{activity.type==='Run'?<img src="/assets/Treasures48-runner2.png" alt="Run"/>
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
              <td>{activity.linked_run ? '*' : ' '}</td>
              <td className="ActivityName" onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {activity.name}
                {activity.linked_run && <div className="LinkedRunImpression">{activity.linked_run.description}</div>}
              </td>
              <td className="ButtonCell">
                <button
                  className="ActivityLogButton"
                  onClick={()=>{
                    if (activity.linked_run) {
                      setRunInMemory(activity.linked_run)
                    } else {
                      setRunInMemory(activity)
                    }
                    setWriterOpen(true)
                  }}>LOG</button>
              </td>
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
      <div className="LoadMore">
        <button onClick={()=>{getMoreActivities()}}></button>
      </div>
      {activities.length===0 &&
        <div className="NothingHere" style={{textAlign:'center'}}>
          <img src="/assets/shocked-guy.png"/>
          <div className="InfoText">There's nothing here!</div>
        </div>
      }

    </div>
  )
}

export default StravaActivities
