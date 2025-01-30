import axios from 'axios'
import { createUrl } from '../util'

export async function getAdminDetails(adminId) {
  try {
    const url = createUrl(`admin/getById/${adminId}`)
    const response = await axios.get(url)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function editProfile(adminId,adminDetails) {
  try {
    const url = createUrl(`admin/updateAdmin/${adminId}`)
    const response = await axios.put(url, adminDetails,{ headers: { "Content-Type": "application/json" }})
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
