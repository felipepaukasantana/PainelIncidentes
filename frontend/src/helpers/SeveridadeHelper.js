import React from "react";
import constantes from '../assets/constantes/constantes';

import TagFacesIcon from '@material-ui/icons/TagFaces';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import MoodBadIcon from '@material-ui/icons/MoodBad';

const retornarClasse = (severidade, classes) => {
    var classe = classes.baixa;

    if (constantes.SEVERIDADE.MEDIA === severidade) {
        classe = classes.media;
    }

    if (constantes.SEVERIDADE.ALTA === severidade) {
        classe = classes.alta;
    }

    if (constantes.SEVERIDADE.CRITICA === severidade) {
        classe = classes.critica;
    }

    return classe;
};

const retornarIcon = (severidade) => {
    var icon = <TagFacesIcon />;

    if (constantes.SEVERIDADE.MEDIA === severidade) {
        icon = <SentimentSatisfiedIcon  />;
    }

    if (constantes.SEVERIDADE.ALTA === severidade) {
        icon = <SentimentDissatisfiedIcon />;
    }

    if (constantes.SEVERIDADE.CRITICA === severidade) {
        icon = <MoodBadIcon />;
    }

    return icon;
};

export default {
    retornarClasse,
    retornarIcon
}
