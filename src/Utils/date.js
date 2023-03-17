
const format = (num) => {
    return num<10 ? '0'+ num : num
}

export const getCurrentDate = () => {
    const curDate = new Date();
    let year = curDate.getFullYear() ;
    //0-11
    let month = format(curDate.getMonth()+1) ;
    // 1-31
    let day = curDate.getDate() ;
    // 0-23
    let hours = format(curDate.getHours()) ;
    // 0-59
    let min = format(curDate.getMinutes());
    // 0-59
    let sec = format(curDate.getSeconds() + 1);
    return { year , month , day , hours , min , sec}
}
