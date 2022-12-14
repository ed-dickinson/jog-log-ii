import React, {useState, useEffect} from 'react'

import runService from '../services/run'
import stravaService from '../services/strava'
import dateTool from '../services/dates'

// THING NEEDS REFRESH UPDATING WHATEVER WHEN RUN IS ADDED/EDITED

const Writer = ({writerOpen, setWriterOpen, runInMemory, setRunInMemory, user, token, getRuns}) => {

  const [runDescription, setRunDescription] = useState('');
  const [runTitle, setRunTitle] = useState('')
  const [runDate, setRunDate] = useState('')
  const [runTime, setRunTime] = useState('')
  const [saveState, setSaveState] = useState(null)
  const [updateStrava, setUpdateStrava] = useState(false)

  const [hasStravaLink, setHasStravaLink] = useState(null)

  // resets save message
  if (writerOpen && saveState === 'Jog logged!') {
    setSaveState(null)
  }



// for new strava conversion
  useEffect(()=>{
    /* there are 4 types of run possible:
    | BRAND NEW | NEW STRAVA | EXISTING RUN | EXISTING STRAVA
    name:  -          name          title         title
                  start_date_local   date          date
                                      _id         _id
                                                  strava_
                                      no          no
    */
    let epoch

    if (runInMemory && runInMemory._id) { // edit run
      setRunTitle(runInMemory.title)
      setRunDescription(runInMemory.description)
      epoch = new Date(runInMemory.date)
    } else if (runInMemory) { // strava import
      setRunTitle(runInMemory.name)
      setRunDescription('')
      epoch = new Date(runInMemory.start_date_local)
    } else {
      setRunTitle(`a ${dateTool.monthName(new Date().getMonth())} run`)
      setRunDescription('')
      epoch = new Date()
    }


    // let epoch = runInMemory ? new Date(runInMemory.start_date_local) : new Date()
    let date = epoch.toISOString().slice(0,10)
    let time = epoch.toISOString().slice(11,19)
    setRunDate(date)
    setRunTime(time)

  },[runInMemory])



// // for new strava conversion
//   useEffect(()=>{
//
//     setRunTitle(runInMemory ? runInMemory.name : `a ${dateTool.monthName(new Date().getMonth())} run`)
//
//     let epoch = runInMemory ? new Date(runInMemory.start_date_local) : new Date()
//     let date = epoch.toISOString().slice(0,10)
//     let time = epoch.toISOString().slice(11,19)
//     setRunDate(date)
//     setRunTime(time)
//
//   },[runInMemory])

  // useEffect(()=>{
  //   if (writerOpen._id) {
  //     let runToEdit = writerOpen
  //     setRunTitle(runToEdit.title)
  //     // setRunDate(runToEdit.date)
  //     setRunDescription(runToEdit.description)
  //   }
  // }, [writerOpen])

  const saveRun = async () => {

    if (!user) {
      setSaveState('You need to login first!')
      return
    }

    let runParameters = {
      title: runTitle,
      date: `${runDate}T${runTime}.000Z`,
      description: runDescription,
      user: user.no,
    }

    if (runInMemory) { // strava (or id?)
    // if (runInMemory && runInMemory.type) { // strava (or id?)
      runParameters.strava_id = runInMemory.id ? runInMemory.id : runInMemory.strava_id
    }

    if (runInMemory && runInMemory.no) {
      runParameters.no = runInMemory.no
    }

    try {

      setSaveState('Saving...')

      const response = await runService.saveRun({
        token: token,
        runParameters
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
        setWriterOpen(false)
        getRuns()
        setSaveState('Saved!')
      }


    } catch (exception) {
      setSaveState('Error saving...')
    }

    if (updateStrava) {
      try {
        const id = runInMemory.id ? runInMemory.id : runInMemory.strava_id
        console.log(id)
        stravaService.editActivity({
          access_token : token.token,
          id : id,
          description : runDescription,
          name : runTitle
        }).then(res=>{console.log(res)})
      } catch (exception) {
        console.log('error updating strava')
      }
    }

  }

  useEffect(()=>{
    if (!runInMemory) {return}
    setHasStravaLink(runInMemory.id || runInMemory.strava_id ? true : false)
  },[runInMemory])

  console.log(runInMemory)

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
        onChange={({target}) => {setRunDate(target.value)}}
      ></input>

      <input type="time"
        value={runTime}
        onChange={({target}) => setRunTime(target.value)}
      ></input>

      <span className={"SaveReadout"+(hasStravaLink?" HasStravaLink":"")}>{saveState}</span>

      {runInMemory && (runInMemory.strava_id || runInMemory.name) &&
        <button className={"UpdateStravaCheck" + (updateStrava ? " Checked" : "")}
          onClick={()=>{setUpdateStrava(!updateStrava)}}
          onMouseEnter={()=>{setSaveState(<span className="Orange">Update Strava</span>)}}
          onMouseLeave={()=>{setSaveState(null)}}
          >
        </button>
      }


      <button className={"SaveButton" + (
        saveState === 'Saving...' ? " Saving" :
        saveState === 'Error' ? " Alert" : ""
      )} onClick={saveRun}>
        Save
      </button>

    </div>
      <div className="Hand" >

      </div>
      {runInMemory && runInMemory.name &&
        <button className="StravaOption" onClick={()=>setRunInMemory(null)}></button>
      }


      <button className="CloseButton" onClick={()=>setWriterOpen(false)}></button>
    </aside>
  )
}

export default Writer
