export const fetchImages = async (name, pageNum) => {
    return await fetch(
      `https://pixabay.com/api/?key=32953122-2dcf40f65e2637fc605cd2cf8&q=${name}&orientation=horizontal&safesearch=true&image_type=photo&per_page=40&page=${pageNum}`
    )
      .then(async response => {
        if (!response.ok) {
          if (response.status === 404) {
            return [];
          }
          throw new Error(response.status);
        }
        return await response.json();
      })
      .catch(error => {
        console.error(error);
      });
  };
