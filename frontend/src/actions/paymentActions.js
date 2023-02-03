import axios from "axios";
export const paymentRequest = async (amount, url) => {
  try {
    const { data } = await axios.post("/api/payment/request", {
      amount,
      url,
    });
    console.log("authority", data.authority);
    return { authority: data.authority };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const paymentVerify = async (amount, authority) => {
  try {
    const { data } = await axios.get(
      `/api/payment/verification/${amount}/${authority}`
    );

    return { paymentId: data.paymentId };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};

export const payOrder = async (orderId, paymentId) => {
  try {
    const { data } = await axios.put(`/api/orders/${orderId}/pay`, {
      paymentId,
    });
    return { order: data.order };
  } catch (error) {
    return {
      error:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    };
  }
};
