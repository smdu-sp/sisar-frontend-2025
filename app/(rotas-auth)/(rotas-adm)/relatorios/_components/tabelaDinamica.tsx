
import { IListaARProgressaoMensal, IStatusDetalhe } from "@/types/relatorios";
import { TabelaProgressaoARProtocoladas } from "./tabelas/tabelaArProtocoladas";
import { TabelaRRQuantitativo } from "./tabelas/tabelaRRQuantitativo";

interface ITabelaDinamica {
    tipo: string | null;
    lista?: any[];
    obj?: any;
}

export default function TabelaDinamica({ lista, tipo, obj }: ITabelaDinamica) {

    if (tipo === 'ar-progressao-mensal') {
        const listaFormatada = lista as IListaARProgressaoMensal[][];
        return (
            listaFormatada.map((item: IListaARProgressaoMensal[], index: number) => {
                return (
                    <div key={index} className='mt-8 sm:-[350px] md:w-[700px] 3xl:w-[1050px]'>
                        <TabelaProgressaoARProtocoladas
                            lista={item}
                        />
                    </div>
                )
            })
        )
    }

    if (tipo === 'rr-quantitativo') {
        return (
            <TabelaRRQuantitativo
                dataDetalhe={obj as IStatusDetalhe}
                sectionTitle="Resumo Quantitativo"
            />
        )

    }
} 