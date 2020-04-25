import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import CardDashBoard from '../cardDashBoard/index';
import constantes from '../../assets/constantes/constantes';
import api from '../../api/api';

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import UpdateIcon from '@material-ui/icons/Update';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import AssessmentIcon from '@material-ui/icons/Assessment';


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
        background: "linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)",
    },
    cardIconSla: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #FE8B 30%, #FF8E53 90%)",
    },
    cardIconBacklog: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #FE8B 30%, #FF8E53 90%)",
    },
    cardIconHomologacao: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #00cc66 30%, #00ccff 90%)",
    },
    cardIconRdm: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #00cc66 30%, #00ccff 90%)",
    },
    cardIconAtendimento: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #00cc66 30%, #00ccff 90%)",
    },
    cardIconCliente: {
        width: "100%",
        height: "10x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #00cc66 30%, #00ccff 90%)",
    },
    icon: {
        color: "#ffffff",
        fontSize: 50,
    },
}));

function Dashboard() {
    const classes = useStyles();
    const [dashboardState, setDashboard] = useState({});
    
    useEffect(() => {
        async function carregarDashboard() {
            api.get("dashboard").then(dash => { 
                setDashboard(dash.data); 
            });
        }
        carregarDashboard();
    }, []);    
    console.log(dashboardState);
    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={dashboardState.backlog} descricao={constantes.TIPO_CARDS.BACKLOG} icon={<DesktopMacIcon className={classes.icon} />} classe={classes.cardIconBacklog} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={dashboardState.sla} descricao={constantes.TIPO_CARDS.SLA} icon={<AssessmentIcon className={classes.icon} />} classe={classes.cardIconSla} />
                </Grid>
            </Grid>   
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.abertos} descricao={constantes.TIPO_CARDS.ABERTO} icon={<OpenInNewIcon className={classes.icon} />} classe={classes.cardIconAberto} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.fechados} descricao={constantes.TIPO_CARDS.ABERTOMES} icon={<OpenInNewIcon className={classes.icon} />} classe={classes.cardIconAberto} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.abertosMes} descricao={constantes.TIPO_CARDS.FECHADO} icon={<CheckBoxIcon className={classes.icon} />} classe={classes.cardIconFechado} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.fechadosMes} descricao={constantes.TIPO_CARDS.FECHADOMES} icon={<CheckBoxIcon className={classes.icon} />} classe={classes.cardIconFechado} />
                </Grid>
            </Grid> 
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.homologacao} descricao={constantes.TIPO_CARDS.HOMOLOGACAO} icon={<UpdateIcon className={classes.icon} />} classe={classes.cardIconHomologacao} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.rdm} descricao={constantes.TIPO_CARDS.RDM} icon={<AutorenewIcon className={classes.icon} />} classe={classes.cardIconRdm} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.atendimento} descricao={constantes.TIPO_CARDS.ATENDIMENTO} icon={<BuildIcon className={classes.icon} />} classe={classes.cardIconAtendimento} />
                </Grid>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.cliente} descricao={constantes.TIPO_CARDS.CLIENTE} icon={<GroupIcon className={classes.icon} />} classe={classes.cardIconCliente} />
                </Grid>
            </Grid>   
            <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                    <CardDashBoard valor={dashboardState.job} descricao={constantes.TIPO_CARDS.JOB} icon={<UpdateIcon className={classes.icon} />} classe={classes.cardIconHomologacao} />
                </Grid>
            </Grid>        
        </div>
    );
}
export default Dashboard;