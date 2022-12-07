import React from 'react'

import oldRuns from '../old.json'
import dateTool from '../services/dates'

const OldRuns = ({setWriterOpen, setRunInMemory}) => {
  console.log(oldRuns.runs)

  const runs = oldRuns.runs.sort((a, b) => {return new Date(b.date) - new Date(a.date)})

  runs.sort()
  return (
    <div>
      Old Runs:
      <table>
        <tbody>
          {runs.map(run =>
            <tr key={run.no}>
              <td className={"RunIcon"+(run.strava_id?" StravaRun":"")}><img src="/assets/Treasures48-runner2.png" alt="Run" /></td>
              <td className="RunTitle" onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {run.title}
                <div style={{whiteSpace: 'pre-wrap', borderBottom: '10px solid white'}}>{run.description}</div>
                <div className="LinkedRunImpression">{run.description}</div>
              </td>
              <td>{run.distance}</td>
              <td>{dateTool.simpleDate(run.date)}</td>
              <td className="ButtonCell">
                <button
                  className="ActivityLogButton"
                  onClick={()=>{
                    console.log('set run in writer', run)
                    setRunInMemory({...run, no:null, title:run.distance.toFixed(1)+'mi'})
                    setWriterOpen(true)
                  }}>LOG</button>
              </td>

            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OldRuns
