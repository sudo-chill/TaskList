import { ajax } from '../common/Ajax';

export const getLists = async () => {
  return ajax('api/listing/list?asXhr=true');
};

export const createItem = async(args) => {
  return ajax('api/listing/create-item?asXhr=true', args);
}
