import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import CardDashBoard from '../cardDashBoard/index';
import constantes from '../../assets/constantes/constantes';
import api from '../../api/api';
import Escala from '../plantao/escala/index'

import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import GroupIcon from '@material-ui/icons/Group';
import BuildIcon from '@material-ui/icons/Build';
import UpdateIcon from '@material-ui/icons/Update';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import AssessmentIcon from '@material-ui/icons/Assessment';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';


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

function Plantao() {
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

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={"Leandro"} descricao={constantes.TIPO_CARDS.PLANTONISTA} icon={<PersonIcon className={classes.icon} />} classe={classes.cardIconBacklog} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={"Felipe"} descricao={constantes.TIPO_CARDS.PROXIMO_PLANTONISTA} icon={<PeopleAltIcon className={classes.icon} />} classe={classes.cardIconSla} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Escala /> 
                </Grid>
            </Grid>
        </div>
    );
}
export default Plantao;