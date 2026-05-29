import React from "react"
import { useUser, SignOutButton } from "@clerk/clerk-react"
import { Box, Typography, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import saxLogo from "../assets/sax.jpg"

function Dashboard() {
	const { user } = useUser()
	const navigate = useNavigate()

	return (
		<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'sans-serif' }}>

			{/* Cabeçalho */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 6, justifyContent: 'center', gap: 2, bgcolor: '#F9F7FD', p: 2, borderRadius: '20px' }}>
				<img src={saxLogo} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
				<Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
					GENERATIVE JAZZ
				</Typography>
			</Box>

			{/* Saudação */}
			<Typography sx={{ fontSize: "32px", fontWeight: 700, color: "#1A1A1A", mb: 8, textAlign: 'center' }}>
				Olá, {user?.firstName || "utilizador"}!
			</Typography>

			{/* Botões de Ação */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Button
					fullWidth
					variant="contained"
					onClick={() => navigate("/tonalidade")}
					sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 2, textTransform: 'none', fontSize: '16px' }}
				>
					Criar nova sequência
				</Button>

				<Button
					fullWidth
					variant="contained"
					onClick={() => navigate("/minhas-sequencias")}
					sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 2, textTransform: 'none', fontSize: '16px' }}
				>
					As minhas sequências
				</Button>
			</Box>

			{ }
			<Box sx={{ mt: 'auto', textAlign: 'center' }}>
				<SignOutButton>
					<Button sx={{ color: '#6750A4', textTransform: 'none' }}>Sair</Button>
				</SignOutButton>
			</Box>
		</Box>
	)
}

export default Dashboard
