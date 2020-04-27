

export const timeFormat =(time)=>{
    let date = new Date(time);

    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();

    let hou = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    hou = hou < 10 ? `0${hou}` : hou;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;

    return `${year}年${month}月${day}日  ${hou}:${min}:${sec}`
};