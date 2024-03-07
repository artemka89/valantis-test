export enum ACTION_NAMES {
  getIds = 'get_ids',
  getItems = 'get_items',
  getFields = 'get_fields',
  filter = 'filter',
}

export enum PARAM_NAMES {
  offset = 'offset',
  limit = 'limit',
  field = 'field',
  ids = 'ids',
  product = 'product',
  price = 'price',
  brand = 'brand',
}

export interface BodyType<T> {
  action: ACTION_NAMES;
  params: {
    [key in PARAM_NAMES]?: T;
  };
}
