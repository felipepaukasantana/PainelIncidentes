import React, { useEffect, useState } from "react";
import Tabela from '../../components/table/index';
import api from '../../api/api';

export default function Pendencias() {
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

    const [pendencias, setPendencias] = useState([]);  
    const [triagem, setTriagem] = useState([]);  

    useEffect(() => {
        async function carregarPendencias() {
            api.get("pendencias").then(incidentes => {
                setPendencias(incidentes.data);
            });
        }
        async function carregarTraigem() {
            api.get("triagem").then(incidentes => {
                setTriagem(incidentes.data);
            });
        }
        carregarPendencias();
        carregarTraigem();
    }, []); 

    return (
        <div>
            <Tabela colunas={colunas} dados={pendencias} titulo={"Fila Atendimento"} />
            <Tabela colunas={colunas} dados={triagem} titulo={"Triagem"} />
        </div>  
    );
}