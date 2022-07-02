import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  posts: Post[] = [];
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUserPosts();
  }

  getUserPosts = () => {
    const userId = String(this.route.snapshot.paramMap.get('userId'));
    this.postsService.getUserPosts(userId).subscribe((posts) => {
      this.posts = posts;
      // console.log('THIS POSTS', this.posts);
    });
  };
}
