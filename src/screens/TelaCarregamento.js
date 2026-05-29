import React, { useEffect, useState, useCallback } from "react"
import { Box, Typography, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import logo from "../assets/logo.jpg"

const BASE_URL = "https://genjazz-api.fly.dev"

function TelaCarregamento() {
	const navigate = useNavigate()
	const location = useLocation()
	const [openError, setOpenError] = useState(false)
	const [loading, setLoading] = useState(true)

	const gerarSequencia = useCallback(async () => {
		setLoading(true)
		setOpenError(false)
		try {
			const { selectedKey, selectedStructure, selectedModulation } = location.state || {}

			const url = `${BASE_URL}/api/generate/${encodeURIComponent(selectedKey)}/${encodeURIComponent(selectedStructure)}/${encodeURIComponent(selectedModulation)}`
			const res = await fetch(url)

			if (!res.ok) throw new Error("Erro na API")

			const data = await res.json()
			// Se tudo correr bem, passa os dados da progressão para o ecrã seguinte
			navigate("/sequencia-gerada", { state: { ...location.state, progression: data }, replace: true })
		} catch (err) {
			setLoading(false)
			setOpenError(true) // Mostra o erro do image_f0fb43.png
		}
	}, [location.state, navigate])

	useEffect(() => {
		gerarSequencia()
	}, [gerarSequencia])

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', bgcolor: '#FFFFFF', fontFamily: 'sans-serif' }}>
			{loading && (
				<>
					<Box component="img" src={logo} alt="Logo" sx={{ width: '60px', height: '60px', mb: 3 }} />
					<Typography sx={{ fontSize: "20px", color: "#1A1A1A" }}>A gerar sequência...</Typography>
				</>
			)}

			{/* Diálogo de Erro conforme image_f0fb43.png */}
			<Dialog open={openError} PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
				<DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Erro</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ textAlign: 'center' }}>
						Não foi possível gerar a sequência.
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ justifyContent: 'center', p: 2 }}>
					<Button onClick={gerarSequencia} variant="contained" sx={{ bgcolor: '#C845E9', borderRadius: '15px', textTransform: 'none' }}>
						Tentar Novamente
					</Button>
					<Button onClick={() => navigate("/")} variant="outlined" sx={{ color: '#1A1A1A', borderColor: '#1A1A1A', borderRadius: '15px', textTransform: 'none' }}>
						Cancelar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default TelaCarregamento
