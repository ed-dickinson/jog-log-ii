import React from 'react'

import dateTool from '../services/dates'

const Runs = ({runs, setWriterOpen}) => {
  console.log(runs)
  return (

    <div className="Runs">

      <table>
        <tbody>
          {runs.map(run =>
            <tr key={run.no}>

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
