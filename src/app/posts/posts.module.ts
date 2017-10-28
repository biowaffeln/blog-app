import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ViewPostsComponent, ManagePostsComponent
  ],
  declarations: [ViewPostsComponent, ManagePostsComponent]
})
export class PostsModule { }
