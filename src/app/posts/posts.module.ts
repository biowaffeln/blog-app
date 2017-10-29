import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewPostsComponent } from './view-posts/view-posts.component';
import { ManagePostsComponent } from './manage-posts/manage-posts.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from './shared/post.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [
    ViewPostsComponent, ManagePostsComponent
  ],
  declarations: [ViewPostsComponent, ManagePostsComponent],
  providers: [PostService]
})
export class PostsModule { }
