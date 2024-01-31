import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
    selector:"app-post-list",
    templateUrl:"./post-list.component.html",
    styleUrls:["./post-list.component.css"]
})
export class PostList implements OnInit, OnDestroy{
    posts:Post[] = []
    private postSub: Subscription | undefined;

    constructor(public postsService: PostService){}

    ngOnDestroy() {
        this.postSub?.unsubscribe()
    }
    ngOnInit(){
        this.postsService.getPosts();
        this.postSub=this.postsService.getPostUpdateListener()
        .subscribe((posts:Post[])=>{
            this.posts=posts
        });
    }

    onDelete(postId:string){
        this.postsService.deletePost(postId);
    }
}