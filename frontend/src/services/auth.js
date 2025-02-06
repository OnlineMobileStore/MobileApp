import axios from 'axios'
import { createUrl } from '../util'

export async function signup(UserData) {
  try {
    const url = createUrl('auth/register-customer')
    const response = await axios.post(url, UserData)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function signinCustomer(email, password) {
  try {
    const body = { email, password }
    const url = createUrl('auth/login-customer')
    const response = await axios.post(url, body)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function signinAdmin(email, password) {
    try {
      const body = { email, password }
      const url = createUrl('auth/login-admin')
      const response = await axios.post(url, body)
      return response.data
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }
