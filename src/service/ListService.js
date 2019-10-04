import { ajax } from '../common/Ajax';

export const getLists = async () => {
  return ajax('api/listing/list?asXhr=true');
};
