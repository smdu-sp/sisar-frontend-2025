/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { IListaARProgressaoMensal, IRelatorioFiltrosState } from '@/types/relatorios';
import { TabelaProgressaoARProtocoladas } from './_components/tabelas/tabelaArProtocoladas';
import { verificaData, tipos_relatorios, tipos_extensao_arquivo } from '@/lib/utils';
import { Filtros, TiposFiltros } from '@/components/filtros';
import gerarRelatorio from '@/services/relatorios/ar-progressao-mensal/query-functions/gerarRelatorio';
import formatadorListaArProgressaoMensal from './utils/formatadorArProgressao';
import TabelaDianmica from './_components/tabelaDinamica';


export default function RelatoriosPage() {
	const [filtrosAtuais, setFiltrosAtuais] = useState<IRelatorioFiltrosState>({
		tipoRelatorio: null,
		extensaoArquivo: null,
		periodoString: null,
		dataInicial: null,
		dataFinal: null,
	});

	const [lista, setLista] = useState([])

	const searchParams = useSearchParams();
	const { data: session, status } = useSession();


	useEffect(() => {
		const tipoRelatorioParam = searchParams.get('tipo_relatorio');
		const extensaoArquivoParam = searchParams.get('extensao_arquivo');
		const periodoParam = searchParams.get('periodo');

		let dataInicioObj: Date | string | null = null;
		let dataFimObj: Date | string | null = null;

		if (periodoParam) {
			const datasArray = periodoParam.split(',');
			if (datasArray.length === 2 && datasArray[0] && datasArray[1]) {
				[dataInicioObj, dataFimObj] = verificaData(datasArray[0], datasArray[1]);
			}
		}

		setFiltrosAtuais({
			tipoRelatorio: tipoRelatorioParam,
			extensaoArquivo: extensaoArquivoParam,
			periodoString: periodoParam,
			dataInicial: dataInicioObj ? format(dataInicioObj, 'yyyy') : dataInicioObj,
			dataFinal: dataFimObj ? format(dataFimObj, 'yyyy') : dataFimObj,
		});

	}, [searchParams]);


	let listaFormatada: IListaARProgressaoMensal[][];
	try {
		listaFormatada = formatadorListaArProgressaoMensal(lista);
	} catch (error) {
		console.error('Erro ao formatar a lista:', error);
		listaFormatada = [];
	}
	console.log("1:lista formatada aqui", listaFormatada)


	useEffect(() => {
		const fetchRelatorio = async () => {
			if (filtrosAtuais.dataInicial && filtrosAtuais.dataFinal) {
				try {
					const accessToken = session?.access_token;
					const resultado = await gerarRelatorio({
						anoInit: filtrosAtuais.dataInicial as string,
						anoFinal: filtrosAtuais.dataFinal as string,
						access_token: accessToken,

					});
					setLista(resultado.data)
				} catch (error) {
					console.error('Erro ao gerar relatório:', error);
				}
			} else {
				console.log('Datas inicial e final são necessárias para gerar o relatório.');
			}
		};

		fetchRelatorio();
	}, [filtrosAtuais]);

	return (
		<div className='w-full px-0 md:px-8 relative pb-20 md:pb-14 h-full md:container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold'>Relatórios</h1>
			<div className='grid grid-cols-1 max-w-sm mx-auto md:max-w-full gap-y-3 my-5 w-full '>
				<Filtros
					camposFiltraveis={[
						{
							nome: 'Tipo de relatório',
							tag: 'tipo_relatorio',
							tipo: TiposFiltros.SELECT,
							valores: tipos_relatorios,
						},
						{
							nome: 'Extensão de arquivo',
							tag: 'extensao_arquivo',
							tipo: TiposFiltros.SELECT,
							valores: tipos_extensao_arquivo,
						},
						{
							nome: 'Período',
							tag: 'periodo',
							tipo: TiposFiltros.DATA,
						},
					]}
				/>
				<div className='grid grid-cols-1 md:grid-cols-2 max-w-sm mx-auto md:max-w-full gap-y-3 my-5 w-full justify-around'>
					<TabelaDianmica
						lista={listaFormatada}
						tipo={filtrosAtuais.tipoRelatorio}
					/>

				</div>
			</div>
		</div>
	);
}
