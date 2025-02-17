import React, { useEffect, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import http from '../../../http';
import ITag from '../../../interfaces/ITag';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';

const FormularioPrato: React.FC = () => {
    
    const [prato, setPrato] = useState<IPrato>({ nome: '', descricao: '', tag: '', imagem: '', restaurante: 0, id: 0 })
    const [tags, setTags] = useState<ITag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [imagem, setImagem] = useState<File | null>()

    const aoAlterarCampo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPrato({ ...prato, [name]: value })
    }

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(prato);
    }

    const selecionaArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
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
                    onChange={aoAlterarCampo}
                    variant="standard"
                    label="Nome do prato"
                    required
                    fullWidth
                    margin="dense" 
                />
                <TextField
                    value={prato.descricao}
                    onChange={aoAlterarCampo}
                    variant="standard"
                    label="Descrição do prato"
                    required
                    fullWidth 
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag">Tag</InputLabel>
                    <Select labelId="select-tag" value={prato.tag} 
                        onChange={e => setPrato({ ...prato, tag: e.target.value as string })}>
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
                        onChange={e => setPrato({ ...prato, restaurante: parseInt(e.target.value as string) })}
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