import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';

const pratoIncial: IPrato = { 
    nome: "", descricao: "", tag: "", imagem: "", restaurante: 0, id: 0 
}

const FormularioPrato: React.FC = () => {    

    const [prato, setPrato] = useState<IPrato>(pratoIncial)
    const [imagem, setImagem] = useState<File | null>(null)

    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    const aoEditarCampo = (nome: string, valor: Object) => {  
        setPrato({ ...prato, [nome]: valor })
    } 
    
    const selecionaArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        let imagem = null
        if (e.target.files && e.target.files.length > 0) {
            imagem = e.target.files[0]
        }
        setImagem(imagem)
    }
    
    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("nome", prato.nome)
        formData.append("descricao", prato.descricao)
        formData.append("tag", prato.tag)
        formData.append("restaurante", prato.restaurante.toString())

        if (imagem) {
            formData.append("imagem", imagem)
        }

        http.request({
            url: "pratos/",
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formData
        })
            .then(() => {
                setPrato(pratoIncial) 
                alert("Prato cadastrado com sucesso!")
            })
            .catch(error => console.log(error))
    }
    useEffect(() => {
        
        http.get< {tags: ITag[]} >('tags/')
            .then(res => {
                setTags(res.data.tags)
            })
            .catch(error => console.log(error));

        http.get<IRestaurante[]>('restaurantes/')
            .then(res => {
                setRestaurantes(res.data)
            })
            .catch(error => console.log(error))

    }, [])

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1
        }}>
            <Typography component="h1" variant="h6">
                Formulário de prato
            </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                
                <TextField                    
                    value={prato.nome}
                    onChange={e => aoEditarCampo('nome', e.target.value)}
                    variant="standard"
                    label="Nome do prato"
                    required
                    fullWidth
                    margin="dense" 
                />

                <TextField                    
                    value={prato.descricao}
                    onChange={e => aoEditarCampo('descricao', e.target.value)}
                    variant="standard"
                    label="Descrição do prato"
                    required
                    fullWidth 
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={prato.tag} 
                        onChange={e => aoEditarCampo('tag', e.target.value)}>
                        {
                            tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel>Restaurante</InputLabel>
                    <Select
                        value={prato.restaurante}
                        onChange={e => aoEditarCampo('restaurante', parseInt(e.target.value as string))}
                    >
                        {
                            restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>)
                        }
                    </Select>
                </FormControl>
                
                <input type="file" accept="image/*"
                    onChange={selecionaArquivo} />                

                <Button
                    sx={{ marginTop: 2 }}
                    variant="outlined"
                    type="submit"
                    fullWidth>
                    Salvar
                </Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato