import axios from 'axios'
import { createUrl } from '../util'


export const placeOrder = async (orderData) => {
  try {
    const url = createUrl(`orders/place`)
    const response = await axios.post(url,orderData)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getAllCustomersOrders = async () => {
  try {
    const url = createUrl(`orders/all-customer-orders`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const changeOrderStatus = async (orderId,newStatus) => {
  try {
    const url = createUrl(`orders/update-status/${orderId}`)
    const response = await axios.put(
        url,
        { status: newStatus },
        { headers: { "Content-Type": "application/json" } }
      );
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getOrderDetails = async (customerId) => {
  try {
    const url = createUrl(`orders/customer/${customerId}`)
    const response = await axios.get(url);
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};




