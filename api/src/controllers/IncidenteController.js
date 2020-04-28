var fs = require("fs");
var dateFns = require('date-fns');
var sortJsonArray = require('sort-json-array');
const Incidente = require('../model/Incidente');

var jsonData = [];
var cawa = [];

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

fs.readFile("C:\\Users\\1639646\\source\\painelincidentes\\api\\src\\controllers\\retorno.json", "utf8", function (err, data) {
    if (err) {
        return console.log(err.message);
    }
    jsonData = JSON.parse(data);
    cawa = filtrarCawa();
});

const filtrarPorData = (data, hoje) => {
    return (dateFns.format(new Date(data), 'dd/MM/yyyy') === dateFns.format(hoje, 'dd/MM/yyyy'))
}

const filtrarPorIntervaloData = (dataRefrencia, dataInicial, dataFinal) => {
    var dataFormatada = dateFns.format(new Date(dataRefrencia), 'dd/MM/yyyy');

    return ((dataFormatada >= dataInicial) && (dataFormatada <= dataFinal));
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
            return (inc.violacao_projetada.length > 0);
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
        const triagem = jsonData.filter(function (inc) {
            return ((inc.responsavel.length === 0)
                || (inc.responsavel === 'DANIEL FARIA MUNIZ'
                    && (inc.status === STATUS.ABERTO
                        || inc.status === STATUS.ATENDIMENTO
                        || inc.status === STATUS.JOB
                        || inc.status === STATUS.CLIENTE)));
        });
        req.send(sortJsonArray(triagem, 'violacao_projetada.$date', 'asc'));
    },
    carregarDadosCawa(res, req) {
        var hoje = new Date();

        const abertosHoje = cawa.filter(function (inc) {
            return filtrarPorData(inc.data_abertura.$date, hoje);
        });

        const fechadosHoje = cawa.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return filtrarPorData(inc.data_resolucao.$date, hoje);
            }
        });

        const primeiroDia = dateFns.format(dateFns.startOfMonth(hoje), 'dd/MM/yyyy');
        const ultimoDia = dateFns.format(dateFns.lastDayOfMonth(hoje), 'dd/MM/yyyy');

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
        var hoje = new Date();

        const abertosHoje = jsonData.filter(function (inc) {
            return filtrarPorData(inc.data_abertura.$date, hoje);
        });

        const fechadosHoje = jsonData.filter(function (inc) {
            if (inc.data_resolucao !== null) {
                return filtrarPorData(inc.data_resolucao.$date, hoje);
            }
        });

        const primeiroDia = dateFns.format(dateFns.startOfMonth(hoje), 'dd/MM/yyyy');
        const ultimoDia = dateFns.format(dateFns.lastDayOfMonth(hoje), 'dd/MM/yyyy');

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
    }
};