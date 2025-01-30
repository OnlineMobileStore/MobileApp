import axios from 'axios'
import { createUrl } from '../util'

export async function signup(firstName, lastName, email, password, phone, address,city,state,zip,country) {
  try {
    const body = {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,city,state,zip,country
    }

    const url = createUrl('auth/register-customer')
    const response = await axios.post(url, body)
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
