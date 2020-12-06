import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'
import dotenv from 'dotenv'
dotenv.config({path: 'variables.env'})

const app = express()

// Conectar la BBDD
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error) )

// Definir puerto
const port = process.env.PORT || 4000

// Definir host
const host = process.env.HOST || '0.0.0.0'

// Habilitar pug
app.set('view engine','pug')

// Obtener el año actual
app.use((req, res, next) => {
    const year = new Date()

    res.locals.actualYear = year.getFullYear()
    res.locals.nombreSitio = 'Agencia de Viajes'
    return next() // Esta funcion hace que siga cargando las demas lineas y el return fuerza la ejecucion en caso de que no funcione
})

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}))

// Definir la carpeta publica
app.use(express.static('public'))

// Agregar router
app.use('/', router)

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando en el puerto ${port} y el host ${host}`)
})