import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import IPrato from '../../../interfaces/IPrato'

const AdministracaoPratos: React.FC = () => {

    const [pratos, setPratos] = useState<IPrato[]>([])	

	useEffect(() => {
		http.get<IPrato[]>('/pratos/')			
			.then(res => setPratos(res.data))
			.catch(error => console.log(error))
	}, [])

	const excluir = (restaurante: IPrato) => {
		if (window.confirm(`Deseja realmente excluir o restaurante "${restaurante.nome}"?`)) {
			http.delete(`/pratos/${restaurante.id}/`)
				.then(() => {
					setPratos(pratos.filter(r => r.id !== restaurante.id))
				})
				.catch(error => console.log(error))
		}
	}

    return (
        <TableContainer component={Paper}>
			<Table>
				<TableHead style={{ backgroundColor: '#608ceb' }}>
					<TableRow>
						<TableCell>Nome</TableCell>                        
                        <TableCell>Tag</TableCell>
                        <TableCell>Imagem</TableCell>												
						<TableCell colSpan={2}>Opções</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{pratos.map(prato => 
						<TableRow key={prato.id}>
							<TableCell>{prato.nome}</TableCell>							                            
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>
                                [ <a href={prato.imagem} target="_blank" rel="noreferer">Ver imagem</a> ]
                            </TableCell>														
							<TableCell width={100}>
								[ <Link to={`/admin/pratos/${prato.id}`}>Editar</Link> ]								
							</TableCell>
							<TableCell width={100}>
								<Button 
									variant="outlined" 
									color="error"
									onClick={() => excluir(prato)}>
									    Excluir
								</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>				
		</TableContainer>
    )
}

export default AdministracaoPratos