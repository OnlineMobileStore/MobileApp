import axios from 'axios'
import { createUrl } from '../util'

export async function getAllProducts() {
  try {
    const url = createUrl(`product/getAll`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
