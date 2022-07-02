import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { Subreddit } from 'src/app/models/subreddit.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-submit-post',
  templateUrl: './submit-post.component.html',
  styleUrls: ['./submit-post.component.css'],
})
export class SubmitPostComponent implements OnInit {
  createPostForm: FormGroup;
  postId?: string;
  user?: User;
  private searchTerms = new Subject<string>();
  showSearch: boolean = false;
  searchedSubreddits: Subreddit[] = [];

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router, // use this to navigate to the post page
    private _subredditsService: SubredditsService,
    private _auth: AuthService
  ) {
    this.createPostForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      subreddit: new FormControl('', [Validators.required]),
    });
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false; // refreshes page on route change
  }

  getUserInfo() {
    this.user = this._auth.getUserDetails();
  }

  createPost(form: FormGroup) {
    if (this.user)
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

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getSearched(term: string): void {
    if (!this.showSearch) {
      this.showSearch = true;
    }
    this._subredditsService.searchSubreddit(term).subscribe((subreddits) => {
      this.searchedSubreddits = subreddits;
      console.log('SEARCHED SUBREDDITS', this.searchedSubreddits);
    });
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(500),
        // ignore new term if same as previous term
        distinctUntilChanged()
        // switchMap((term: string) => this.movieService.searchMovies(term))
      )
      .subscribe((term) => {
        this.getSearched(term);
      });
    this.getUserInfo();
  }
}
