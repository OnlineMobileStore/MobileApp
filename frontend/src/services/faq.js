import axios from 'axios'
import { createUrl } from '../util'

export async function postQuestion(questionData) {
  try {
    const url = createUrl(`faqs`)
    const response = await axios.post(url, { question: questionData ,answer:""});
    return response
  } catch (ex) {
    return { status: 'error', error: ex }
  }
}

export async function updateAnswer(id,questionData) {
    try {
      const url = createUrl(`faqs/${id}`)
      const response = await axios.put(url, { question: questionData.question ,answer:questionData.answer});
      return response
    } catch (ex) {
      return { status: 'error', error: ex }
    }
  }

export async function getFAQs() {
    try {
      const url = createUrl("faqs");
      const response = await axios.get(url);
      return response;
    } catch (ex) {
      return { status: "error", error: ex };
    }
  }

