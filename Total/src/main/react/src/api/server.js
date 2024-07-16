import axios from "axios";

const getAccessToken = async () => {
  const response = await axios.post("https://api.iamport.kr/users/getToken", {
    imp_key: "6441713254138051", // 포트원의 REST API 키
    imp_secret:
      "y05rJjyDEsXLg78LiYn0e6XnbqcyzSS4LYfhf7P1MQqCx4s8O1Vpcsm0QUqqzKbU4wKhSFpezSdMaNB2", // 포트원의 REST API 비밀 키
  });
  return response.data.response.access_token;
};

const schedulePayment = async (accessToken, customerUid, schedules) => {
  const response = await axios.post(
    "https://api.iamport.kr/subscribe/payments/schedule",
    {
      customer_uid: customerUid,
      schedules: schedules,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return response.data;
};
