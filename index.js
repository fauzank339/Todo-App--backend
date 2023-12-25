const express = require('express')
const app = express()
const fs = require('fs')
app.use(express.json())




app.get('/todos',(req,res)=>{
    fs.readFile("todos.json","utf-8",(err,data)=>{
        console.log(JSON.parse(data)[0]);

        res.json(JSON.parse(data))
    })
})

app.get('/todos/:id',(req,res)=>{
    let todoId = parseInt(req.params.id);
    let flag = 0
    fs.readFile("todos.json","utf-8",(err,data)=>{
        for (let i=0;i< JSON.parse(data).length;i++){
            if (todoId === JSON.parse(data)[i].id){
                flag+=1
                res.json(JSON.parse(data)[i])
            }
        }
        console.log(flag)
        if(flag==0)
            res.status(404).json("Not Found")
    })
   
})
let count =0 
app.post('/todos',(req,res)=>{
    
    let newTodo = {
        id : ++count,
        title : req.body.title,
        description : req.body.description
    }
    
    // todos.push(newTodo)
    // res.json(todos)    
    fs.readFile("todos.json","utf-8",(err,data)=>{
        let todos = JSON.parse(data)
        todos.push(newTodo)
        fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
            if (err){
                res.json("error")
            }
        })
        res.json(todos)
    })

})
app.put('/todos/:id',(req,res)=>{
    let nid = parseInt(req.params.id)
    // for (let i=0;i<todos.length;i++){
    //     if(nid == todos[i].id){
    //         todos[i].title = req.body.title
    //         todos[i].description = req.body.description
    //         res.json("Updated")
    //     }
    // }

    //res.json("Not Found")
    fs.readFile('todos.json',"utf-8",(err,data)=>{
        let todos = JSON.parse(data)
        let flag = 0
        for(let i=0;i<todos.length;i++){
            if (nid===todos[i].id){
                todos[i].title=req.body.title
                todos[i].description=req.body.description
                flag++
            }
        }
        fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
            if(err)
                res.json(error)
            
        })
        if (flag==0)
            res.json("Not Found")
        else
            res.json("updated")

    })

})

app.delete("/todos/:id",(req,res)=>{
    let nid = parseInt(req.params.id)
    let newArr = []
    let count = 0
    // for (let i=0;i<todos.length;i++){
    //     if(nid == todos[i].id){
    //         count+=1
    //         continue
    //     }
    //     newArr.push(todos[i])
       
        
    // }
    // todos = newArr
    // if(count==0)
    //     res.json("Not Found")
    // else{
    //     res.json(todos)
    // }
    fs.readFile("todos.json","utf-8",(err,data)=>{
        let todos = JSON.parse(data)
        for(let i=0;i<todos.length;i++){
            if(nid===todos[i].id){
                count+=1
                continue
            }
            newArr.push(todos[i])
        }
        todos=newArr
        fs.writeFile("todos.json",JSON.stringify(todos),(err)=>{
            if (err)
                res.json("error")
        })
        if (count==0){
            res.json("Not found")
        }
        else{
            res.json("deleted")
        }
    })
    
    
})





app.listen(3000)