const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require("mongoose")
const Post = require('./models/post')
mongoose.connect("mongodb+srv://ujwal:ZH83UN9qfL1GpHm4@cluster0.a2hql.mongodb.net/posts?retryWrites=true&w=majority").then(()=>{
    console.log('connected to database')
}).catch(()=>{
    console.log('failed to database')
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods',
    "GET,POST,PATCH,DELETE,OPTIONS")
    next();
})

app.get('/api/posts',(req,res,next)=>{
    Post.find().then(documents=>{
        res.status(200).json({
            message:'Posts fetched successfully',
            posts:documents
        })
    }).catch(()=>{

    })
})

app.post("/api/posts",(req,res,next)=>{
    const post = new Post(({
        title: req.body.title,
        content: req.body.content
    }));
    console.log(post)
    post.save();
    res.status(201).json({
        message:'post added succefully',
    })
});

app.delete("/api/posts/:id",(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(result=>{
        res.status(201).json({
            message:'post added succefully',
        })
    })
});

module.exports = app;