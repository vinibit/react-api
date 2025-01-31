import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {

	const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])	

	useEffect(() => {
		http.get<IRestaurante[]>('/restaurantes/')			
			.then(res => setRestaurantes(res.data))
			.catch(error => console.log(error))
	}, [])

	const excluir = (restaurante: IRestaurante) => {
		if (window.confirm(`Deseja realmente excluir o restaurante "${restaurante.nome}"?`)) {
			http.delete(`/restaurantes/${restaurante.id}/`)
				.then(() => {
					setRestaurantes(restaurantes.filter(r => r.id !== restaurante.id))
				})
				.catch(error => console.log(error))
		}
	}

	return (
		<TableContainer>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Nome</TableCell>						
						<TableCell colSpan={2}>Opções</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{restaurantes.map(restaurante => 
						<TableRow key={restaurante.id}>
							<TableCell>{restaurante.nome}</TableCell>							
							<TableCell width={100}>
								[ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]								
							</TableCell>
							<TableCell width={100}>
								<Button 
									variant="outlined" 
									color="error"
									onClick={() => excluir(restaurante)}>
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

export default AdministracaoRestaurantes