import React, { useEffect, useState } from "react";
import Tabela from '../../components/table/index';
import api from '../../api/api';

export default function Recursos() {
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

    function montarIncidentesRecursos () {   
        var dados = [];   
        recursos.map(function (recurso) {
            const incRecurso = incidentes.filter(function (inc) {
                return (inc.responsavel === recurso.nome);
            });
            if (incRecurso.length > 0) {
                dados.push({nome: recurso.nome, incidentes: incRecurso});       
            }            
            return dados;
        });
        return dados;
    }

    const dados = montarIncidentesRecursos();
    return (
        dados.map((dado, index) => (
            <Tabela key={index} colunas={colunas} dados={dado.incidentes} titulo={dado.nome} />
        ))     
    );
}