import axios from 'axios'
import { createUrl } from '../util'

export const addReview = async (productId,customerId,reviewTitle,reviewContent,rating) => {
  try {
    const url = createUrl(`reviews/add`)
    const response = await axios.post(url,{
        productId: productId,
        customerId: customerId,
        title: reviewTitle,
        comment: reviewContent,
        rating: rating
    })
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};


// const response = await axios.post("http://localhost:8080/reviews/add", {
      //   productId: productId,
      //   customerId: customerId,
      //   title: reviewTitle,
      //   comment: reviewContent,
      //   rating: rating,
      // });

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
