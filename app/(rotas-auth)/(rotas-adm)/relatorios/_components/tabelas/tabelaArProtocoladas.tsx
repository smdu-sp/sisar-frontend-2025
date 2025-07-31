/** @format */



import DataTable from "@/components/data-table";
import { ProgressaoMensalColumn } from "../colunas/progressaoMensalColumn";
import { IListaARProgressaoMensal } from "@/types/relatorios";

interface ITabelProgressaoARProtocoladas {
    lista: IListaARProgressaoMensal[];

}

export function TabelaProgressaoARProtocoladas({ lista }: ITabelProgressaoARProtocoladas) {
    return (
        <DataTable
            columns={ProgressaoMensalColumn}
            data={lista}
        />
    );

}