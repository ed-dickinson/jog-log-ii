
const month_names = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];
const monthsAbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
const day_names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

const monthName = (monthNumber) => {

    const output = month_names[monthNumber]

    return output

}

const exported = { monthName }

export default exported
