'use client';

import DataTable from "@/components/data-table"; // Seu componente DataTable
import { ColumnDef } from "@tanstack/react-table"; // Para tipar as colunas
import { IOrgaoDetalhe, IStatusDetalhe } from "@/types/relatorios"; // Suas interfaces de dados
import { RRStatusResumoColumns } from "../colunas/RRStatusResumo";

// 1. Interface para a linha de dados formatada para ESTA tabela específica
interface IResumoTableRow {
    orgao: string; // Nome do órgão, ex: "SMUL"
    nao_incide: number;
    area_envoltoria: number;
    bem_tombado: number;
    total: number; // Corresponde à quantidade geral do órgão
}

// 3. Componente ResumoQuantitativoTable
interface ITabelaResumoQuantitativo {
    dataDetalhe: IStatusDetalhe;
    sectionTitle: string;
}

export function TabelaRRQuantitativo({ dataDetalhe, sectionTitle }: ITabelaResumoQuantitativo) {

    // Lógica para transformar IStatusDetalhe em IResumoTableRow[]
    // Isso é feito em tempo de execução.
    const formattedData: IResumoTableRow[] = [];

    // Mapeia os dados do IStatusDetalhe para o formato IResumoTableRow
    // Isso exige iterar sobre as propriedades do objeto 'dataDetalhe' (smul, graproem, etc.)
    // E extrair os valores do objeto 'data' aninhado de cada órgão

    // Lista dos órgãos esperados, para garantir a ordem e tratar os totais parciais
    const orgaosKeys: Array<keyof Omit<IStatusDetalhe, 'total_parcial'>> = [
        "smul", "graproem", "parhis", "servin", "comin", "caepp", "resid"
    ];

    orgaosKeys.forEach(key => {
        const orgaoData: IOrgaoDetalhe = dataDetalhe[key];
        // Note que o JSON de exemplo para 'graproem' não tem as subcategorias "Não Incide", etc.
        // Ele tem {"GRAPROEM": 2}. Então precisamos de fallback.
        formattedData.push({
            orgao: key.toUpperCase(), // Ou um nome mais amigável, ex: "SMUL"
            nao_incide: orgaoData.data["NÃO INCIDE"] || 0,
            area_envoltoria: orgaoData.data["ÁREA ENVOLTÓRIA"] || 0,
            bem_tombado: orgaoData.data["BEM TOMBADO"] || 0,
            total: orgaoData.quantidade, // A quantidade total do órgão
        });
    });

    // Adiciona uma linha para o total parcial, se desejar
    formattedData.push({
        orgao: "TOTAL PARCIAL",
        nao_incide: 0, // Ou calcular a soma das colunas
        area_envoltoria: 0,
        bem_tombado: 0,
        total: dataDetalhe.total_parcial,
    });


    return (
        <div className="my-6">
            <h3 className="text-lg font-semibold mb-2">{sectionTitle}</h3>
            {/* O DataTable será tipado para IResumoTableRow */}
            <DataTable<IResumoTableRow, string>
                columns={RRStatusResumoColumns}
                data={formattedData}
            />
        </div>
    );
}                                                            