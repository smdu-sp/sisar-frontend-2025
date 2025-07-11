/** @format */

'use client';
import React, { useState } from 'react';
import { FormGeneric } from '@/components/ui/formGeneric';
import { Button } from '@/components/ui/button';

import {
    Select,
    SelectContent,
    SelectGroup, // Se você for agrupar opções
    SelectItem,
    SelectLabel, // Se for usar labels em grupos
    SelectTrigger,
    SelectValue,
    SelectSeparator, // Se for usar separadores
} from '@/components/ui/select';

import { Input } from '@/components/ui/input';

export function FormImportacao() {
    const [selectedFileType, setSelectedFileType] = useState('');

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        } else {
            setSelectedFile(null);
        }
    };

    const handleCancel = () => {
        console.log('Ação de Cancelar');
    };

    const handleSave = () => {
        console.log('Ação de Salvar');

        if (selectedFileType && selectedFile) {
            console.log(`Upload: ${selectedFileType}, Arquivo: ${selectedFile.name}`);
        } else {
            alert('Por favor, selecione o tipo de arquivo e carregue um arquivo.');
        }
    };

    return (
        <FormGeneric
            className="w-[800px] h-[500px] flex flex-col border-1 border-input  p-4 gap-4 rounded-2xl shadow-xs" // Adicione padding e gap para melhor visualização
        >
            <label className="text-lg font-semibold mb-2">Tipo de arquivo</label>

            <Select
                value={selectedFileType}
                onValueChange={setSelectedFileType}
            >
                <SelectTrigger className="w-full h-[50px] bg-white border border-gray-300 rounded-md px-3 py-2"> {/* O "campo" visível do select */}
                    {/* O texto que aparece dentro do campo Select quando nada está selecionado */}
                    <SelectValue placeholder="Selecione o tipo de distribuição" />
                </SelectTrigger>

                <SelectContent> {/* O conteúdo do dropdown que aparece */}
                    <SelectGroup>
                        <SelectLabel>Tipos de Distribuição</SelectLabel>
                        {/* Se "Distribuição" é uma opção real, e não apenas um placeholder */}
                        <SelectItem value="distribuicao">Distribuição</SelectItem>
                    </SelectGroup>
                    <SelectSeparator />
                    <SelectItem value="outros">Outros</SelectItem>
                </SelectContent>
            </Select>


            <label htmlFor="file-upload" className="text-lg font-semibold mb-2 mt-4">Arquivo</label>
            <Input
                id="file-upload"
                className="w-full h-[50px] bg-white border border-gray-300 rounded-md px-3 py-2" // Adicione classes de estilização
                type="file"
                placeholder="Upload"
                onChange={handleFileChange}
            />
            {selectedFile && <p className="text-sm text-gray-500">Arquivo selecionado: {selectedFile.name}</p>}


            <div className="flex justify-end gap-2 mt-auto">
                <Button
                    variant={'destructive'}
                    className="rounded-sm gap-1 w-[90px] h-[35px]"
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Button
                    className="rounded-sm gap-1 w-[90px] h-[35px]"
                    onClick={handleSave}
                >
                    Salvar
                </Button>
            </div>
        </FormGeneric>
    );
}