/*
 * This utility exists to paper over some oddity with how fetch() handles errors and responses. For instance, one might be tempted to think that a bad
 * response (like a 5XX) would be treated as errors. However, they are not; you have to explicitly check this in the result and implement your own
 * handling. So we write a handleResponse function that can return the promise or reject depending on the state of the response.
 */

var handleResponse = (response) => {
  return response.json().then((json) => {
    if(response.ok) { // TODO: handle 3XX responses
      return json;
    } else {
      return Promise.reject({res: response, error: json});
    }
  });
}

export const ajax = async (requestUrl, data) => {
  var url = new URL(requestUrl, 'http://localhost:3000'); //TODO: make this less dumb...
  url.searchParams.set('asXhr', 'true');
  return fetch(url.toString(), data)
    .then(handleResponse);
};
