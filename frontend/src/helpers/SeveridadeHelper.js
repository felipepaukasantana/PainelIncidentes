import React from "react";
import constantes from '../assets/constantes/constantes';

import TagFacesIcon from '@material-ui/icons/TagFaces';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const retornarClasse = (severidade, classes) => {
    var classe = classes.baixa;

    if (constantes.SEVERIDADE.MEDIA.ID === severidade) {
        classe = classes.media;
    }

    if (constantes.SEVERIDADE.ALTA.ID === severidade) {
        classe = classes.alta;
    }

    if (constantes.SEVERIDADE.CRITICA.ID === severidade) {
        classe = classes.critica;
    }

    return classe;
};

const retornarDescricao = (severidade, classes) => {
    var descricao = constantes.SEVERIDADE.BAIXA.DESCRICAO;

    if (constantes.SEVERIDADE.MEDIA.ID === severidade) {
        descricao = constantes.SEVERIDADE.MEDIA.DESCRICAO;
    }

    if (constantes.SEVERIDADE.ALTA.ID === severidade) {
        descricao = constantes.SEVERIDADE.ALTA.DESCRICAO;
    }

    if (constantes.SEVERIDADE.CRITICA.ID === severidade) {
        descricao = constantes.SEVERIDADE.CRITICA.DESCRICAO;
    }

    return descricao;
};

const retornarIcon = (severidade) => {
    var icon = <TagFacesIcon />;

    if (constantes.SEVERIDADE.MEDIA.ID === severidade) {
        icon = <SentimentSatisfiedIcon  />;
    }

    if (constantes.SEVERIDADE.ALTA.ID === severidade) {
        icon = <SentimentDissatisfiedIcon />;
    }

    if (constantes.SEVERIDADE.CRITICA.ID === severidade) {
        icon = <MoodBadIcon />;
    }

    return icon;
};

export default {
    retornarClasse,
    retornarIcon,
    retornarDescricao
}
