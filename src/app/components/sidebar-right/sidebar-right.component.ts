import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subreddit } from 'src/app/models/subreddit.model';
import { SubredditsService } from 'src/app/services/subreddits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css'],
})
export class SidebarRightComponent implements OnInit {
  createSubredditForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _subredditsService: SubredditsService,
    private _router: Router
  ) {
    this.createSubredditForm = this.fb.group({
      subreddit: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  createSubreddit(form: FormGroup) {
    console.log('test?');
    this._subredditsService
      .createSubreddit(form.value.subreddit, form.value.description)
      .subscribe((res: Subreddit) => {
        console.log(res);
        this._router.navigate(['/s/' + res.name]);
      });
  }
}
