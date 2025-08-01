/** @format */

'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

interface IResumoTableRow {
    orgao: string; // Nome do órgão, ex: "SMUL"
    nao_incide: number;
    area_envoltoria: number;
    bem_tombado: number;
    total: number; // Corresponde à quantidade geral do órgão
}

export const RRStatusResumoColumns: ColumnDef<IResumoTableRow>[] = [
    {
        accessorKey: "orgao",
        header: "Órgão",
    },
    {
        accessorKey: "nao_incide",
        header: "Não Incide",
        // Exemplo de como acessar o dado aninhado em 'data'
        cell: ({ row }) => row.original.nao_incide,
    },
    {
        accessorKey: "area_envoltoria",
        header: "Área Envoltória",
        cell: ({ row }) => row.original.area_envoltoria,
    },
    {
        accessorKey: "bem_tombado",
        header: "Bem Tombado",
        cell: ({ row }) => row.original.bem_tombado,
    },
    {
        accessorKey: "total", // Corresponde à 'quantidade' do órgão
        header: "Total",
        cell: ({ row }) => row.original.total,
    },
];