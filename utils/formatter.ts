

export function dateToText(date:number){
    let dateParse = new Date(date * 1000);
    return dateParse.getFullYear() + '-' + (dateParse.getMonth() > 8 ? (dateParse.getMonth()+1) : "0"+ (dateParse.getMonth()+1) )+ "-" +  (dateParse.getDate() > 9 ? dateParse.getDate() : "0" + dateParse.getDate());
}