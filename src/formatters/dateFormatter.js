const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

const monthsAbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul",
            "Aug","Sept","Oct","Nov","Dec"];

const days = ['Sun', 'Mon', 'Tues', 'Weds', 'Thurs', 'Fri', 'Sat']

// = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const exported = {
  modern : input => {
    const rawDateObj = new Date(input);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth()+1, day: rawDateObj.getDate()}

    const formattedDate = rawDate.year + '-' + (rawDate.month.toString().length>1?'':'0')  + rawDate.month + '-' + (rawDate.day.toString().length>1?'':'0') + rawDate.day;

    return formattedDate;
  } , traditional : input => {
    const rawDateObj = new Date(input);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${rawDate.day}${dayth} ${months[rawDate.month]} '${rawDate.year.toString().slice(2)}`;

    return formattedDate;
  } , traditionalWithDay : input => {
    const rawDateObj = new Date(input);

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const formattedDate = `${days[rawDateObj.getDay()]} ${rawDate.day}${dayth} ${months[rawDate.month]} '${rawDate.year.toString().slice(2)}`;

    return formattedDate;
  } , week : (input, input2) => {
    const rawDateObj = new Date(input);

    const datePlus6 = new Date(input2)

    const rawDate = {year: rawDateObj.getFullYear(), month: rawDateObj.getMonth(), day: rawDateObj.getDate()}

    const rawDate6 = {year: datePlus6.getFullYear(), month: datePlus6.getMonth(), day: datePlus6.getDate()}

    const dayth = [1||11||21||31].some(x=>x===rawDate.day) ? 'st' : [2||12||22].some(x=>x===rawDate.day) ? 'nd' : 'th';

    const dayth6 = [1||11||21||31].some(x=>x===rawDate6.day) ? 'st' : [2||12||22].some(x=>x===rawDate6.day) ? 'nd' : 'th';

    const formattedDate = `${rawDate.day}${dayth} ${rawDate.month!==rawDate6.month?monthsAbr[rawDate.month]:''}${rawDate.year!==rawDate6.year?(" '"+rawDate.year.toString().slice(2)):''} - ${rawDate6.day}${dayth6} ${monthsAbr[rawDate6.month]} ${"'"+rawDate6.year.toString().slice(2)}`;

    return formattedDate;
  }
}

export default exported
