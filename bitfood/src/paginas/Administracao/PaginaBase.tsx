import React from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom'
import { Box, Button, Typography, AppBar, Container, Toolbar, Link, Paper } from '@mui/material'
import LoadingSpinner from '../../componentes/LoadingSpinner'
import { useLoadingSpinner } from '../../componentes/LoadingSpinner/useLoadingSpinner'

const PaginaBase: React.FC = () => {

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
                            <Link component={RouterLink} to="/admin/pratos/">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Pratos
                                </Button>
                            </Link>
                            <Link component={RouterLink} to="/admin/pratos/novo">
                                <Button sx={{ my: 2, color: 'white' }}>
                                    Novo prato
                                </Button>
                            </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>            

            <Box>
                <Container maxWidth="lg" sx={{ mt: 1}}>
                    <LoadingSpinner message="Carregando..." />                
                    <Paper sx={{ p: 2 }}>
                        <Outlet />
                    </Paper>
                </Container>
            </Box>            
        </>
    )
}

export default PaginaBase