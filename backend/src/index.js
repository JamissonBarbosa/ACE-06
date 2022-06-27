const { request } = require('express')
const express = require('express')
const {v4: uuidv4} =require("uuid")
const app = express()

app.use(express.json())

const pacientes = []
const clinicas = []

//MiddleWare
function verifyExistAccountCPF(request, response, next) {
    const {cnes} = request.params

    const clinica = clinicas.find((clinica) => clinica.cnes == cnes)

    if(!clinica) {
        return response.status(400).json({error:"clinica not found"})
    }
    request.clinica = clinica

    return next()
}


//Rotas do app
app.post("/createPaciente", (request, response) => {
    const {cpf, nome, favorite} = request.body
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
        favorite, 
        id,
        statement: []
    })

    return response.status(201).send()
})

app.post("/createClinica", (request, response) => {
    const {cnes, nome, cep, cidade, bairro, rua, numero} = request.body
    const id = uuidv4()

    const pacienteAlreadyExist = clinicas.some(
        (clinica) => clinica.cnes === cnes
    )

    if(pacienteAlreadyExist) {
        return response.status(400).json({error: "clinica already exist!"})
    }

    clinicas.push({
        cnes, 
        id,
        nome,
        cep, 
        cidade, 
        bairro, 
        rua, 
        numero
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
        created_at: new Date(),
        
    }
    paciente.statement.push(statementOperation)
    return response.status(201).send()
})

app.put("/updatePaciente/:cpf", (request, response)=>{
    const {name} = request.body
    const {paciente} = request

    paciente.name = name

    //return response.status(201).send()
    return response.json(paciente)
})


app.put("/updateClinica/:cnes", (request, response)=>{
    const {nome, cep, cidade, bairro, rua, numero} = request.body
    const clinica = request.clinica

    clinica.nome = nome
    clinica.cep = cep
    clinica.cidade = cidade,
    clinica.bairro = bairro,
    clinica.rua = rua
    clinica.numero = numero


    //return response.status(201).send()
    return response.json(clinica)
})

app.get("/consultClinica/:cnes",  (request, response) => {
    const clinica = request.clinica
    
    return response.json(clinica)
})

app.listen(3333)