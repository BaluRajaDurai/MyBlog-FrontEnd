import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bmodel } from '../models/bmodel.model';
import { MyblogService } from '../services/myblog.service';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {

  public userDetails: any;

  public editBlogId: any;

  b_details: Bmodel[] = [];

  public locked: boolean[] = [];

  submitted = false;

  isSuccess = false;
  imageArray: any;



  constructor( private router: Router,
    private route: ActivatedRoute,
    private blogdetails: MyblogService) { }

    retrievedetails(){
      this.blogdetails.getMyitem(this.userDetails.email)
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
          console.log(msg[i]);
          console.log(msg[i]);
        }
      });
    }
    
    set(id:any){
      console.log(id);
      this.blogdetails.delete(id)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.isSuccess = true;
        },
        (error: any) => {
          console.log(error);
        });
        window.setTimeout(function(){location.reload()},1000)
      
    }

    update(id:any){
      console.log(id);
      this.editBlogId = id;
      this.router.navigate(['/editblog',this.editBlogId]);
      //this.router.navigateByUrl('/editblog');
      
    }

    check():boolean {
      if(this.b_details.length>0){
        this.submitted = true;
        return true;
      }
      else
        return false;
    }

    showBlog(data:any){
      this.router.navigate(['blogs',data._id]);
    }

  ngOnInit(): void {
    const storage = localStorage.getItem('google_auth');

    if (storage) 
    {
      this.userDetails = JSON.parse(storage);
    }
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


}


