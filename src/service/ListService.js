import { ajax } from '../common/Ajax';

export const getLists = async () => {
  return ajax('api/listing/list?asXhr=true');
};

export const createItem = async (data) => {
  let args = {method: 'PUT'};
  let body = JSON.stringify(data);
  args.body = body;
  let headers = {'Content-Type': 'application/json',
                 'Content-Length': Buffer.byteLength(body)};
  args.headers = headers;
  return ajax('api/listing/create-item?asXhr=true', args);
}

export const createNewList = async (title) => {
  let args = {method: 'PUT'};
  let body = JSON.stringify({title: title});
  args.body = body;
  let headers = {'Content-Type': 'application/json',
                 'Content-Length': Buffer.byteLength(body)};
  args.headers = headers;
  return ajax('api/listing/create?asXhr=true', args);
}

export const deleteListById = async (id) => {
  const args = {method: 'DELETE'};
  const url = `api/listing/delete-list/${id}?xhr=true`;
  return ajax(url, args);
}
