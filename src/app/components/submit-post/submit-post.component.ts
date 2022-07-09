import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Subreddit } from 'src/app/models/subreddit.model';

@Component({
  selector: 'app-submit-post',
  templateUrl: './submit-post.component.html',
  styleUrls: ['./submit-post.component.css'],
})
export class SubmitPostComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router, // use this to navigate to the post page
    private _auth: AuthService
  ) {
    this.createPostForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      subreddit: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  createPostForm: FormGroup;
  postId?: string;
  user?: User = this._auth.loggedInUser;
  @Input() selectedSubreddit?: Subreddit;

  createPost(form: FormGroup) {
    if (this.user && this.selectedSubreddit) {
      form.value.subreddit = this.selectedSubreddit.name;
      this.postsService
        .createPost(
          form.value.title,
          form.value.content,
          this.user.id,
          this.user.username,
          form.value.subreddit
        )
        .subscribe((res: any) => {
          this.postId = res.id;
          this.router.navigate(['/s', form.value.subreddit, res.id]);
        });
    }
  }

  setSubreddit(subreddit: Subreddit) {
    this.selectedSubreddit = subreddit;
  }

  clearSubreddit() {
    this.selectedSubreddit = undefined;
  }
}
