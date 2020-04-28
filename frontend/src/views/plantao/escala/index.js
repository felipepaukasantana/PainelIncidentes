import React, { useEffect, useState } from "react";
import api from '../../../api/api';
import Agenda from '../../../components/agenda/index'

export default function Escala() {

    const [recursos, setRecursos] = useState([]);
    const [incidentes, setIncidentes] = useState([]);

    useEffect(() => {
        async function carregarRecursos() {
            api.get("recursos").then(recursos => {
                setRecursos(recursos.data);
            });
        }
        async function carregarIncidentes() {
            api.get("backlog").then(listaIncidentes => {
                setIncidentes(listaIncidentes.data);
            });
        }
        carregarRecursos();
        carregarIncidentes();
    }, []);

    return (
        <div>
            <Agenda />
        </div>
    );
}