import axios from 'axios'
import { createUrl } from '../util'


export const sendOTP = async (email) => {
  try {
    const url = createUrl(`otp/send`)
    const response = await axios.post(url,{email})
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const verifyOTP = async (email,otp) => {
    try {
      const url = createUrl(`otp/verify`)
      const response = await axios.post(url,{email,otp})
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  };
