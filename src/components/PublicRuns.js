import React, {useEffect, useState} from 'react'

import runService from '../services/run'
import dateTool from '../services/dates'

const PublicRuns = () => {
  const [runList, setRunList] = useState([])

  const getRuns = async () => {

    try {

      // setSaveState('Saving...')

      const response = await runService.listAll({
        // token: token,
        // runParameters
      })



      // const response = await (runInMemory && runInMemory.title)
      // ? runService.saveRun({
      //   token: token,
      //   runParameters
      // })
      // : runService.saveRun({
      //   token: token,
      //   runParameters
      // })

      if (response) {
        console.log('got', response)
        let sorted_runs = response.runs.sort((a, b) => {return new Date(b.date) - new Date(a.date)})
        if (sorted_runs.length > 20) {
          sorted_runs.length = 20
        }
        setRunList(sorted_runs)
      }


    } catch (exception) {
      console.log('Error saving...')
    }
  }

  useEffect(()=>{
    getRuns()
  }, [])

  return (
    <div className="PublicRuns">
      <table>
        <tbody>
          {runList.map(run =>
            <tr key={run.no}>
              <td className={"RunIcon"+(run.strava_id?" StravaRun":"")}><img src="/assets/Treasures48-runner2-orange.png" alt="Run" /></td>

              <td className={"RunTitle"+(runList.length===1?" Expanded":'')} onClick={(e)=>{e.target.classList.toggle('Expanded')}}>
                {run.title}
                <div className="LinkedRunImpression">{run.description}</div>
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
    </div>
  )
}

export default PublicRuns
