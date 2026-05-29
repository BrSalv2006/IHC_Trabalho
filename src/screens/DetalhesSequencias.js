import React, { useState } from "react"
import { Box, Typography, Button, IconButton, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import logo from "../assets/logo.jpg"

const BASE_URL = "https://genjazz-api.fly.dev"

function DetalhesSequencias() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUser()
	const email = user?.primaryEmailAddress?.emailAddress

	// Recebe a sequência passada pelo ecrã "Minhas Sequências"
	const { sequencia } = location.state || {}

	const [audioUrl, setAudioUrl] = useState(null)
	const [audioLoading, setAudioLoading] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)

	// Converte os acordes em array para a tabela
	const compassos = sequencia?.chords ? sequencia.chords.split('|') : []

	const handlePlay = async () => {
		if (!sequencia?.chords) return
		setAudioLoading(true)
		try {
			const encoded = encodeURIComponent(sequencia.chords)
			const res = await fetch(`${BASE_URL}/api/chords2mp3/${encoded}`)
			const data = await res.json()
			setAudioUrl(`${BASE_URL}${data.mp3_url}`)
		} catch (err) {
			alert("Erro ao gerar áudio.")
		} finally {
			setAudioLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!email || !sequencia?.id) return
		setDeleting(true)
		try {
			await fetch(`${BASE_URL}/api/chords/${email}/${sequencia.id}`, { method: "DELETE" })
			setOpenDialog(false)
			navigate("/minhas-sequencias")
		} catch (err) {
			alert("Erro ao apagar sequência.")
		} finally {
			setDeleting(false)
		}
	}

	return (
		<Box sx={{ p: 2.5, pb: 4, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
			{/* Cabeçalho */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between', bgcolor: '#FDF5FF', p: 1.5, px: 2, borderRadius: '50px' }}>
				<IconButton onClick={() => navigate(-1)} sx={{ p: 0, color: '#1A1A1A' }}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				</IconButton>
				<Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1A1A1A' }}>GENERATIVE JAZZ</Typography>
				<img src={logo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
			</Box>

			<Typography sx={{ fontSize: "28px", fontWeight: 700, color: '#1A1A1A', mb: 2, textAlign: 'center' }}>Sequência</Typography>

			{/* 1. Tabela com Scroll */}
			<Box sx={{ flex: 1, overflowY: 'auto', mb: 2, minHeight: '100px' }}>
				<Box sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(4, 1fr)',
					borderTop: '1px solid #1A1A1A',
					borderLeft: '1px solid #1A1A1A'
				}}>
					{compassos.map((compasso, i) => (
						<Box key={i} sx={{ borderRight: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', bgcolor: '#FDF5FF', p: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
							<Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1A1A1A' }}>{compasso.replace(/,/g, ' ')}</Typography>
						</Box>
					))}
				</Box>
			</Box>

			{/* 2. Áudio e Botões (Fixos na base) */}
			<Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid #eee' }}>
				{audioUrl && (
					<Box sx={{ mb: 2, width: '100%' }}>
						<audio controls src={audioUrl} style={{ width: '100%' }} autoPlay />
					</Box>
				)}

				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Button fullWidth variant="contained" onClick={handlePlay} sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>
						{audioLoading ? <CircularProgress size={24} color="inherit" /> : "Ouvir"}
					</Button>
					<Button fullWidth variant="outlined" onClick={() => setOpenDialog(true)} sx={{ color: '#C845E9', borderColor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>
						Apagar
					</Button>
				</Box>
			</Box>

			{/* Diálogo de Confirmação */}
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ sx: { borderRadius: '20px', p: 1 } }}>
				<DialogTitle sx={{ fontWeight: 'bold' }}>Confirmar</DialogTitle>
				<DialogContent>
					<DialogContentText>Esta ação não pode ser desfeita.</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 2, pt: 0 }}>
					<Button onClick={() => setOpenDialog(false)} variant="outlined" sx={{ color: '#1A1A1A', borderColor: '#1A1A1A', borderRadius: '10px' }}>Cancelar</Button>
					<Button onClick={handleDelete} variant="contained" sx={{ bgcolor: '#C845E9', borderRadius: '10px' }} disabled={deleting}>
						{deleting ? "A apagar..." : "Apagar"}
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

export default DetalhesSequencias
