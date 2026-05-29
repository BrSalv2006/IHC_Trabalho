import React, { useState } from "react"
import { useSignUp } from "@clerk/clerk-react"
import { Box, Typography, TextField, Button, Link } from "@mui/material"
import { useNavigate } from "react-router-dom"
import saxLogo from "../assets/sax.jpg"

function Registo() {
	const { isLoaded, signUp, setActive } = useSignUp()

	// Estados para o formulário
	const [nome, setNome] = useState("") // Mantemos o estado visualmente, mas não enviamos para o Clerk
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	// Estados para a verificação do email
	const [pendingVerification, setPendingVerification] = useState(false)
	const [code, setCode] = useState("")

	const navigate = useNavigate()

	// Passo 1: Submeter os dados de registo
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!isLoaded) return

		// Proteção de tamanho da password (o Clerk exige pelo menos 8 caracteres)
		if (password.length < 8) {
			alert("A password tem de ter pelo menos 8 caracteres!")
			return
		}

		try {
			// Criar conta apenas com email e password para evitar o erro 422
			await signUp.create({
				emailAddress: email,
				password: password,
			})

			// Pede ao Clerk para enviar o código para o email
			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })

			// Avança para o ecrã do código
			setPendingVerification(true)
		} catch (err) {
			console.error("Erro no Clerk:", err)
			alert("Erro ao registar: " + (err.errors[0]?.longMessage || err.errors[0]?.message || "Verifica os teus dados."))
		}
	}

	// Passo 2: Verificação do Código
	const handleVerify = async (e) => {
		e.preventDefault()
		if (!isLoaded) return

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({
				code,
			})

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				navigate("/") // Sucesso! Redireciona para o Dashboard
			}
		} catch (err) {
			alert("O código está incorreto ou expirou. Tenta novamente.")
		}
	}

	return (
		<Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', fontFamily: 'sans-serif' }}>

			{/* Cabeçalho */}
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 6, justifyContent: 'center', gap: 2 }}>
				<img src={saxLogo} alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
				<Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A' }}>
					GENERATIVE JAZZ
				</Typography>
			</Box>

			{/* REGISTO NORMAL */}
			{!pendingVerification && (
				<>
					<Typography sx={{ fontSize: "32px", fontWeight: 700, color: "#1A1A1A", mb: 3 }}>
						Registar
					</Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							fullWidth label="Nome" margin="normal" variant="outlined"
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
						/>
						<TextField
							fullWidth label="Email" margin="normal" variant="outlined"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
						/>
						<TextField
							fullWidth label="Password" type="password" margin="normal" variant="outlined"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
						/>

						<Button fullWidth type="submit" variant="contained"
							sx={{ mt: 3, bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>
							Registar
						</Button>
					</form>

					<Typography sx={{ mt: 3, textAlign: 'center', fontSize: '14px' }}>
						Já tem conta? <Link href="/login" sx={{ color: '#6750A4', fontWeight: 'bold', textDecoration: 'none' }}>Entrar</Link>
					</Typography>
				</>
			)}

			{/* PEDIDO DE CÓDIGO DE VERIFICAÇÃO */}
			{pendingVerification && (
				<>
					<Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2 }}>
						Verifica o teu email
					</Typography>
					<Typography sx={{ mb: 3, color: '#666' }}>
						Enviámos um código para {email}. Insere-o abaixo para concluir o registo.
					</Typography>

					<form onSubmit={handleVerify}>
						<TextField
							fullWidth label="Código de verificação" margin="normal" variant="outlined"
							value={code}
							onChange={(e) => setCode(e.target.value)}
							sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px' } }}
						/>

						<Button fullWidth type="submit" variant="contained"
							sx={{ mt: 3, bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>
							Verificar Código
						</Button>
					</form>
				</>
			)}

		</Box>
	)
}

export default Registo
