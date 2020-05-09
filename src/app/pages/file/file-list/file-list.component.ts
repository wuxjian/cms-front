import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, startWith, switchMap} from 'rxjs/operators';
import {AppConfig} from '../../../config/app-config';
import {Page, Result} from '../../../common/common';
import {MatDialog} from '@angular/material/dialog';
import {FileAddComponent} from '../file-add/file-add.component';


@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.less'],
  entryComponents: [FileAddComponent],
})
export class FileListComponent implements AfterViewInit {
  displayedColumns: string[] = ['fileName', 'isImage', 'tinyFilePath', 'cdnPath', 'createdAt'];
  assetsDatabase: AssetsHttpDatabase | null;
  data: Assets[] = [];

  resultsLength = 0;
  isLoadingResults = true;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(FileAddComponent, {
      width: '600px',
      height: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngAfterViewInit() {
    this.assetsDatabase = new AssetsHttpDatabase(this.http);
    this.paginator.page.pipe()
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.assetsDatabase!.fetchData(
            this.paginator.pageIndex + 1, this.paginator.pageSize);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.resultsLength = data.data.totalRecord;
          return data.data.list;
        }),
      ).subscribe(data => {
        this.data = data;
      }
    );
  }

}

export class AssetsHttpDatabase {
  constructor(private http: HttpClient) {
  }

  fetchData(page: number, pageSize: number): Observable<Result<Page<Assets>>> {
    const baseUrl = AppConfig.baseUrl;
    const requestUrl = `${baseUrl}/assets/page`;
    const param = {
      currentPage: page,
      pageSize,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return this.http.post<Result<Page<Assets>>>(requestUrl, JSON.stringify(param), httpOptions);
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


