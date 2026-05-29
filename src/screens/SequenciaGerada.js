import React, { useState, useEffect } from "react"
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import logo from "../assets/logo.jpg"

const BASE_URL = "https://genjazz-api.fly.dev"

function SequenciaGerada() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUser()
	const email = user?.primaryEmailAddress?.emailAddress

	// Recupera as escolhas passadas
	const { selectedKey, selectedStructure, selectedModulation } = location.state || {}

	const [progression, setProgression] = useState(null)
	const [audioUrl, setAudioUrl] = useState(null)
	const [audioLoading, setAudioLoading] = useState(false)
	const [saving, setSaving] = useState(false)

	useEffect(() => {
		const generate = async () => {
			if (!selectedKey) {
				navigate("/")
				return
			}
			try {
				const key = selectedKey || "Random"
				const structure = selectedStructure || "Random"
				const modulation = selectedModulation || "Random"

				const url = `${BASE_URL}/api/generate/${encodeURIComponent(key)}/${encodeURIComponent(structure)}/${encodeURIComponent(modulation)}`
				const res = await fetch(url)

				if (!res.ok) throw new Error(`Falha no servidor: ${res.status}`)

				const data = await res.json()
				setProgression(data)
			} catch (err) {
				console.error("Erro ao gerar sequência:", err)
				alert("Erro ao comunicar com o motor generativo.")
			}
		}
		generate()
	}, [selectedKey, selectedStructure, selectedModulation, navigate])

	const handlePlay = async () => {
		if (!progression?.chords) return
		setAudioLoading(true)
		try {
			const encoded = encodeURIComponent(progression.chords)
			const res = await fetch(`${BASE_URL}/api/chords2mp3/${encoded}`)
			const data = await res.json()
			setAudioUrl(`${BASE_URL}${data.mp3_url}`)
		} catch (err) {
			console.error("Erro no áudio:", err)
			alert("Não foi possível gerar o áudio desta sequência.")
		} finally {
			setAudioLoading(false)
		}
	}

	const handleSave = async () => {
		if (!progression?.chords || !email) return
		setSaving(true)
		try {
			await fetch(`${BASE_URL}/api/chords`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email,
					chords: progression.chords,
					key: progression.key,
					structure: selectedStructure || "Random",
					modulation: selectedModulation || "Random"
				})
			})
			alert("Sequência guardada com sucesso!")
		} catch (err) {
			console.error("Erro a guardar:", err)
			alert("Erro ao guardar sequência.")
		} finally {
			setSaving(false)
		}
	}

	const compassos = progression?.chords ? progression.chords.split('|') : []

	return (
		<Box sx={{
			p: 2.5,
			pb: 4,
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			boxSizing: 'border-box',
			fontFamily: 'sans-serif'
		}}>
			{/* Cabeçalho */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between', bgcolor: '#FDF5FF', p: 1.5, px: 2, borderRadius: '50px' }}>
				<IconButton onClick={() => navigate("/")} sx={{ p: 0, color: '#1A1A1A' }}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				</IconButton>
				<Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1A1A1A' }}>GENERATIVE JAZZ</Typography>
				<img src={logo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
			</Box>

			<Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2, textAlign: 'center' }}>
				Sequência Gerada
			</Typography>

			{/* Conteúdo Central (Scrollable) */}
			<Box sx={{
				flex: 1,
				overflowY: 'auto', // Permite fazer scroll se a tabela for muito grande
				minHeight: 0, // Necessário para o flexbox gerir o scroll corretamente
				display: 'flex',
				flexDirection: 'column',
				mb: 3, // Margem antes dos botões
				pr: 1 // Pequeno espaço à direita para o scrollbar não colar
			}}>
				{!progression ? (
					<Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress color="secondary" /></Box>
				) : (
					<>
						{/* Tabela de Acordes */}
						<Box sx={{
							display: 'grid',
							gridTemplateColumns: 'repeat(4, 1fr)',
							borderTop: '1px solid #1A1A1A',
							borderLeft: '1px solid #1A1A1A',
							mb: 3
						}}>
							{compassos.map((compasso, i) => (
								<Box key={i} sx={{
									borderRight: '1px solid #1A1A1A',
									borderBottom: '1px solid #1A1A1A',
									bgcolor: '#FDF5FF',
									p: 1.5,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									textAlign: 'center'
								}}>
									<Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#1A1A1A' }}>
										{compasso.replace(/,/g, ' ')}
									</Typography>
								</Box>
							))}
						</Box>

						{/* Audio Player (fica logo abaixo da grelha, rola com o ecrã) */}
						{audioUrl && (
							<Box sx={{ mb: 2, width: '100%' }}>
								<audio controls src={audioUrl} style={{ width: '100%' }} autoPlay />
							</Box>
						)}
					</>
				)}
			</Box>

			{/* Botões Inferiores (Sempre fixos na base) */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Button
					fullWidth
					variant="contained"
					onClick={handlePlay}
					disabled={!progression || audioLoading || !!audioUrl}
					sx={{ bgcolor: '#C845E9', color: '#FFF', border: '1px solid #1A1A1A', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', boxShadow: 'none', '&:hover': { bgcolor: '#b034d1', boxShadow: 'none' }, '&.Mui-disabled': { bgcolor: '#EED8F2', color: '#666' } }}
				>
					{audioLoading ? <CircularProgress size={24} color="inherit" /> : "Ouvir"}
				</Button>

				<Button
					fullWidth
					variant="contained"
					onClick={handleSave}
					disabled={!progression || saving}
					sx={{ bgcolor: '#C845E9', color: '#FFF', border: '1px solid #1A1A1A', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', boxShadow: 'none', '&:hover': { bgcolor: '#b034d1', boxShadow: 'none' }, '&.Mui-disabled': { bgcolor: '#EED8F2', color: '#666' } }}
				>
					{saving ? "A guardar..." : "Guardar"}
				</Button>

				<Button
					fullWidth
					variant="outlined"
					onClick={() => navigate("/")}
					sx={{ color: '#1A1A1A', bgcolor: '#FDF5FF', borderColor: '#1A1A1A', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', '&:hover': { bgcolor: '#EED8F2', borderColor: '#1A1A1A' } }}
				>
					Concluir
				</Button>
			</Box>
		</Box>
	)
}

export default SequenciaGerada
