import { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import { Box, Button, TextField, Typography, AppBar, Container, Toolbar, Link, Paper } from '@mui/material'

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
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar>
                        <Typography variant="h6">
                            Área de administração
                        </Typography>
                        <Box sx={{ display: 'flex', flexGrow: 1 }}>
                            <Link component={RouterLink} to="/admin/restaurantes">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Restaurantes
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/restaurantes/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo restaurante
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ padding: 2 }}>
                <Container maxWidth="lg" sx={{ mt: 1}}>
                    <Paper sx={{ p: 2 }}>
                        {
                            // Conteúdo da página
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flexGrow: 1
                            }}>
                                <Typography component="h1" variant="h6">
                                    Formulário de restaurante
                                </Typography>
                                <Box component="form" sx={{ width: '100%'}} onSubmit={aoSubmeterForm}>
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
                        }
                    </Paper>
                </Container>
            </Box>            
        </>
    )
}

export default FormularioRestaurante