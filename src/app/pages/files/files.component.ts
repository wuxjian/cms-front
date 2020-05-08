import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../config/app-config';
import {merge, Observable, Observer} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent implements OnInit, AfterViewInit {
  data: Assets[] = [];

  length = 0;

  constructor(private http: HttpClient) {
  }

  displayedColumns: string[] = ['index', 'fileName', 'isImage', 'tinyFilePath', 'cdnPath'];
  // dataSource = new MatTableDataSource<Assets>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;

  }

  ngAfterViewInit() {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.getAssetsPage(this.paginator.pageIndex + 1, this.paginator.pageSize);
        }),
        map(res => {
          // Flip flag to show that loading has finished.
          this.length = res.data.totalRecord;

          return res.data.list;
        }),
        catchError(() => {
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          return [];
        })
      ).subscribe(data => {
        this.data = data;
      }
    );
  }

  getAssetsPage(pageSize: number, pageIndex: number): Observable<any> {
    const baseUrl = AppConfig.baseUrl;
    return this.http.post<any>(`${baseUrl}/assets/page`, {currentPage: pageIndex, pageSize});
  }

}

export interface Assets {
  index: number;
  fileName: string;
  isImage: number;
  tinyFilePath: number;
  cdnPath: string;
}

