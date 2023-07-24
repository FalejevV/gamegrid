

export function dateToText(date:Date){
    let dateParse = new Date(date);
    return dateParse.getFullYear() + '-' + (dateParse.getMonth() > 8 ? (dateParse.getMonth()+1) : "0"+ (dateParse.getMonth()+1) )+ "-" +  (dateParse.getDate() > 9 ? dateParse.getDate() : "0" + dateParse.getDate());
}