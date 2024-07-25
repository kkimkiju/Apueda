import axios from "axios";
import { SiNamecheap } from "react-icons/si";
import AxiosInstance from "./AxiosInstance";

const Apueda_Domain = "";

const PaymentApi = {
  // 결재내역 저장
  savePaymentHistory: async (
    buyer_email,
    amount,
    paymentStatus,
    transactionId,
    paymentDate,
    name
  ) => {
    const savePaymentHistory = {
      user: buyer_email,
      name: name,
      paymentDate: paymentDate,
      paymentStatus: paymentStatus,
      transactionId: transactionId,
      amount: amount,
    };
    return await AxiosInstance.post("/payments/save", savePaymentHistory);
  },
  // 결재정보저장
  savePaymentinfo: async (
    buyer_email,
    paymentMethodCode,
    paymentDetails,

    isDeleted
  ) => {
    const savePaymentinfo = {
      user: buyer_email,
      paymentMethodCode: paymentMethodCode,
      paymentDetails: paymentDetails,
    };
    return await AxiosInstance.post("/payments/info", savePaymentinfo);
  },
  // 구독 상태 및 빌링키 저장
  requestBillingKey: async (
    buyer_email,
    transactionId,
    paymentDate,
    createdAt,
    validUntil,
    merchant_uid,
    customerUid,
    status
  ) => {
    const requestBillingKey = {
      user: buyer_email,
      transactionId: transactionId,
      paymentDate: paymentDate,
      customerUid: customerUid,
      createdAt: createdAt,
      validUntil: validUntil,
      merchantuid: merchant_uid,
      status: status,
      billingKeyCreatedAt: paymentDate,
    };
    return await AxiosInstance.post(
      "/payments/subscriptions",
      requestBillingKey
    );
  // 예약해지, 재구독
  },
  unsavesub: async (status, member) => {
    const unsavesub = {
      status: status,
      customerUid: member,
    };
    return await AxiosInstance.post("/payments/unsubscriptions", unsavesub);
  },

  // 결재내역 출력
  historyList: async (member, page, size) => {
    return await AxiosInstance.get(`/payments/detail/${member}`, {
      params: {
        page: page,
        size: size,
      },
    });
  },
  // 구독일 출력
  deadline: async (member) => {
    return await AxiosInstance.get(`/payments/deadline/${member}`, {
      params: {
        member,
      },
    });
  },
};

export default PaymentApi;
