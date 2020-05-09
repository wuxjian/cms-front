import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-file-add',
  templateUrl: './file-add.component.html',
  styleUrls: ['./file-add.component.less']
})
export class FileAddComponent implements OnInit {

  fileToUpload: File = null;

  constructor(public dialogRef: MatDialogRef<FileAddComponent>,
              @Inject(MAT_DIALOG_DATA) public  data: DialogData
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
    alert('upload');
  }

}

export interface DialogData {
  animal: string;
  name: string;
}
