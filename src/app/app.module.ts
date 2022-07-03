import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { SidebarRightComponent } from './components/sidebar-right/sidebar-right.component';
// import { LoginComponent } from './components/login/login.component';
// import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { FeedContainerComponent } from './components/feed-container/feed-container.component';
import { SubmitPostComponent } from './components/submit-post/submit-post.component';
import { AutosizeModule } from 'ngx-autosize';
import { PostComponent } from './components/post/post.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';
import { UserComponent } from './components/user/user.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CommentsContainerComponent } from './components/comments-container/comments-container.component';
import { CommentComponent } from './components/comment/comment.component';
import { AuthModule } from './auth/auth/auth.module';
import { CookieService } from 'ngx-cookie-service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MakeCommentComponent } from './components/make-comment/make-comment.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarLeftComponent,
    SidebarRightComponent,
    // LoginComponent,
    // SignupComponent,
    PostsListComponent,
    PostCardComponent,
    FeedContainerComponent,
    SubmitPostComponent,
    PostComponent,
    SubredditComponent,
    UserComponent,
    CommentsContainerComponent,
    CommentComponent,
    SearchBarComponent,
    FooterComponent,
    MakeCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AutosizeModule,
    CKEditorModule,
    AuthModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
