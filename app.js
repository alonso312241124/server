require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 80;
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send("Bienvenido a mi aplicación web");
});

app.post('/factorial', (req, res) => {
    const numero = req.body.numero;
    if(numero === undefined || isNaN(numero)){
        return res.status(400).send("Número no válido");
    }

    const factorial = (n) => {
        if(n === 0) return 1;
        return n * factorial(n - 1);
    }

    const resultado = factorial(Number(numero));
    res.send(`El factorial de ${numero} es ${resultado}`);
})

app.post('/saludo', (req, res) => {
    const nombre = req.body.nombre || 'invitado';
    const pass = req.body.pass || '1234';
    res.send("Hola " + nombre + " " + pass);
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log(`Servidor escuchando por el puerto ${port}`);
});
