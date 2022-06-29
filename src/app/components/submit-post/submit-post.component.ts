import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submit-post',
  templateUrl: './submit-post.component.html',
  styleUrls: ['./submit-post.component.css'],
})
export class SubmitPostComponent implements OnInit {
  createPostForm: FormGroup;
  postId: string | undefined;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router // use this to navigate to the post page
  ) {
    this.createPostForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      subreddit: new FormControl('', [Validators.required]),
    });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // refreshes page on route change
  }

  ngOnInit(): void {}

  createPost(form: FormGroup) {
    console.log(
      form.value.title,
      form.value.content,
      'G1qTAh6kRC13yW5hU1Sja',
      'test_user',
      'WjMoMZDbZRehWelzpusm1',
      form.value.subreddit
    );

    // lipat dito yung routerLink
    this.postsService
      .createPost(
        form.value.title,
        form.value.content,
        'G1qTAh6kRC13yW5hU1Sja',
        'test_user',
        'WjMoMZDbZRehWelzpusm1',
        form.value.subreddit
      )
      .subscribe((res: any) => {
        this.postId = res.Id;
        console.log("YOYOYO", this.postId);
      });
  }
}
