import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddblogComponent } from './addblog/addblog.component';
import { BlogmainComponent } from './blogmain/blogmain.component';
import { BlogsComponent } from './blogs/blogs.component';
import { EditblogComponent } from './editblog/editblog.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { MyblogsComponent } from './myblogs/myblogs.component';
import { NavbarComponent } from './navbar/navbar.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'mainpage',
    component: MainpageComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent
  },
  {
    path: 'addblog',
    component: AddblogComponent
  },
  {
    path: 'myblogs',
    component: MyblogsComponent
  },
  {
    path: 'editblog/:id',
    component: EditblogComponent
  },
  {
    path: 'blogs/:data',
    component: BlogsComponent
  },
  {
    path: 'blogmain/:data',
    component: BlogmainComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
