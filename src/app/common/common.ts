export class Result<T> {
  code: number;
  msg: string;
  data: T;
}

export class Page<T> {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalRecord: number;
  list: Array<T>;
}
