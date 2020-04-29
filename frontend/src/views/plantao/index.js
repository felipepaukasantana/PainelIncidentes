import React, { useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import CardDashBoard from '../cardDashBoard/index';
import constantes from '../../assets/constantes/constantes';
import api from '../../api/api';
import Escala from '../plantao/escala/index'
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


const useStyles = makeStyles(() => ({
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
    title: {
        flex: '1 1 100%',
    },
    card: {
        width: "100%",
        height: "1x",
        borderBottom: "0",
        textAlign: "center",
        background: "linear-gradient(45deg, #00cc66 30%, #00ccff 90%)",
    },
}));

function Plantao() {
    const classes = useStyles();
    const [plantonista, setPlantonista] = useState({});

    useEffect(() => {
        async function carregarPlantonista() {
            api.get("plantonista").then(plantonista => {
                setPlantonista(plantonista.data);
            });
        }
        carregarPlantonista();
    }, []);

    return (
        <div>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={plantonista.atual} descricao={constantes.TIPO_CARDS.PLANTONISTA} icon={<PersonIcon className={classes.icon} />} classe={classes.cardIconBacklog} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardDashBoard valor={plantonista.proximo} descricao={constantes.TIPO_CARDS.PROXIMO_PLANTONISTA} icon={<PeopleAltIcon className={classes.icon} />} classe={classes.cardIconSla} />
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <Card >
                        <CardContent className={classes.card}>
                            <Typography className={classes.title} variant="h6" component="div">
                                {"Escala"}
                            </Typography>
                        </CardContent>
                    </Card>
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