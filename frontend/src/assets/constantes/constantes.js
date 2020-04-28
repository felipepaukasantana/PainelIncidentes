const TIPO_CARDS = {
    ABERTO: "Abertos",
    FECHADO: "Fechados",
    ATENDIMENTO: "Atendimento",
    CLIENTE: "Ag. Cliente",
    HOMOLOGACAO: "Homologação",
    RDM: "Ag. RDM",
    BACKLOG: "Backlog",
    SLA: "SLA",
    ABERTOMES: "Abertos Mês",
    FECHADOMES: "Fechados Mês",
    JOB: "Aguardando Job",
    PLANTONISTA: "Plantonista",
    PROXIMO_PLANTONISTA: "Próx. Plantonista"
};

const SEVERIDADE = {
    BAIXA:{
        ID: 2,
        DESCRICAO: "2 - Baixa" 
    },
    MEDIA: 
    {
        ID: 3,
        DESCRICAO: "3 - Média" 
    },
    ALTA:
    {
        ID: 4,
        DESCRICAO: "4 - Alta" 
    },
    CRITICA: 
    {
        ID: 5,
        DESCRICAO: "5 - Crítica" 
    },
};

export default {
    TIPO_CARDS,
    SEVERIDADE
  };