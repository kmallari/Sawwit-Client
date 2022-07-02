import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { Subject } from 'rxjs';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { Subreddit } from 'src/app/models/subreddit.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  showSearchResults: boolean = false;
  inside: boolean = false;
  private searchTerms = new Subject<string>();
  @Input() fromNavbar: boolean = false;
  @Output() onSetSubreddit: EventEmitter<Subreddit> =
    new EventEmitter<Subreddit>();
  searchedSubreddits: Subreddit[] = [];
  selectedSubreddit?: Subreddit;
  placeHolder: string = 'Search subreddits';

  constructor(
    private _subredditsService: SubredditsService,
    private _router: Router
  ) {}

  @HostListener('click')
  clicked() {
    this.inside = true;
  }

  @HostListener('document:click')
  clickedOut() {
    this.showSearchResults = this.inside ? true : false;
    this.inside = false;
  }

  search(term: string): void {
    if (!this.showSearchResults) {
      this.showSearchResults = true;
    }
    this.searchTerms.next(term);
  }

  getSearched(term: string): void {
    this._subredditsService.searchSubreddit(term).subscribe((subreddits) => {
      this.searchedSubreddits = subreddits;
      // console.log('SEARCHED SUBREDDITS', this.searchedSubreddits);
    });
  }

  onClick(subreddit: string): void {
    if (this.fromNavbar) {
      this._router.navigate(['/s/' + subreddit]);
      this.searchTerms.next('');
    } else {
      this.selectedSubreddit = this.searchedSubreddits.find(
        (sub) => sub.name === subreddit
      );
      this.onSetSubreddit.emit(this.selectedSubreddit);
      this.searchTerms.next('');
    }
  }

  clearSelectedSubreddit(): void {
    this.selectedSubreddit = undefined;
  }

  ngOnInit(): void {
    if (!this.fromNavbar) {
      this.placeHolder = 'Where would you like to post?';
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
