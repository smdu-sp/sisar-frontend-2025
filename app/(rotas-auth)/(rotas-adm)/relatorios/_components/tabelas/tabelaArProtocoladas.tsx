/** @format */



import DataTable from "@/components/data-table";
import { IRelatorioARProgressaoMensal } from "@/types/relatorios";
import { ProgressaoMensalColumn } from "../colunas/progressaoMensalColumn";

interface ITabelProgressaoARProtocoladas {
    lista: IRelatorioARProgressaoMensal[];
    columns: any[];

}

export function TabelaProgressaoARProtocoladas() {
    return (
        <DataTable
            columns={ProgressaoMensalColumn}
            data={[]}
        />
    );

}