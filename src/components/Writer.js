import React from 'react'

const Writer = ({writerOpen, setWriterOpen, stravaActivity}) => {
  return (
    <aside className={"Writer" + (writerOpen ? ' show' : ' hide')}>
    <div className="Card" >
      {stravaActivity && <div>{stravaActivity.name}</div>}
    </div>
      <div className="Hand" >

      </div>
      <button className="CloseButton" onClick={()=>setWriterOpen(!writerOpen)}></button>
    </aside>
  )
}

export default Writer
