import Ajax from '../common/Ajax';

export const getLists = async () => {
  return Ajax.fetchAjax('api/listing/list?asXhr=true');
};
