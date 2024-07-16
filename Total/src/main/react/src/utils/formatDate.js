// src/utils/dateUtils.js

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString().slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month.toString()}월 ${day.toString()}일`;
};

const formatTimestamp = (timestamp) => {
  const now = new Date();
  const date = new Date(timestamp);
  const diff = Math.abs(now - date);
  const dayInMs = 1000 * 60 * 60 * 24;
  const monthInMs = dayInMs * 30.4375;
  const yearInMs = dayInMs * 365.25;

  if (diff < 1000 * 60) {
    return "방금 전";
  } else if (diff < 1000 * 60 * 60) {
    return `${Math.floor(diff / (1000 * 60))}분 전`;
  } else if (diff < dayInMs) {
    return `${Math.floor(diff / (1000 * 60 * 60))}시간 전`;
  } else if (diff < monthInMs) {
    return `${Math.floor(diff / dayInMs)}일 전`;
  } else if (diff < yearInMs) {
    return `${Math.floor(diff / monthInMs)}달 전`;
  } else {
    return `${Math.floor(diff / yearInMs)}년 전`;
  }
};
// 현재 날짜를 반환하는 함수
function getFormattedDate() {
  const dateObj = new Date();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
}
// 현재 시간을 반환하는 함수
function getCurrentTime() {
  const dateObj = new Date();
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");
  const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  return `T${hours}:${minutes}:${seconds}`;
}
export { formatDate, formatTimestamp, getFormattedDate, getCurrentTime };
