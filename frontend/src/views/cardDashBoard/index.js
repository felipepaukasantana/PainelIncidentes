import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    details: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: "center",
    },
}));

export default function CardDashBoard(props) {
    const classes = useStyles();
    var { descricao, icon, classe, valor } = props;
    return (
        <Card >
            <div className={classes.details}>
                <CardContent>
                    <Card >
                        <CardContent className={classe}>
                            {icon}
                        </CardContent>
                    </Card>
                    <Typography component="h1" variant="h1">
                        {valor}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {descricao}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}