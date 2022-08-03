const months = ["January","February","March","April","May","June","July",
      "August","September","October","November","December"];

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
  }
}

export default exported
