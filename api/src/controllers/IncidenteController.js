var fs = require("fs");
var sortJsonArray = require('sort-json-array');
var moment = require('moment');
const Incidente = require('../model/Incidente');

var jsonData = [];
var cawa = [];
moment.locale("pt-br");

const STATUS = {
    ABERTO: "Aberto",
    FECHADO: "Fechado",
    RESOLVIDO: "Resolvido",
    ATENDIMENTO: "Em atendimento",
    CLIENTE: "Aguardando cliente",
    HOMOLOGACAO: "Em homologação",
    RDM: "Aguardando RDM",
    JOB: "Aguardando execução de JOB",
};

fs.readFile("C:\\Users\\1639646\\source\\painelincidentes\\api\\src\\controllers\\full_incidentes.json", "utf8", function (err, data) {
    if (err) {
        return console.log(err.message);
    }
    jsonData = JSON.parse(data);
    cawa = filtrarCawa();
});

const filtrarPorData = (data, hoje) => {
    var dataFormatada = moment(new Date(data)).format('L');     
    return (dataFormatada === hoje);
}
const filtrarPorIntervaloData = (dataRefrencia, dataInicial, dataFinal) => {
    var data = moment(new Date(dataRefrencia), "DD/MM/YYYY", "pt", true).startOf('day')._d;
    return moment(data).isBetween(dataInicial, dataFinal, null, '[]');
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
            inc.status === STATUS.RDM ||
            inc.status === STATUS.HOMOLOGACAO);
    });
    return backlog;
}

const filtrarCawa = () => {
    return jsonData.filter(function (inc) {
        return (inc.usuario_final_afetado === "CAWA");
    });
}

module.exports = {
    async inserir(req, res) {
        const { numero, resumo, severidade, status, grupo_executor, responsavel, violacao_projetada,
            violado, localidade, data_abertura, ultima_atualizacao, retorno_chamado, classificacao_final,
            data_resolucao, descricao, usuario_final_afetado, departamento, problema_vinculado, incidente_pai,
            causado_pela_rdm, origem, ticket_sis_ext } = req.body;

        //const violacao = new Date(violacao_projetada);    

        const post = await Incidente.create({
            numero,
            resumo,
            severidade,
            status,
            grupo_executor,
            responsavel,
            violacao_projetada,
            violado,
            localidade,
            data_abertura,
            ultima_atualizacao,
            retorno_chamado,
            classificacao_final,
            data_resolucao,
            descricao,
            usuario_final_afetado,
            departamento,
            problema_vinculado,
            incidente_pai,
            causado_pela_rdm,
            origem,
            ticket_sis_ext
        });

        console.log(post);
    },
    listarTodos(req, res) {
        res.send(jsonData);
    },
    carregarDadosBacklog(res, req) {
        const dadosBacklog = carregarBacklog();
        req.send(sortJsonArray(dadosBacklog, 'responsavel,status', 'asc'));
    },
    carregarDadosViolacoes(res, req) {
        const violacoes = jsonData.filter(function (inc) {
            return (inc.violacao_projetada != null);
        });
        req.send(sortJsonArray(violacoes, 'violacao_projetada', 'asc'));
    },
    carregarDadosPendencias(res, req) {
        const pendencias = jsonData.filter(function (inc) {
            return (inc.responsavel === 'THIAGO MORENO DE OLIVEIRA' && inc.status === STATUS.ATENDIMENTO);
        });
        req.send(sortJsonArray(pendencias, 'violacao_projetada', 'asc'));
    },
    carregarDadosTriagem(res, req) {
        const triagem = carregarBacklog().filter(function (inc) {
            return(inc.responsavel === 'DANIEL FARIA MUNIZ' || inc.responsavel.length === 0);            
        });
        req.send(sortJsonArray(triagem, 'violacao_projetada.$date', 'asc'));
    },
    carregarDadosCawa(res, req) {
        var hoje = moment().format('L');

        const abertosHoje = cawa.filter(function (inc) {
            return filtrarPorData(inc.data_abertura.$date, hoje);
        });

        const fechadosHoje = cawa.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return filtrarPorData(inc.data_resolucao.$date, hoje);
            }
        });

        const ultimoDia = moment().endOf('month')._d; 
        const primeiroDia= moment().startOf('month')._d;

        const abertosMes = cawa.filter(function (inc) {
            return filtrarPorIntervaloData(inc.data_abertura.$date, primeiroDia, ultimoDia);
        });

        const fechadosMes = cawa.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return filtrarPorIntervaloData(inc.data_resolucao.$date, primeiroDia, ultimoDia);
            }
        });

        const dadosCawa = {
            abertos: abertosHoje.length,
            fechados: fechadosHoje.length,
            abertosMes: abertosMes.length,
            fechadosMes: fechadosMes.length,
        };
        req.send(dadosCawa);
    },
    carregarCawa(res, req) {
        req.send(sortJsonArray(cawa.filter(function (inc) {
            return (inc.status === STATUS.ABERTO || inc.status === STATUS.ATENDIMENTO);
        })), "violacao_projetada.$date", 'asc');
    },
    carregarDadosDashboard(res, req) {
        const backlog = carregarBacklog();
        var hoje = moment().format('L');

        const abertosHoje = jsonData.filter(function (inc) {
            if (inc.data_abertura !== null) {                           
                return filtrarPorData(inc.data_abertura.$date, hoje);
            }
        });

        const fechadosHoje = jsonData.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return ((inc.status === STATUS.FECHADO ||
                    inc.status === STATUS.RESOLVIDO) && filtrarPorData(inc.data_resolucao.$date, hoje));
            }
        });
        
        const ultimoDia = moment().endOf('month')._d; 
        const primeiroDia= moment().startOf('month')._d;

        const abertosMes = jsonData.filter(function (inc) {
               return filtrarPorIntervaloData(inc.data_abertura.$date, primeiroDia, ultimoDia);
        });

        const fechadosMes = jsonData.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return filtrarPorIntervaloData(inc.data_resolucao.$date, primeiroDia, ultimoDia);
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
        req.send(dashBoard);
    },
    carregarPlantonistas(res, req) {
        req.send({
            atual: "Leandro",
            proximo: "Felipe"
        });
    }
};