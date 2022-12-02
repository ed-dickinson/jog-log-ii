import React from 'react'

import dateTool from '../services/dates'

const Runs = ({runs, setWriterOpen}) => {

  return (

    <div className="Runs">

      <table>
        <tbody>
          {runs.map(run =>
            <tr key={run.no}>
              <td><img src="/assets/Treasures48-runner2.png" alt="Run"/></td>
              <td className="RunTitle" onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {run.title}
                <div className="LinkedRunImpression">{run.description}</div>
              </td>
              <td>{dateTool.simpleDate(run.date)}</td>
              <td className="ButtonCell">
                <button
                  className="ActivityLogButton"
                  onClick={()=>{
                    console.log('set run in writer')
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
