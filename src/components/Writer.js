import React, {useState, useEffect} from 'react'

import runService from '../services/run'
import dateTool from '../services/dates'

const Writer = ({writerOpen, setWriterOpen, stravaActivity, user, token}) => {

  const [runDescription, setRunDescription] = useState('');
  const [runTitle, setRunTitle] = useState('')
  const [runDate, setRunDate] = useState('')
  const [runTime, setRunTime] = useState('')

  stravaActivity ? console.log(stravaActivity) : console.log('no strava activity')

  useEffect(()=>{

    setRunTitle(stravaActivity ? stravaActivity.name : `a ${dateTool.monthName(new Date().getMonth())} run`)

    let epoch = stravaActivity ? new Date(stravaActivity.start_date_local) : new Date()
    let date = epoch.toISOString().slice(0,10)
    let time = epoch.toISOString().slice(11,19)
    setRunDate(date)
    setRunTime(time)
  },[stravaActivity])

  const saveRun = async () => {

    let runParameters = {
      title: runTitle,
      date: `${runDate}T${runTime}.000Z`,
      description: runDescription,
      user: user.no,
    }

    if (stravaActivity) {
      runParameters.strava_id = stravaActivity.id
    }

    try {
      const response = await runService.createNew({
        token: token,
        runParameters
      })
      console.log(response)
    } catch (exception) {
      console.log('did not work', exception)
    }

    console.log('save run:', token, runParameters)
  }

  return (
    <aside className={"Writer" + (writerOpen ? ' show' : ' hide')}>
    <div className="Card" >

      <input
        className="RunTitle"
        value={runTitle}
        onChange={({target}) => setRunTitle(target.value)}
      ></input>

      <textarea
        type="textarea" name="description"
        value={runDescription}
        onChange={({target}) => setRunDescription(target.value)}
      />

      <input type="date"
        value={runDate}
        onChange={({target}) => { console.log(target.value);setRunDate(target.value)}}
      ></input>

      <input type="time"
        value={runTime}
        onChange={({target}) => setRunTime(target.value)}
      ></input>

      <button className="SaveButton" onClick={saveRun}>
        Save
      </button>

    </div>
      <div className="Hand" >

      </div>
      <button className="CloseButton" onClick={()=>setWriterOpen(!writerOpen)}></button>
    </aside>
  )
}

export default Writer
