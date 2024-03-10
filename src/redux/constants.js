import md5 from "md5";

export const apiURL = "https://api.valantis.store:41000/";
export const apiKey = "Valantis";

export const timestamp = new Date()
  .toISOString()
  .split("T")[0]
  .replace(/-/g, "");
export const authString = md5(`${apiKey}_${timestamp}`);
export const limit = 50;
