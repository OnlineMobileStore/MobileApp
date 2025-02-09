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



