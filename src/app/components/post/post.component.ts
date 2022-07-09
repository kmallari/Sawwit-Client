import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { Subreddit } from 'src/app/models/subreddit.model';
import { PostsService } from 'src/app/services/posts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  subredditInfo: Subreddit | null = null;
  postData: Post | null = null;
  comments: Comment[] = [];
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const postId = String(this.route.snapshot.paramMap.get('postId'));
    this.getPostInfo(postId);

    // magswitchmap para makuha yung cached comments
  }

  getPostInfo(id: string): void {
    this.postsService.getPost(id).subscribe((data) => {
      this.postData = data;
      // console.log(this.postData);
    });
  }
}
