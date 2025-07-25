/** @format */

'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { TabelaProgressaoARProtocoladas } from './_components/tabelas/tabelaArProtocoladas';
import { verificaData, tipos_relatorios, tipos_extensao_arquivo } from '@/lib/utils';
import { Filtros, TiposFiltros } from '@/components/filtros';
import gerarRelatorio from '@/services/relatorios/ar-progressao-mensal/query-functions/gerarRelatorio';

interface IRelatorioFiltrosState {
	tipoRelatorio: string | null;
	extensaoArquivo: string | null;
	periodoString: string | null;
	dataInicial: Date | string | null;
	dataFinal: Date | string | null;
}

export default function RelatoriosPage() {
	const [filtrosAtuais, setFiltrosAtuais] = useState<IRelatorioFiltrosState>({
		tipoRelatorio: null,
		extensaoArquivo: null,
		periodoString: null,
		dataInicial: null,
		dataFinal: null,
	});

	const searchParams = useSearchParams();

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

	console.log('filtros aqui', filtrosAtuais);

	useEffect(() => {
		const fetchRelatorio = async () => {
			if (filtrosAtuais.dataInicial && filtrosAtuais.dataFinal) {
				try {
					const accessToken = 'seu_token_aqui'; // Substitua pelo token real do login
					const resultado = await gerarRelatorio({
						anoInit: filtrosAtuais.dataInicial as string,
						anoFinal: filtrosAtuais.dataFinal as string,
						access_token: accessToken,
					});
					console.log('Resultado do relatório:', resultado);
				} catch (error) {
					console.error('Erro ao gerar relatório:', error);
				}
			} else {
				console.log('Datas inicial e final são necessárias para gerar o relatório.');
			}
		};

		fetchRelatorio();
	}, [filtrosAtuais]);

	useEffect(() => {

		if (filtrosAtuais.tipoRelatorio) {
			console.log('Disparando busca de dados com filtros:', filtrosAtuais);
		} else {
			console.log('Tipo de relatório obrigatório não selecionado. Aguardando...');
		}

	}, [filtrosAtuais]);

	const tipoRelatorioLabel = tipos_relatorios.find(
		(tipo) => tipo.value === filtrosAtuais.tipoRelatorio
	)?.label || 'Não especificado';

	const extensaoArquivoLabel = tipos_extensao_arquivo.find(
		(ext) => ext.value === filtrosAtuais.extensaoArquivo
	)?.label || 'Não especificada';

	return (
		<div className='w-full px-0 md:px-8 relative pb-20 md:pb-14 h-full md:container mx-auto'>
			<h1 className='text-xl md:text-4xl font-bold'>Relatórios</h1>
			<div className='grid grid-cols-1 max-w-sm mx-auto md:max-w-full gap-y-3 my-5 w-full'>
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
				<TabelaProgressaoARProtocoladas />
			</div>
		</div>
	);
}
