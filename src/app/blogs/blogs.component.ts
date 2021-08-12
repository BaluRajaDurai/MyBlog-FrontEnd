import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MyblogService } from '../services/myblog.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogId:any;

  blogDetails:any;
  imageArray: any;

  constructor(
    private BlogService : MyblogService,
    private router:Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('data');
    console.log(this.blogId);

    this.BlogService.getBlogById(this.blogId).subscribe((res)=>{
      if(res){
        this.blogDetails = res;
        console.log("blog:",this.blogDetails);
      }
    })
  }

  onBackClick(){
    this.router.navigate(['myblogs']);
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
