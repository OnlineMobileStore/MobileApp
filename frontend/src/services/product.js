import axios from 'axios'
import { createUrl } from '../util'

export const addNewBrand = async (brandData) => {
  try {
    const url = createUrl(`brand/addBrand`)
    const response = await axios.post(url,brandData)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};


export async function getAllProducts() {
  try {
    const url = createUrl(`product/getAll`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

// Fetch brands list
export const getBrandsList = async () => {
  try {
    const url = createUrl(`brand/allBrand`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

// Fetch product details by ID
export const getProductById = async (id) => {
  try {
    const url = createUrl(`product/getId/${id}`)
    const response = await axios.get(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const getProductImages = async (id) => {
  try {
    const url = createUrl(`product/${id}/images`)
    const response = await axios.get(url)
    console.log(response.data);
    return response.data
    
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const addNewProduct = async (productData) => {
  try {
    const url = createUrl(`product/addProduct`)
    const response = await axios.post(url,productData)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const url = createUrl(`product/update-product/${id}`)
    const response = await axios.put(url,productData)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};

export const deleteProduct = async (id) => {
  try {
    const url = createUrl(`product/delete-product/${id}`)
    const response = await axios.patch(url)
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
};


export async function getLatestProducts() {
  try {
    const url = createUrl(`product/getLatest`)
    const response = await axios.get(url)
    console.log("result",response);
    return response;
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}
export async function giveAvgRating(productId) {
  try {
    const url = createUrl(`reviews/rating-stats/${productId}`)
    const response = await axios.get(url)
    return response.data
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

