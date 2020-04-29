const express = require('express');
const IncidenteController = require('../controllers/IncidenteController');
const RecursoController = require('../controllers/RecursosController');


const routes = new express.Router();

routes.get('/incidentes', IncidenteController.listarTodos);
routes.get('/dashboard', IncidenteController.carregarDadosDashboard);
routes.get('/backlog', IncidenteController.carregarDadosBacklog);
routes.get('/violacoes', IncidenteController.carregarDadosViolacoes);
routes.get('/recursos', RecursoController.listarRecrusos);
routes.get('/pendencias', IncidenteController.carregarDadosPendencias);
routes.get('/triagem', IncidenteController.carregarDadosTriagem);
routes.get('/cawa', IncidenteController.carregarDadosCawa);
routes.get('/plantonista', IncidenteController.carregarPlantonistas);
routes.get('/cawa/incidentes', IncidenteController.carregarCawa);
routes.post('/incidente', IncidenteController.inserir);
module.exports = routes;