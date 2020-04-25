var fs = require("fs");
var dateFns = require('date-fns');
const brasilLocale = require('date-fns/locale/pt');
var moment = require('moment');
var sortJsonArray = require('sort-json-array');

var jsonData = [];

const STATUS = {
    ABERTO: "Aberto",
    FECHADO: "Fechado",
    RESOLVIDO: "Resolvido",
    ATENDIMENTO: "Em atendimento",
    CLIENTE: "Aguardando Cliente",
    HOMOLOGACAO: "Em Homologação",
    RDM: "Aguardando RDM",
    JOB: "Aguardando execução de JOB",
};

fs.readFile("C:\\Users\\1639646\\source\\incidentes\\api\\src\\controllers\\retorno.json", "utf8", function (err, data) {
    if (err) {
        return console.log(err.message);
    }
    jsonData = JSON.parse(data);
});

const filtrarPorData = (data, hoje) => {
    return (dateFns.format(new Date(moment(data, 'DD/MM/YYYY')), 'dd/MM/yyyy') === dateFns.format(hoje, 'dd/MM/yyyy'))
}

const filtrarPorIntervaloData = (dataRefrencia, dataInicial, dataFinal) => {
    var dataFormatada = dateFns.format(new Date(moment(dataRefrencia, 'DD/MM/YYYY')), 'dd/MM/yyyy');
    return (dataFormatada >= dataInicial && dataFormatada <= dataFinal);
}

const filtrarPorStatus = (statusIncidente, status) => {
    return (statusIncidente === status);
}

const carregarBacklog = () => {
    const backlog = jsonData.filter(function (inc) {
        return (inc.status === STATUS.ABERTO ||
            inc.status === STATUS.ATENDIMENTO ||
            inc.status === STATUS.CLIENTE ||
            inc.status === STATUS.JOB ||
            inc.status === STATUS.RDM);
    });
    return backlog;
}

module.exports = {
    listarTodos(req, res) {
        res.send(jsonData);
    },
    carregarDadosBacklog(res, req) {
        const dadosBacklog = carregarBacklog();
        req.send(sortJsonArray(dadosBacklog, 'responsavel,status', 'asc'));
    },
    carregarDadosViolacoes(res, req) {
        const violacoes = jsonData.filter(function (inc) {
            return (inc.violacao_projetada.length > 0);
        });
        req.send(sortJsonArray(violacoes, 'violacao_projetada', 'asc'));
    },
    carregarDadosPendencias(res, req) {
        const pendencias = jsonData.filter(function (inc) {
            return (inc.responsavel === 'THAIGO MORENO DE OLIVEIRA' && inc.status === STATUS.ATENDIMENTO);
        });
        req.send(sortJsonArray(pendencias, 'violacao_projetada', 'asc'));
    },
    carregarDadosTriagem(res, req) {
        const triagem = jsonData.filter(function (inc) {
            return ((inc.responsavel.length === 0)
                || (inc.responsavel === 'DANIEL FARIA MUNIZ'
                && (inc.status === STATUS.ABERTO 
                    || inc.status === STATUS.ATENDIMENTO
                    || inc.status === STATUS.JOB
                    || inc.status === STATUS.CLIENTE)));
        });
        req.send(sortJsonArray(triagem, 'violacao_projetada', 'asc'));
    },
    carregarDadosDashboard(req, res) {
        const backlog = carregarBacklog();
        var hoje = new Date();

        const abertosHoje = jsonData.filter(function (inc) {
            return filtrarPorData(inc.data_abertura, hoje);
        });

        const fechadosHoje = jsonData.filter(function (inc) {
            if (inc.data_resolucao !== '') {
                return filtrarPorData(inc.data_resolucao, hoje);
            }
        });

        const primeiroDia = dateFns.format(dateFns.startOfMonth(hoje), 'dd/MM/yyyy');
        const ultimoDia = dateFns.format(dateFns.lastDayOfMonth(hoje), 'dd/MM/yyyy');

        const abertosMes = jsonData.filter(function (inc) {
            return filtrarPorIntervaloData(inc.data_abertura, primeiroDia, ultimoDia);
        });

        const fechadosMes = jsonData.filter(function (inc) {
            if (inc.data_resolucao !== '') {
                return filtrarPorIntervaloData(inc.data_resolucao, primeiroDia, ultimoDia);
            }
        });

        const atendimento = jsonData.filter(function (inc) {
            return filtrarPorStatus(inc.status, STATUS.ATENDIMENTO);
        });

        const rdm = jsonData.filter(function (inc) {
            return filtrarPorStatus(inc.status, STATUS.RDM);
        });

        const homologacao = jsonData.filter(function (inc) {
            return filtrarPorStatus(inc.status, STATUS.HOMOLOGACAO);
        });

        const cliente = jsonData.filter(function (inc) {
            return filtrarPorStatus(inc.status, STATUS.CLIENTE);
        });

        const job = jsonData.filter(function (inc) {
            return filtrarPorStatus(inc.status, STATUS.JOB);
        });

        const dashBoard = {
            backlog: backlog.length,
            sla: 100,
            abertos: abertosHoje.length,
            fechados: fechadosHoje.length,
            abertosMes: abertosMes.length,
            fechadosMes: fechadosMes.length,
            homologacao: homologacao.length,
            rdm: rdm.length,
            atendimento: atendimento.length,
            cliente: cliente.length,
            job: job.length
        };

        console.log(dashBoard + new Date());
        res.send(dashBoard);
    }
};