import {MatPaginatorIntl} from '@angular/material/paginator';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatPaginatorIntlCro extends MatPaginatorIntl {
  firstPageLabel = '首页';
  lastPageLabel = '尾页';
  itemsPerPageLabel = '每页数量:';
  nextPageLabel = '下一页';
  previousPageLabel = '上一页';
}
