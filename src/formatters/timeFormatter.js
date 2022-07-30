const exported = {
  fromSeconds : input => {
    let output


    let seconds = input % 60
    let minutes = input - seconds
    minutes = minutes / 60
    minutes = minutes % 60
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    let hours = Math.floor(input / 3600)


    output = `${hours}:${minutes}:${seconds}`


    return output
  }
}

export default exported
