import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyblogService } from '../services/myblog.service';
import { Bmodel } from '../models/bmodel.model'



@Component({
  selector: 'app-editblog',
  templateUrl: './editblog.component.html',
  styleUrls: ['./editblog.component.css']
})
export class EditblogComponent implements OnInit {

 
  currentBlogId:any;
  imageError: string='';
  isImageSaved: boolean = false;
  cardImageBase64: string = '';

  public submitted: boolean = false;

  public userDetails: any;

  public updatedetails : any

  toAddedUpdate : any;

  isSuccess = "false";
  imgObj: any;
  imageArray: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogdetails: MyblogService,
    private http: HttpClient,
    
  ) { }

  onUpdate(data:any){
    console.log(data,this.imageArray);
    this.toAddedUpdate = this.updatedetails;
    this.toAddedUpdate.Title = data.title;
    this.toAddedUpdate.Description = data.des;
    this.toAddedUpdate.Type = data.options;
    if(this.imageArray.length){
      let flag=0;
      if(this.toAddedUpdate.Blogimg==""){
        console.log("empty");
        this.cardImageBase64 += this.imageArray[0];
        for(let i=1;i<this.imageArray.length;i++){
          this.cardImageBase64 += (" " + this.imageArray[i]);
        }
        this.toAddedUpdate.Blogimg = this.cardImageBase64;
      }
      else{
        let imageFromDb = this.toAddedUpdate.Blogimg.split(" ");
        for(let i=0;i<this.imageArray.length;i++){
          if(!imageFromDb.includes(this.imageArray[i])){
            imageFromDb.push(this.imageArray[i]);
            flag++;
          }
        }
        if(flag<=this.imageArray.length){
          this.cardImageBase64 += imageFromDb[0];
          for(let i=1;i<imageFromDb.length;i++){
            this.cardImageBase64 += (" " + imageFromDb[i]);
          }
          this.toAddedUpdate.Blogimg = this.cardImageBase64;
        }
      }
    }
    console.log(this.toAddedUpdate);
    console.log('hello');
    this.blogdetails.update(this.toAddedUpdate).subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.isSuccess = "true";
        this.router.navigate(['myblogs']);
      }
    })
  }

  ngOnInit(): void {

    this.currentBlogId = this.route.snapshot.paramMap.get('id');
    console.log(this.currentBlogId);

    this.blogdetails.onupdate(this.currentBlogId).subscribe((res:any)=>{
      console.log(res);
      this.updatedetails = res;
    })
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

   
  
 

  
  

}
