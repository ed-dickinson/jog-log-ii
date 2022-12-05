import React from 'react'

import dateTool from '../services/dates'

const Runs = ({runs, setWriterOpen, setRunInMemory}) => {



  return (

    <div className="Runs">

      <table>
        <tbody>
          {runs.map(run =>
            <tr key={run.no}>
              <td className={"RunIcon"+(run.strava_id?" LinkedToStrava":"")}><img src="/assets/Treasures48-runner2.png" alt="Run" /></td>
              <td className="RunTitle" onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {run.title}
                <div className="LinkedRunImpression">{run.description}</div>
              </td>
              <td>{dateTool.simpleDate(run.date)}</td>
              <td className="ButtonCell">
                <button
                  className="ActivityLogButton"
                  onClick={()=>{
                    console.log('set run in writer', run)
                    setRunInMemory(run)
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

export default Runs
