import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material'

import http from '../../../http'
import IRestaurante from '../../../interfaces/IRestaurante'

const FormularioRestaurante = () => {

    const params = useParams()
    const [nome, setNome] = useState('')

    useEffect(() => {
        if (params.id) {
            http.get<IRestaurante>(`/restaurantes/${params.id}/`)
                .then(res => {
                    setNome(res.data.nome)
                })
                .catch(error => console.log(error))
        }
    }, [params.id])

    const aoSubmeterForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (params.id) {
            http.put(`/restaurantes/${params.id}/`, {
                nome
            })
                .then(() => {
                    alert('Restaurante atualizado com sucesso!')
                })
                .catch((error) => console.log(error))
            return
        } else {
            http.post('/restaurantes/', {
                nome
            })
                .then(() => {
                    alert('Restaurante cadastrado com sucesso!')
                    setNome('')
                })
                .catch((error) => console.log(error))
        }

    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1
        }}>
            <Typography component="h1" variant="h6">
                Formulário de restaurante
            </Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    variant="standard"
                    label="Nome do restaurante"
                    required
                    fullWidth />
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

export default FormularioRestaurante