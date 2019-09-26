var handleResponse = (response) => {
  return response.json().then((json) => {
    if(response.ok) {
      return json;
    } else {
      return Promise.reject({res: response, json: json});
    }
  });
}

class Ajax {
  static fetchAjax(requestUrl, data) {
    var url = new URL(requestUrl, 'http://localhost:3000'); //TODO: make this less dumb...
    url.searchParams.set('asXhr', 'true');
    return fetch(url.toString(), data)
      .then(handleResponse); 
  }
}

export default Ajax;
