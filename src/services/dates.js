
const month_names = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
const monthsAbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
// const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];



const addZero = (input) => {

  let output = input.toString()

  return (output.length < 2) ? '0' + output : output
}

const monthName = (monthNumber) => {

    const output = month_names[monthNumber]

    return output

}

const simpleDate = (input) => {

  let d = new Date(input)

  const output = `${addZero(d.getDate())}-${addZero(d.getMonth()+1)}-${d.getFullYear().toString().slice(2)}`

  return output

}

const simpleDateTrad = (input) => {

  let d = new Date(input)

  const output = `${d.getDate()} ${monthsAbr[d.getMonth()]} '${d.getFullYear().toString().slice(2)}`

  return output

}

const fullDateTrad = (input) => {

  let d = new Date(input)

  let date_th
  if (d.getDate() === '1' || d.getDate() === '21' || d.getDate() === '31') {
    date_th = 'st'
  } else if (d.getDate() === '2' || d.getDate() === '22') {
    date_th = 'nd'
  } else if (d.getDate() === '3' || d.getDate() === '23') {
    date_th = 'rd'
  } else {
    date_th = 'th'
  }

  const output = <span>{d.getDate()}<sup>{date_th}</sup> {month_names[d.getMonth()]} '{d.getFullYear().toString().slice(2)}</span>

  return output

}

const exported = { monthName , simpleDate , simpleDateTrad, fullDateTrad }

export default exported
