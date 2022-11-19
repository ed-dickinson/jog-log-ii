import React, {useState} from 'react'

const Writer = ({writerOpen, setWriterOpen, stravaActivity}) => {

  const [runDescription, setRunDescription] = useState('');

  return (
    <aside className={"Writer" + (writerOpen ? ' show' : ' hide')}>
    <div className="Card" >
      {stravaActivity && <div className="StravaTitle">{stravaActivity.name}</div>}

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
