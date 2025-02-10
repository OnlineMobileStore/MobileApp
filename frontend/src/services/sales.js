import axios from "axios";
import { createUrl } from "../util";

export const getSalesDetails = async () => {
  try {
    const url = createUrl("sales/details");
    const response = await axios.get(url);
    return response;
  } catch (ex) {
    return { status: "error", error: ex };
  }
};
