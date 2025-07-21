
export interface IRelatorioRRQuantitativo {
    total: number;
    analise: number;
    inadimissiveis: number;
    admissiveis: number;
    data_gerado: string;
    em_analise: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
    deferidos: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
    indeferidos: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
}

export interface IRelatorioARQuantitativo {
    total: number;
    analise: number;
    inadimissiveis: number;
    admissiveis: number;
    data_gerado: string;
    em_analise: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
    deferidos: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
    indeferidos: {
        smul: {
            quantidade: number;
            data: string[];
        };
        graproem: {
            quantidade: number;
            data: string[];
        };
        total_parcial: number;
    };
}