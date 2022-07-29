import React from 'react'

// {athlete.firstname} {athlete.lastname}

const Athlete = ({athlete}) => {
  return (
    <div className="Athlete">
      <img src={athlete.profile} alt='Athlete profile picture'/>
        <span className="AthleteInfo">
        <div>
        <strong>{athlete.firstname} {athlete.lastname}</strong>
        </div>
        <div className="AthleteLocation">
          {athlete.city}, {athlete.state}
        </div>
      </span>
    </div>
  )
}

export default Athlete
