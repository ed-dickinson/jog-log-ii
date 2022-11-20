import React, {useState, useEffect} from 'react'

const Writer = ({writerOpen, setWriterOpen, stravaActivity}) => {

  const [runDescription, setRunDescription] = useState('');
  const [runTitle, setRunTitle] = useState(stravaActivity ? stravaActivity.name : '')

  useEffect(()=>{
    setRunTitle(stravaActivity ? stravaActivity.name : '')
  },[stravaActivity])

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

    </div>
      <div className="Hand" >

      </div>
      <button className="CloseButton" onClick={()=>setWriterOpen(!writerOpen)}></button>
    </aside>
  )
}

export default Writer
