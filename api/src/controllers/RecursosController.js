var sortJsonArray = require('sort-json-array');

const recursos = [
    {
        nome: "VITOR STELMASTCHUK SANTOS",
    },
    {
        nome: "PEDRO LOMBARDI NETO",
    },
    {
        nome: "MARCOS VINICIUS HIDEKI WATANABE",
    },
    {
        nome: "LUAN CARLOS TOMAROZZI",
    },
    {
        nome: "LEONAN RODRIGUES FERREIRA",
    },
    {
        nome: "LEANDRO CAETANO DA SILVA",
    },
    {
        nome: "FELIPE PAUKA SANTANA",
    },
    {
        nome: "ERALDO CANUTO DE SOUZA",
    },
    {
        nome: "DANIEL FARIA MUNIZ",
    },
    {
        nome: "BRUNO CESAR DIAS",
    },
    {
        nome: "PEDRO HENRIQUE VITACHI",
    },
    {
        nome: "JADY THAINA DOS SANTOS MARTINS",
    },
    {
        nome: "CESAR WILLIAN MOURA GODOI",
    },   
    {
        nome: "THIAGO MORENO DE OLIVEIRA",
    },
];

module.exports = {
    listarRecrusos(req, res){
        res.send(sortJsonArray(recursos, 'nome','asc'));
    }
};