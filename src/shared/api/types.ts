export enum ACTION_NAMES {
  getIds = 'get_ids',
  getItems = 'get_items',
  getFields = 'get_fields',
  filter= 'filter'
}

export interface BodyType<T> {
  action: ACTION_NAMES;
  params: {
    [key: string]: T;
  };
}
 