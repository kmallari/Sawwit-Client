import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitPostComponent } from './components/submit-post/submit-post.component';
import { FeedContainerComponent } from './components/feed-container/feed-container.component';
import { PostComponent } from './components/post/post.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';
import { UserComponent } from './components/user/user.component';
import { UpdateUserProfileComponent } from './components/update-user-profile/update-user-profile.component';
import { UpdateSubredditComponent } from './components/update-subreddit/update-subreddit.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FeedContainerComponent },
  { path: 'submit', component: SubmitPostComponent },
  { path: 's/:subreddit', component: SubredditComponent },
  { path: 's/:subreddit/update', component: UpdateSubredditComponent },
  { path: 's/:subreddit/:postId', component: PostComponent },
  { path: 'u/:userId', component: UserComponent },
  { path: 'u/:userId/update', component: UpdateUserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
