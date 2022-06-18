const { request } = require('express')
const express = require('express')
const {v4: uuidv4} =require("uuid")
const app = express()

app.use(express.json())

const pacientes = []

//MiddleWare
function verifyExistAccountCPF(request, response, next) {
    const {cpf} = request.params

    const paciente = pacientes.find((paciente) => paciente.cpf === cpf)

    if(!paciente) {
        return response.status(400).json({error:"paciente not found"})
    }
    request.paciente = paciente

    return next()
}

//Rotas do app
app.post("/createPaciente", (request, response) => {
    const {cpf, nome} = request.body
    const id = uuidv4()

    const pacienteAlreadyExist = pacientes.some(
        (paciente) => paciente.cpf === cpf
    )

    if(pacienteAlreadyExist) {
        return response.status(400).json({error: "paciente already exist!"})
    }

    pacientes.push({
        nome,
        cpf, 
        id,
        statement: []
    })

    return response.status(201).send()
})

//App chamando middliware
app.use(verifyExistAccountCPF)

app.get("/consultPaciente/:cpf",  (request, response) => {
    const paciente = request.paciente

    return response.json(paciente.statement)
})

app.post("/addTarefa/:cpf", (request, response) => {
    const {nomeTarefa, descricao, favorite} = request.body
    const {paciente} = request

    
    const statementOperation = {
        nomeTarefa,
        descricao,
        favorite,
        created_at: new Date(),
        
    }
    paciente.statement.push(statementOperation)
    return response.status(201).send()
})

app.listen(3333)