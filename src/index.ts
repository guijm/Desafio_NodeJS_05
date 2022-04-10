/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { generate } from 'csv-generate';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
	process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);


	// CÓDIGO PARA ATENDER OS REQUERIMENTOS
	// R01, R02, R03, R04, R05
	
	const prompt = require('prompt-sync');
	const prt = prompt();
	
	let qtdeAlunos = parseInt(prt('Digite a quantidade de alunos: '));
	
	let listaAlunos = [];

	for ( let i = 0; i < qtdeAlunos; i++) {
		let nome = prt('Digite o nome do aluno: ');
		let idade = parseInt(prt('Digite a idade do aluno: '));
		let nota = parseInt(prt('Digite a nota do aluno: '));
		let Aluno = {nome, idade, nota};
		listaAlunos.push(Aluno);
	}
	let somaNotas = listaAlunos.map(Aluno => Aluno.nota).reduce((prev,curr) => prev + curr , 0);
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	const csvWriter = createCsvWriter({
		path: './file.csv',
		header: [
			{id:'nome', title:'Nome'},
			{id: 'idade', title: 'Idade'},
			{id: 'nota', title: 'Nota'},
			{id:'somaNotas', title:console.log('total das notas é: ' + somaNotas)}
		]	
	}) 
	csvWriter.writeRecords(listaAlunos)
		.then(() => {
			console.log('Salvo com sucesso!');
		});
});

 