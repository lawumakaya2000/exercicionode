const express = require("express")
const app = express()
const mongoose = require("mongoose")
const Task = require("./modelo/task")


mongoose.connect("mongodb://localhost/tarefa", {useNewUrlParser:true, useUnifiedTopology: true})

app.use(express.json())

app.get("/", (req, res)  => {
    res.send("ola lawu")
})

app.get("/task", async ( req , res) => {
    const task = await Task.find({})
    res.status(200).json({task})
})

app.post("/task", async (req, res, next) => {
    req.Task = new Task
    next()
}, salvarEeditar())

app.put("/:id", async (req, res, next) => {
    req.Task = await Task.findById(req.params.id)
    next()
}, salvarEeditar())

app.delete("/:id", async (req, res) => {
    req.Task = await Task.findByIdAndDelete(req.params.id)
    res.status(200).send("tarefa excluida com sucesso")
})





function salvarEeditar() {
    return async (req, res) => {
        let Task = req.Task
        Task.descricao = req.body.descricao
        Task.feito = req.body.feito
        try {
            const salvar = Task.save()
            res.status(200).send("tarefa salva com sucesso")
        } catch(err) {
            res.status(500).send("opa deu erro")
        }
    }
}



const port = 400
app.listen(port, () => {

    console.log (`servidor rodando na porta ${port}`)
})