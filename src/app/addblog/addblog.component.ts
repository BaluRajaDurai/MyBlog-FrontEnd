import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MyblogService } from '../services/myblog.service';

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {

  imageError: string='';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  imgObj:any;
  imageArray:any = [];
  
  public submitted: boolean = false;

  MyblogService: any;

  public userDetails: any;

  like:number=0;
  dislike:number=0;

  //blogimg:string="data:image/png;base64,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";

  constructor(
    private router: Router,
    private blogdetails: MyblogService,
  ) { }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');

    if (storage) 
    {
      this.userDetails = JSON.parse(storage);
    }
  }

  imgResize(image:any,maxWidth:any,maxHeight:any){
    let width = image.width;
    let height = image.height;
    let newWidth;
    let newHeight;

    if (width > height) {
        newHeight = height * (maxWidth / width);
          newWidth = maxWidth;
    } else {
        newWidth = width * (maxHeight / height);
        newHeight = maxHeight;
    }

    return ({width:newWidth,height:newHeight});
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
        for (let i = 0; i < filesAmount; i++) {
          if (!allowed_types.includes(event.target.files[i].type)) {
            //console.log("check type");
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
          }
          else{
                
                var reader = new FileReader();
    
                reader.onload = (event:any) => {
                  const image = new Image();
                  image.src = event.target.result;
                  image.onload = rs => {
                    this.imgObj = this.imgResize(image,300,300);
                    console.log(this.imgObj);
                    console.log(event.target.result);
                    this.imageArray.push(event.target.result);
                  }
                  this.isImageSaved = true;
                }
   
                reader.readAsDataURL(event.target.files[i]);
              }
        }
    }
  }

  /*fileChangeEvent(fileInput: any) {
    console.log(fileInput.target.files.length);
    this.imageError = '';
    //console.log(fileInput.target.files);
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        //console.log("inside if");
        for(let i=0;i<fileInput.target.files.length;i++){
          const max_size = 20971520;
          const allowed_types = ['image/png', 'image/jpeg','image/jpg'];

          if (fileInput.target.files[i].size > max_size) {
            //console.log('check size');
              this.imageError =
                  'Maximum size allowed is ' + max_size / 1000 + 'Mb';

              return false;
          }

          //console.log(allowed_types.includes(fileInput.target.files[0].type));
          if (!allowed_types.includes(fileInput.target.files[i].type)) {
              //console.log("check type");
              this.imageError = 'Only Images are allowed ( JPG | PNG )';
              return false;
          }
          const reader = new FileReader();
          reader.onload = (e: any) => {
              const image = new Image();
              image.src = e.target.result;
              image.onload = rs => {

                  //console.log(rs);
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  //console.log(this.cardImageBase64);
                  this.isImageSaved = true;
                  this.imageArray.push(this.cardImageBase64);
              };
          };

          reader.readAsDataURL(fileInput.target.files[i]);
          return true;
        }
      }
    return false;
  }
*/
  validate(){ //validation function
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      console.log("Please fill all the fields !!!");
    }
    else{
      this.submitted=true; // successfull page
    }
    form.classList.add('was-validated');
  }

  
  onClickSubmit(data:any) {
    this.validate();

    if(this.imageArray.length>0){
      this.cardImageBase64 += this.imageArray[0];
      for(let i=1;i<this.imageArray.length;i++){
        this.cardImageBase64 += (" " + this.imageArray[i]);
      }
    }

    console.log("Entered name : " + this.userDetails.name);
    console.log("Entered mail : " + this.userDetails.email);
    console.log("Entered photo : " + this.userDetails.photoUrl);
    console.log("Entered like : " + this.like);
    console.log("Entered dislike : " + this.dislike);
    console.log("Entered blogimage : " +this.cardImageBase64);
    console.log("Entered title : " + data.title);
    console.log("Entered description : " + data.des);
    console.log("Entered type : " + data.options);

   
    const mydata = {
      name : this.userDetails.name,
      mail : this.userDetails.email,
      photo : this.userDetails.photoUrl,
      like:this.like,
      dlike:this.dislike,
      blogimg:this.cardImageBase64,
      title : data.title,
      des : data.des,
      type : data.options
    }
    this.blogdetails.create(mydata)
      .subscribe(
        (response: any) => {
          console.log(response);
          
        },
        (error: any) => {
          console.log(error);
        });
  }

}
