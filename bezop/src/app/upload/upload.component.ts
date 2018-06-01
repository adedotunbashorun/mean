import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';

const uri = 'http://127.0.0.1:8000/api/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploader: FileUploader = new FileUploader({ url: uri });
  attachmentlist: any = [];


  constructor(private router: Router, private user: UserService) {

      this.uploader.onCompleteItem = (item: any, response: any, status: any, hearders: any) => {
          this.attachmentlist.push(JSON.parse(response));
      };
   }

  ngOnInit() {
  }

  download(index) {
    const filename = this.attachmentlist[index].uploadname;
    this.user.DownloadFile(filename)
    .subscribe(
      data => saveAs(data, filename),
      error => console.error(error)
    );
  }


}
