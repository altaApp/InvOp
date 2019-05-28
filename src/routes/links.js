const express = require('express');
const router = express.Router();
const suma = require('./suma');
const simplex = require('./simplex');
const SimpleSimplex = require('simple-simplex');
var result;

router.get('/add',(req,res)=>{

	//res.render('links/add',{suma});
	res.render('index',{suma});

})

router.post('/add', (req,res)=>{
	//const {valor1,valor2} = req.body //Almaceno el contenido de req.body en el objeto macheando propiedad a propiedad
	
	var Z1 = req.body.valor_Z1;
	var Z2 = req.body.valor_Z2;
	var Z3 = req.body.valor_Z3;
	
	var R1_1 = req.body.valor1_R1;
	var R1_2 = req.body.valor2_R1;
	var R1_3 = req.body.valor3_R1;
	var R1_I = req.body.independiente_R1;
	
	var R2_1 = req.body.valor1_R2;
	var R2_2 = req.body.valor2_R2;
	var R2_3 = req.body.valor3_R2;
	var R2_I = req.body.independiente_R2;
	
	var R3_1 = req.body.valor1_R3;
	var R3_2 = req.body.valor2_R3;
	var R3_3 = req.body.valor3_R3;
	var R3_I = req.body.independiente_R3;
	
	
	// initialize a solver
	const solver = new SimpleSimplex({
	objective: {
    a: Z1,
    b: Z2,
    c: Z3,
  },
  constraints: [
    {
      namedVector: { a: R1_1, b: R1_2, c: R1_3 },
      constraint: '<=',
      constant: R1_I,
    },
    {
      namedVector: { a: R2_1, b: R2_2, c: R2_3 },
      constraint: '<=',
      constant: R2_I,
    },
    {
      namedVector: { a: R3_1, b: R3_2, c: R3_3 },
      constraint: '<=',
      constant: R3_I,
    },
  ],
  optimizationType: 'max',
});
 
// call the solve method with a method name
var resultado = solver.solve({
  methodName: 'simplex',
});

//resultado = JSON.stringify(resultado);

var {details: { finalTableau: tablafinal, tableaus: tabla, isOptimal: optimo }, solution: {coefficients: {a: a_op, b: b_op, c: c_op}, optimum: punto_optimo}} = resultado

//{"details":{"finalTableau":[[1,1,1,1,0,0,0,100],[1,0,0,-4,1,0,0,80],[20,0,10,-20,0,1,0,1200],[763,0,701,841,0,0,1,84100]],"tableaus":[[[1,1,1,1,0,0,0,100],[5,4,4,0,1,0,0,480],[40,20,30,0,0,1,0,3200],[-78,-841,-140,0,0,0,1,0]]],"isOptimal":true},"solution":{"coefficients":{"a":0,"b":100,"c":0},"optimum":84100}}

console.log(punto_optimo);

//punto_optimo = String(punto_optimo);

res.render('index',{punto_optimo});
	
	
/*	
	console.log(req.body.valor1);
	console.log(req.body.valor2);
	result = suma(req.body.valor1,req.body.valor2);
	console.log(result);
	if(isNaN(result)){
		
		
		res.send(404);
	}
	else{

		res.render('index',{result});
		//res.send(200);
	
	}
*/	

});



//Aca termina la matufia para la actualizacion de datos

module.exports = router;