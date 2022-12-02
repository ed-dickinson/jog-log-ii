
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

const exported = { monthName , simpleDate , simpleDateTrad }

export default exported
