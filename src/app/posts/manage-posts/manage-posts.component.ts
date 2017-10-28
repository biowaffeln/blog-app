import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-manage-posts',
  templateUrl: './manage-posts.component.html',
  styleUrls: ['./manage-posts.component.css']
})
export class ManagePostsComponent implements OnInit {

  postForm: FormGroup;
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });
    this.posts$ = this.postService.getPosts$();
  }

  save() {
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    this.postService.addPost({ title, content });
    this.postForm.reset();
  }

}
