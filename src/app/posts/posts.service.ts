import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { Subject } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators'

@Injectable({
    providedIn:'root'
})
export class PostService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    constructor(private http:HttpClient){}

    getPosts() {
        this.http.get<{message:string,posts:any}>
        ('http://localhost:3000/api/posts')
        .pipe(map((postData)=>{
            return postData.posts.map((post: { title: any; content: any; _id: any; })=>{
                return {
                    title: post.title,
                    conten: post.content,
                    id: post._id
                }
            });
        }))
        .subscribe((transformedPosts)=>{
            this.posts=transformedPosts;
            this.postsUpdated.next([...this.posts])
        });
    }

    getPostUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    deletePost(postId:string){
        this.http.delete<{message:string}>
        ('http://localhost:3000/api/posts/' + postId)
        .subscribe((posts)=>{
            const updatedPosts = this.posts.filter(post => post.id !== postId)
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts])
        });
    }

    getPost(id: string){
        return {...this.posts.find(p=>p.id==id)}
    }

    addPost(title:string,content:string){
        const post: Post = {id:'asd',title:title,content:content};
        this.http.post<{message:string}>
        ('http://localhost:3000/api/posts',post)
        .subscribe((postData)=>{
            console.log(post)
            this.posts.push(post)
            this.postsUpdated.next([...this.posts])
        });
    }
}
