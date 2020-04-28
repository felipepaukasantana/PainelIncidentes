import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CardDashBoard from '../cardDashBoard/index';
import constantes from '../../assets/constantes/constantes';
import Tabela from '../../components/table/index';
import api from '../../api/api';

const useStyles = makeStyles((theme) => ({
    details: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "center",
    },
    cardIconAberto: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    },
    cardIconFechado: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #FE8B 30%, #FF8E53 90%)",
    },
    cardIconAtendimento: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #0dFE8B 30%, #FF8E53 90%)",
    },
    cardIconCliente: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #0dFE 30%, #FF8E53 90%)",
    },

    icon: {
        color: "#ffffff",
        fontSize: 50,
    },
}));

const colunas = [
    {
        descricao: 'Incidente',
    },
    {
        descricao: 'Status',
    },
    {
        descricao: 'Data Abertura',
    },
    {
        descricao: 'Serveridade',
    },
    {
        descricao: 'Violação',
    },
    {
        descricao: 'Responsável'
    },
    {
        descricao: 'Resumo'
    },
];

export default function Cawa() {
    const classes = useStyles();
    const [dadosCawa, setDadosCawa] = useState([]);
    const [incidentes, setIncidentes] = useState([]);

    useEffect(() => {
        async function carregarDadosCawa() {
            api.get("cawa").then(dados => {
                setDadosCawa(dados.data);
            });
        }
        async function carregarIncidentes() {
            api.get("cawa/incidentes").then(listaIncidentes => {
                setIncidentes(listaIncidentes.data);
            });
        }
        carregarDadosCawa();
        carregarIncidentes();
    }, []);
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dadosCawa.abertos} descricao={constantes.TIPO_CARDS.ABERTO} icon={<OpenInNewIcon className={classes.icon} />} classe={classes.cardIconAberto} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dadosCawa.abertosMes} descricao={constantes.TIPO_CARDS.ABERTOMES} icon={<OpenInNewIcon className={classes.icon} />} classe={classes.cardIconAberto} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dadosCawa.fechados} descricao={constantes.TIPO_CARDS.FECHADO} icon={<CheckBoxIcon className={classes.icon} />} classe={classes.cardIconFechado} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dadosCawa.fechadosMes} descricao={constantes.TIPO_CARDS.FECHADOMES} icon={<CheckBoxIcon className={classes.icon} />} classe={classes.cardIconFechado} />
                </Grid>
            </Grid>
            <Tabela key={1} colunas={colunas} dados={incidentes} titulo={"Incidentes"} />
        </div>
    );
}
