import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models/post.model';
@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css'],
})
export class PostsListComponent implements OnInit {
  @Input() posts: Post[] = [];
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}
}
