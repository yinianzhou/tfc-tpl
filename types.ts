export type Page = {
  pageSize: number;
  totalPageCount: number;
  totalCount: number;
  pageNo: number;
};
export interface SearchParam {
  [propName: string]: any;
}
