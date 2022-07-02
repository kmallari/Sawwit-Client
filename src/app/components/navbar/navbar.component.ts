import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { Subject } from 'rxjs';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { Subreddit } from 'src/app/models/subreddit.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  user?: User;
  private searchTerms = new Subject<string>();
  showSearch: boolean = false;
  searchedSubreddits: Subreddit[] = [];
  constructor(
    private router: Router,
    private _auth: AuthService,
    private _userService: UsersService,
    private _subredditsService: SubredditsService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false; // refreshes page on route change
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

  isUserLogin() {
    if (this._auth.getUserDetails() != null) {
      this.isLogin = true;
    }
  }

  logout() {
    this._auth.clearStorage();
    this.router.navigate(['/']);
    window.location.reload();
  }

  ngOnInit(): void {
    this.isUserLogin();
    if (this.isLogin) {
      this.user = this._auth.getUserDetails();
    }
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
  }
}
