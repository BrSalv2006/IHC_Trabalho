import React, { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { Box, Typography, TextField, Button, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"


function AlterarPassword() {
	// Usamos o useUser para obter o utilizador atualmente logado
	const { user } = useUser()
	const navigate = useNavigate()

	// Estados para as passwords
	const [novaPassword, setNovaPassword] = useState("")
	const [repetirPassword, setRepetirPassword] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Validações básicas
		if (novaPassword !== repetirPassword) {
			alert("As passwords não coincidem!")
			return
		}

		if (novaPassword.length < 8) {
			alert("A password tem de ter pelo menos 8 caracteres!")
			return
		}

		try {
			// Atualiza a password do utilizador atual no Clerk
			await user.updatePassword({ newPassword: novaPassword })

			alert("Password alterada com sucesso!")
			navigate("/") // Redireciona de volta para o Dashboard
		} catch (err) {
			console.error("Erro no Clerk:", err)
			alert("Erro ao alterar a password: " + (err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Verifica os teus dados."))
		}
	}

	return (
		<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', fontFamily: 'sans-serif' }}>


			{/* Título */}
			<Typography sx={{ fontSize: "32px", fontWeight: 700, color: "#1A1A1A", mb: 3 }}>
				Alterar Password
			</Typography>

			<form onSubmit={handleSubmit}>
				{/* Campo de Email - Preenchido automaticamente e apenas de leitura */}
				<TextField
					fullWidth label="Email" margin="normal" variant="outlined"
					value={user?.primaryEmailAddress?.emailAddress || ""}
					InputProps={{
						readOnly: true,
					}}
					sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', backgroundColor: '#f5f5f5' } }}
				/>

				<TextField
					fullWidth label="Nova password" type="password" margin="normal" variant="outlined"
					value={novaPassword}
					onChange={(e) => setNovaPassword(e.target.value)}
					sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
				/>

				<TextField
					fullWidth label="Repetir nova password" type="password" margin="normal" variant="outlined"
					value={repetirPassword}
					onChange={(e) => setRepetirPassword(e.target.value)}
					sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
				/>

				<Button fullWidth type="submit" variant="contained"
					sx={{ mt: 3, bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>
					Alterar
				</Button>
			</form>

			{/* Botão de Voltar */}
			<Typography sx={{ mt: 3, textAlign: 'center', fontSize: '14px' }}>
				<Link
					component="button"
					onClick={() => navigate("/")}
					sx={{ color: '#6750A4', fontWeight: 'bold', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
				>
					Voltar
				</Link>
			</Typography>

		</Box>
	)
}

export default AlterarPassword
