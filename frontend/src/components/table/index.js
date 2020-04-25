import React from "react";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ChipSeveridade from "../../views/chip/chipSeveridade";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
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
    cardRecurso: {
        width: "100%",
        height: "1x",
        borderBottom: "0",
    },
});

export default function Tabela(props) {
    const classes = useStyles();
    const { colunas, dados, titulo } = props
    
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} >
                <div>
                    <Card >
                        <CardContent className={classes.card}>
                            <Typography className={classes.title} variant="h6" component="div">
                                {titulo}
                            </Typography>
                        </CardContent>
                    </Card>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {colunas.map((coluna, index) => (
                                    <TableCell key={index}>{coluna.descricao}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dados.map((dado, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row" width="1px">
                                        {dado.numero}
                                    </TableCell>
                                    <TableCell align="left" width="1px">{dado.status}</TableCell>
                                    <TableCell align="left" width="150px">{dado.data_abertura}</TableCell>
                                    <TableCell align="left" width="150px">
                                        <ChipSeveridade  severidade={dado.severidade}/>
                                    </TableCell>
                                    <TableCell align="left" width="150px">{dado.violacao_projetada}</TableCell>
                                    <TableCell align="left" width="150px">{dado.responsavel}</TableCell>
                                    <TableCell align="left">{dado.resumo}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}