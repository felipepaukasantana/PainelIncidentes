import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from '@material-ui/core/Chip';

import SeveridadeHelper from '../../../helpers/SeveridadeHelper'

const useStyles = makeStyles(() => ({
    baixa: {
        backgroundColor: "#73e600"
    },
    media: {
        backgroundColor: "#e6e600"
    },
    alta: {
        backgroundColor: "#ff9900"
    },
    critica: {
        backgroundColor: "#ff3300",
    }
}));

export default function ChipSeveridade(props) {
    const classes = useStyles();
    const { severidade } = props;
    const [chip, setChipState] = useState([]);

    useEffect(() => {
        function preencherDadosChip() {
            setChipState({
                icon: SeveridadeHelper.retornarIcon(severidade),
                classe: SeveridadeHelper.retornarClasse(severidade, classes),
                severidade: SeveridadeHelper.retornarDescricao(severidade),
            });
        }
        preencherDadosChip();
      }, [classes, severidade]);

    return (
        <Chip
        icon={chip.icon}
        className={chip.classe}
        label={chip.severidade}
        size="small" 
        color="primary"/>
    );
}