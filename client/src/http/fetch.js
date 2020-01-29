/**
 * @author Osvaldo Carrillo
 * Date: 1/11/2020
 * This function is designed to fetch
 * an API
 * @param {String} http
 * @param {Object} data
 */
const fetchAPI = (http, data) => {
  return fetch(http, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      data
    })
  });
};

export default fetchAPI;
