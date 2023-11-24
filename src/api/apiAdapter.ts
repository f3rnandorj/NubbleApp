import {PageApi} from '@api';
import {MetaDataPage, Page} from '@types';

import {MetaDataPageApi} from './apiTypes';

function toMetaDataPage(meta: MetaDataPageApi): MetaDataPage {
  return {
    total: meta.total,
    perPage: meta.per_page,
    currentPage: meta.current_page,
    lasPage: meta.last_page,
    firstPage: meta.first_page,
    hasNextPage: !!meta.next_page_url,
    hasPreviousPage: !!meta.previous_page_url,
  };
}

function toPageModel<ApiType, ModelType>(
  page: PageApi<ApiType>,
  adapterToModel: (api: ApiType) => ModelType,
): Page<ModelType> {
  return {
    data: page.data.map(adapterToModel),
    meta: toMetaDataPage(page.meta),
  };
}

export const apiAdapter = {
  toMetaDataPage,
  toPageModel,
};
