export interface MetaDataPage {
  total: number;
  perPage: number;
  currentPage: number;
  lasPage: number;
  firstPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface Page<Data> {
  meta: MetaDataPage;
  data: Data[];
}
