import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../../config/app-config';
import {Result} from '../../../common/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.less']
})
export class FileAddComponent implements OnInit {

  fileToUpload: File = null;

  constructor(public dialogRef: MatDialogRef<FileAddComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: DialogData,
              private _snackBar: MatSnackBar,
              private http: HttpClient,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(file) {
    this.fileToUpload = file[0];
  }

  upload() {
    if (!this.fileToUpload) {
      this._snackBar.open('请选择文件', '', {
        duration: 1000,
        verticalPosition: 'top',
      });
      return;
    }
    const formData = new FormData();
    formData.append('file', this.fileToUpload);
    const baseUrl = AppConfig.baseUrl;
    this.http.post<Result<string>>(`${baseUrl}/assets/upload`, formData)
      .subscribe(res => {
        if (res.code === 0) {
          this._snackBar.open('上传成功', '', {
            duration: 1000,
            verticalPosition: 'top',
          });

          this.dialogRef.close(true);

        }else {
          this._snackBar.open(res.msg, '', {
            duration: 3000,
            verticalPosition: 'top',
          });
        }
      });
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
