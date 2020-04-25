import React, { useEffect, useState } from "react";
import Tabela from '../../components/table/index';
import api from '../../api/api';

export default function Violacoes() {
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
            descricao: 'Severidade',
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

    const [violacoes, setViolacaoes] = useState([]);  

    useEffect(() => {
        async function carregarViolacoes() {
            api.get("violacoes").then(incidentes => {
                setViolacaoes(incidentes.data);
            });
        }
        carregarViolacoes();
    }, []); 

    return (
        <Tabela colunas={colunas} dados={violacoes} titulo={"Violações"} />
    );
}