import { Component, EventEmitter, OnInit, Output } from "@angular/core"
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";

@Component({
    selector:'app-post-create',
    templateUrl:'./post-create.component.html',
    styleUrls:['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    newPost = ''
    enteredTitle = ''
    enteredContent='';
    private mode = 'create';
    private postId:string | null;
    private post:Post;

    constructor(public postService:PostService, public route: ActivatedRoute){}
    ngOnInit(){
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            if(paramMap.has('postId')) {
                this.mode='edit';
                this.postId = paramMap.get('postId');
                this.post = this.postService.getPost(this.postId)
            }else{
                this.mode='create'
                this.postId = null;
            }
        });
    }

    onPostSave(forms: NgForm){
        if(forms.invalid)
        return
        this.postService.addPost(forms.value.title,forms.value.content)
    }

}