import { Component, OnInit } from '@angular/core';
import { Bmodel } from '../models/bmodel.model';
import { Router } from '@angular/router';
import { MyblogService } from '../services/myblog.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  mailSent = false;
  verified:boolean;
  message = {
    code: false,
    msg : ''
  };

  public userDetails: any;

  currentBlog : any;
  currentBlogDetails:any;

  public locked: boolean[] = [];

  imageArray: any = [];
  b_details: Bmodel[] = [];

 
  constructor( private router: Router,
    private blogdetails: MyblogService,
    private formBuilder: FormBuilder,
    ) { 
      this.verified = false;

      const storage = localStorage.getItem('google_auth');

      if (storage) 
      {
        this.userDetails = JSON.parse(storage);
      }
    
    }

    retrievedetails(){
      this.blogdetails.getAll()
      .subscribe((msg:Bmodel[])=>{
        for(let i=0;i<msg.length;i++)
        {
          this.b_details.push(msg[i]);
          if(msg[i].Type==='Public')
          {
            this.locked[i]=false;
          }
          if(msg[i].Type==='Private')
          {
            this.locked[i]=true;
          }
        }

        console.log(this.b_details);
      });
    }  

  ngOnInit(): void {
    this.retrievedetails();
  }

  getImage(images:any){
    this.imageArray = images.split(" ");
    console.log(this.imageArray);
    if(this.imageArray[0] === ""){
      return 0;
    }
    return this.imageArray.length;
  }

  checkoutForm = this.formBuilder.group({
    otp: ''
  });

  
  onClickSubmit():void{
    console.log(this.checkoutForm.value);
    if(this.mailSent){
      let reqdata = {
        blogid : this.currentBlog,
        otp : this.checkoutForm.value.otp,
        user : this.userDetails.email
      }
      this.blogdetails.verifyOTP(reqdata).subscribe((res:any)=>{
        if(res['success']){
          this.message.code = true;
          this.message.msg = "OTP verified! You can Close this Window now!";
          this.verified = true;
          window.location.reload();
        }
        else{
          this.message.msg = "Invalid OTP!! Try Again";
          this.verified = true;
        }
      })
    }
    this.checkoutForm.reset();
  }

  doUnlock(data:any){
    this.currentBlog = data._id;
    this.blogdetails.sendEmail(this.userDetails.email).subscribe((res:any)=>{
      if(res['success']){
        this.mailSent = true;
      }
    })
  }

  reload(){
    window.location.reload();
  }

  isPrivateUser(currBlogid:any){
    this.currentBlogDetails = this.b_details[currBlogid];
    return this.currentBlogDetails.privateUsers.includes(this.userDetails.email);
  }

  isCurrentUser(currBlogid:any){
    this.currentBlogDetails = this.b_details[currBlogid];
    return this.userDetails.email === this.currentBlogDetails.Email;
  }

  showBlog(data:any){
    this.router.navigate(['blogmain',data._id]);
  }
}
