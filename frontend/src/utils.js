import moment from "jalali-moment";

export const convertDate = (date) => {
  const splitedDate = date.split(" ");
  const jalaliDate = moment(splitedDate, "YYYY-MM-DD")
    .locale("fa")
    .format("YYYY/MM/DD"); // 1367/11/04
  return `${jalaliDate}  ${splitedDate[1]}`;
};

export const convertMongoDate = (date) => {
  const splitedDate = date.split("T");
  const jalaliDate = moment(splitedDate, "YYYY-MM-DD")
    .locale("fa")
    .format("YYYY/MM/DD"); // 1367/11/04
  const splitedTime = splitedDate[1].split(":");
  return `${jalaliDate}  ${splitedTime[0]}:${splitedTime[1]}`;
};
