var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://127.0.0.1:27017/cursocommerce').then(
        () => {
            console.log("conección éxitosa ");
            app.listen(port,
                () => {
                    console.log("Servidor API REST escuchando por el puerto " + port);
                });
        })
    .catch(
        err => console.log("Error de conección" + err)
    );