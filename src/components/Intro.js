import React from 'react'

// {athlete.firstname} {athlete.lastname}

const Intro = () => {
  return (
    <div className="Intro">
      <p>
        Hi there, and welcome to Jog-Log!
      </p>

      <p>
        Running is a beautiful thing but so often we turn it into a mere accumulation of miles. A thoughtless barage of heartless stats. What good is knowing your heart rate if your heart has turned unresponsive to reflections of the world around you?
      </p>
      <p>
        The aim of this website is to encourage you to mine the rich bounty of poetic stimulation that running can offer.
      </p>
      <p>
        Strava stands tall as the monolithic figurehead for run recording, and this website aims to capture things that Strava doesn't. But we understand that it's still a useful record of your runs. And that the subtler, impression-based side of running doesn't negate the data collecting side.
        So you can either link your Strava account to here and add some of your impressions to those recorded runs, or you can simply create an account on here and record each run unattached.
      </p>
      <p>
        We were inspired to make this website when looking back through Srava history and seeing all these runs that were only half-remembered. Strava shows the route but it doesn't show the memory of what it was like to be out there on that run. We wanted a way to record the impressions and feelings we experienced and store them as a recording that was less stark and cold. So we could not only look back on it, but also stimulate a more intentional relationship with the run in that moment. Instead of just thinking about miles – thinking about what's happening around us on each of those miles. Because if we're thinking about what we'll write about the run afterwards – then naturally it will encourage us to look out for those things.
      </p>
      <p>
        Also, you can look back through umpteen training runs and they all look like the same route - but can contain unique and wildly different experiences that mere GPX points do not capture.
      </p>
      <hr />
      <label className="HelpPointer">Click here to<br /> set up a profile.<div className="Arrow Up"></div></label>
    </div>
  )
}

// <p>
//   I was inspired to make this website as I looked back through my Strava history and saw all these runs that I could only half-remember. Strava showed me the route but it didn't show me the memory of what it was actually like to be out there on that run. So I wanted a way to record the impressions and feelings I experienced and store them as a less stark and cold interpretation. So I could not only look back on it, but also stimulate a more intentional relationship with the run in the moment. Instead of just thinking about miles – think about what's happening around me on each of those miles. Because if I'm thinking about what I'll write about the run afterwards – then naturally it will encourage me to look for those things.
// </p>

export default Intro
