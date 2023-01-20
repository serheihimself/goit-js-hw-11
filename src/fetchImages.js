import axios from "axios";

export const fetchImages = async (name, pageNum) => {
  const url = "https://pixabay.com/api/";
  const key = "32953122-2dcf40f65e2637fc605cd2cf8";

  try {
    const getResponse = await axios.get(`${url}?key=${key}&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNum}`)
    return getResponse.data;
  } catch(error) {
    console.log('Error:' + error);
  }
}