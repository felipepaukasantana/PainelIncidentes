const mongoose = require('mongoose');

const IncidenteSchema = new mongoose.Schema ({
    numero: Number,
    resumo: String,
    severidade: String,
    status: String,
    grupo_executor: String,
    responsavel: String,
    violacao_projetada: String,
    violado: String,
    localidade: String,
    data_abertura: String,
    ultima_atualizacao: Date,
    retorno_chamado: String,
    classificacao_final: String,
    data_resolucao: String,
    descricao: String,
    usuario_final_afetado: String,
    departamento:String,
    problema_vinculado: Number,
    incidente_pai: Number,
    causado_pela_rdm: Number,
    origem: String,
    ticket_sis_ext: String

});

module.exports = mongoose.model('incidente', IncidenteSchema);

