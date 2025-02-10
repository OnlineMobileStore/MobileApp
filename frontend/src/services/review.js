import axios from 'axios'
import { createUrl } from '../util'

export const getReviewsOfProduct = async (productId) => {
  try {
    const url = createUrl(`reviews/product/${productId}`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getAvgRating = async (productId) => {
    try {
      const url = createUrl(`reviews/rating-stats/${productId}`)
      const response = await axios.get(url)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  };

//   get("http://localhost:8080/product/with-ratings")

export const getProductWithRating = async () => {
    try {
      const url = createUrl(`reviews/with-ratings`)
      const response = await axios.get(url)
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  };
