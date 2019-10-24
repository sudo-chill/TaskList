/*
 * This utility exists to paper over some oddity with how fetch() handles errors and responses. For instance, one might be tempted to think that a bad
 * response (like a 5XX) would be treated as an error. However, it is not; you have to explicitly check this in the result and implement your own
 * handling. So we write a handleResponse function that can return the promise or reject depending on the state of the response.
 *
 * TODO: this is currently assuming *all* AJAX requests have a JSON response. It's possible some requests may not need a response parsed in JSON, or
 * maybe only cares about unsuccessful responses. It would be nice to make this smart enough to figure out how to deal with that.
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

export const ajax = async (requestUrl, args) => {
  if(!args) {
    args = {};
  }
  if(!args.method) {
    args.method = 'GET';
  }
  var url = new URL(requestUrl, 'http://localhost:3000'); //TODO: make this less dumb...
  url.searchParams.set('asXhr', 'true');
  return fetch(url.toString(), args)
    .then(handleResponse);
};
