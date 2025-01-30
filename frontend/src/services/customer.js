import axios from 'axios'
import { createUrl } from '../util'

export async function getCustomerDetails(customerId) {
  try {
    const url = createUrl(`customers/getById/${customerId}`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function editProfile(customerId,customerDetails) {
  try {
    const url = createUrl(`customers/edit/${customerId}`)
    const response = await axios.put(url, customerDetails,{ headers: { "Content-Type": "application/json" }})
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
