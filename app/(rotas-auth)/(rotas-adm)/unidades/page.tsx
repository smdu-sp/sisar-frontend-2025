/** @format */

import React from 'react';
import { Filtros } from '@/components/filtros';
import { tipos_unidades } from '@/lib/utils';
import DataTable, { TableSkeleton } from '@/components/data-table';
import { columns } from '../../_components/columns';
import { Suspense } from 'react';
import { auth } from '@/lib/auth/auth';
import { IUnidades } from '@/types/unidades';

// const columns = []; // Define columns appropriately
export async function UnidadesPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {

	let { pagina = 1, limite = 10, total = 0 } = await searchParams;
	let ok = false;
	const {
		busca = '',
		tipo_unidade = 'all',
	} = await searchParams;
	let dados: IUnidades[] = [];

	const session = await auth();
	if (session && session.access_token) {
		const response = await fetch(
			`/api/unidades?pagina=${pagina}&limite=${limite}&busca=${busca}&tipo_unidade=${tipo_unidade}`,
			{
				headers: {
					Authorization: `Bearer ${session.access_token}`,
				},
			}
		);
		ok = response.ok;
		if (ok) {
			const data = await response.json();
			if (data) {
				const paginado = data as {
					pagina: number;
					limite: number;
					total: number;
					data: IUnidades[];
				};
				pagina = paginado.pagina || 1;
				limite = paginado.limite || 10;
				total = paginado.total || 0;
				dados = paginado.data || [];
			}
		}
	}


	return (
		<div className='  px-0 md:px-8 relative pb-20 md:pb-14 h-full container mx-auto '>
			<h2 className='text-xl md:text-4xl font-bold'>Unidades</h2>
			{/* <MenuUnidades /> */}
			<Filtros
				camposFiltraveis={[
					{
						nome: 'Busca',
						tag: 'busca',
						tipo: 0,
						placeholder: 'Digite o nome, email ou login',
					},
					{
						nome: 'Status',
						tag: 'tipo_unidade',
						tipo: 2,
						default: 'all',
						valores: tipos_unidades,
					},
				]}
			/>
			<DataTable
				columns={columns}
				data={dados || []}
				data={[]} // Define 'dados' or replace with an empty array 
			/>

		</div>
	)
}
