export interface IRelatorioStatusResumoQuantitativo {
    total: number;
    analise: number;
    inadmissiveis: number;
    admissiveis: number;
    data_gerado: string;

    em_analise: IStatusDetalhe;
    deferidos: IStatusDetalhe;
    indeferidos: IStatusDetalhe;

    analise_admissiveis_dados: IAdmissibilidadeDetalhe[];
    inadmissiveis_dados: IAdmissibilidadeDetalhe[];
    em_analise_dados: IAdmissibilidadeDetalhe[];
    deferidos_dados: IAdmissibilidadeDetalhe[];
    indeferidos_dados: IAdmissibilidadeDetalhe[];
    via_ordinaria_dados: IAdmissibilidadeDetalhe[];
}

export interface IStatusDetalhe {
    smul: IOrgaoDetalhe;
    graproem: IOrgaoDetalhe;
    parhis: IOrgaoDetalhe;
    servin: IOrgaoDetalhe;
    comin: IOrgaoDetalhe;
    caepp: IOrgaoDetalhe;
    resid: IOrgaoDetalhe;
    total_parcial: number;
}


export interface IOrgaoDetalhe {
    quantidade: number;
    data: { [key: string]: number };
}


export interface IAdmissibilidadeDetalhe {
    id: number;
    decreto: boolean;
    sei: string;
    tipo_requerimento: number;
    requerimento: string;
    aprova_digital: string;
    processo_fisico: string;
    data_protocolo: string;
    envio_admissibilidade: string;
    alvara_tipo_id: string;
    tipo_processo: number;
    obs: string;
    status: number;
    pagamento: number;
    requalifica_rapido: boolean;
    associado_reforma: boolean;
    data_limiteSmul: string;
    data_limiteMulti: string | null;
    criado_em: string;
    alterado_em: string;
}

export interface IRelatorioARProgressaoMensal {
    ano: number;
    mes: number[];
    acc: number[];
}

export interface IListaARProgressaoMensal {
    ano: number,
    mes: string,
    mensal: number,
    acc: number
}

export interface IRelatorioFiltrosState {
    tipoRelatorio: string | null;
    extensaoArquivo: string | null;
    periodoString: string | null;
    dataInicial: Date | string | null;
    dataFinal: Date | string | null;
}