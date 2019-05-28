const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');	
const path = require('path'); //Esto sirve para unir direcciones o rutas



//INICIALIZACIONES


const app = express();

//SETTINGS

app.set('port', process.env.port||4000);//Aca le digo agarra lo que tenga la variable de entorno
//PORT y si no tiene nada metele al puerto 4000

//__dirname es una constante de nodejs que contiene la direccion de la ruta del archivo global del js
//con el que estoy trabajando actualmente, eso l concateno 'views' mediante el metodo 
//path.join() y ahi establezco la ruta de la carpeta views en app
app.set('views',path.join(__dirname,'views')); //Aca establezco la ruta de la carpeta views
app.engine('.hbs',exphbs({

	defaultLayout: 'main', //aca le digo cual es la plantilla principal
	layoutsDir: path.join(app.get('views'),'layout'), //Defino la ruta de lacapeta layout
	partialsDir:path.join(app.get('views'),'partials'), //defino la direccion de la carpeta partials
	extname: '.hbs', //defino la extension de las plantillas
	//helpers: require('./lib/handlebars')

})); //aca configuro el motor de plantillas

app.set('view engine','.hbs'); //Aca establezco el motor de plantillas


//MIDDLEWARES


app.use(morgan('dev'));

app.use(express.urlencoded({extended:false})); //aca le digo que solo puedo recibir Strings sencillos
//nada de imagenes y eso

app.use(express.json()); //Aca le digo que tmb reciba jsons.

/*app.use((req,res,next)=>{

	next();

});*/



//VARIABLES GLOBALES


//ROUTES

app.use(require('./routes'));
//app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links'));//Aca importo los archivos de routes tanto de autenticacion
//y lo de links, e la importacion de links, le pongo '/links' para dar a entender que si quiero operar
//con links debo anteponer /links/algo en la url para hacer el get,put,post,delete que quiera hacer



//ARCHIVOS PUBLICOS

app.use(express.static(path.join(__dirname,'public')));//Con esto le digo que todo lo relacionado 
//al frontend esta almacenado en public, los css los js y esas bostas

//STARTING SERVER

app.listen(app.get('port'),()=>{

	console.log('Servidor en el puerto',app.get('port'));

});
