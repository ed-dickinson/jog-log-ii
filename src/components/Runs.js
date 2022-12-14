import React from 'react'

import dateTool from '../services/dates'

const Runs = ({runs, setWriterOpen, setRunInMemory}) => {



  return (

    <div className="Runs">

      <table>
        <tbody>
          {runs.map(run =>
            <tr key={run.no}>
              <td className={"RunIcon"+(run.strava_id?" StravaRun":"")}><img src="/assets/Treasures48-runner2-orange.png" alt="Run" /></td>

              <td className={"RunTitle"+(runs.length===1?" Expanded":'')} onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {run.title}
                <div className="LinkedRunImpression">{run.description}</div>
              </td>
              <td className="ButtonCell">
                <button
                  className="ActivityLogButton"
                  onClick={()=>{
                    console.log('set run in writer', run)
                    setRunInMemory(run)
                    setWriterOpen(true)
                  }}>LOG</button>
              </td>
              <td className="Date">{dateTool.simpleDate(run.date)}</td>
              <td className="LinkOut" style={{paddingLeft:'0.4em'}}>
              {run.strava_id &&
                <a href={"https://www.strava.com/activities/"+run.strava_id}><img src="assets/179-arrow-orange.png" alt="Arrow point out."/></a>
              }
              </td>

            </tr>
          )}
        </tbody>
      </table>

      {runs.length===0 &&
        <div className="NothingHere" style={{textAlign:'center'}}>
          <img src="/assets/shocked-guy.png" alt="Person looking shocked."/>
          <div className="InfoText">There's nothing here!</div>
        </div>
      }

    </div>
  )
}

export default Runs
