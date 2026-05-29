import React, { useState } from "react"
import { useUser, SignOutButton } from "@clerk/clerk-react"
import { Box, Typography, Button, Menu, MenuItem, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import saxLogo from "../assets/sax.jpg"

function Dashboard() {
	const { user } = useUser()
	const navigate = useNavigate()

	// Estados para controlar a abertura/fecho do Menu
	const [anchorEl, setAnchorEl] = useState(null)
	const open = Boolean(anchorEl)

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	const handleAlterarPassword = () => {
		handleMenuClose()
		navigate("/alterar-password")
	}

	return (
		<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'sans-serif' }}>

			{/* Cabeçalho */}
			<Box sx={{ 
				display: 'flex', 
				alignItems: 'center', 
				mb: 6, 
				justifyContent: 'space-between', // Separa o texto (esquerda) do logo (direita)
				bgcolor: '#F9F7FD', 
				p: 1.5, 
				px: 3, // Maior espaçamento lateral para simular a "pílula" do Figma
				borderRadius: '50px' 
			}}>
				<Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
					GENERATIVE JAZZ
				</Typography>
				
				<IconButton onClick={handleMenuClick} sx={{ p: 0 }}>
					<img src={saxLogo} alt="Logo Generative Jazz" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
				</IconButton>
			</Box>

			{/* Dropdown Menu */}
			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				sx={{ mt: 1 }}
				PaperProps={{
					sx: {
						borderRadius: '15px',
						bgcolor: '#F9F7FD',
						minWidth: '180px',
						boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
					}
				}}
			>
				<MenuItem onClick={handleAlterarPassword} sx={{ fontSize: '15px', py: 1.5, color: '#1A1A1A' }}>
					Alterar password
				</MenuItem>
				
				{/* O SignOutButton do Clerk pode envolver diretamente um MenuItem */}
				<SignOutButton>
					<MenuItem sx={{ fontSize: '15px', py: 1.5, color: '#1A1A1A' }}>
						Sair
					</MenuItem>
				</SignOutButton>
			</Menu>

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
		</Box>
	)
}

export default Dashboard