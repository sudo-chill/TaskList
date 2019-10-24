import { ajax } from '../common/Ajax';

export const getLists = async () => {
  return ajax('api/listing/list?asXhr=true');
};

export const createItem = async (data) => {
  const args = {data: data, method: 'PUT'};
  return ajax('api/listing/create-item?asXhr=true', args);
}

export const deleteListById = async (id) => {
  const args = {method: 'DELETE'};
  const url = `api/listing/delete-list/${id}?xhr=true`;
  return ajax(url, args);
}
