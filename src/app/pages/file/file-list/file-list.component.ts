import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {AppConfig} from '../../../config/app-config';
import {Result} from '../../../common/common';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less']
})
export class FileListComponent implements AfterViewInit {
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  assetsDatabase: AssetsHttpDatabase | null;
  data: Assets[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit() {
    this.assetsDatabase = new AssetsHttpDatabase(this.http);
  }


}

export class AssetsHttpDatabase {
  constructor(private http: HttpClient) {}

  fetchData(page: number, pageSize: number): Observable<Result<Assets>> {
    const baseUrl = AppConfig.baseUrl;
    const requestUrl =
      `${baseUrl}/assets/page`;
    const param = {
      currentPage: page,
      pageSize: page,
    };

    return this.http.post<Result<Assets>>(requestUrl, param);
  }
}

export interface Assets {
  id: number;
  fileName: string;
  isImage: string;
  originalFilePath: string;
  tinyFilePath: string;
  cdnPath: string;
  createdAt: string;
  updatedAt: string;
  enable: string;
}


