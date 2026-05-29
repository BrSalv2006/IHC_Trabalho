import React, { useState } from "react"
import { useSignUp } from "@clerk/clerk-react"
import Page from '../../components/Page'
import Header from '../../components/Header'
import ContentBox from '../../components/ContentBox'
import TextField from '../../components/TextField'
import PrimaryButton from '../../components/PrimaryButton'
import TextButton from '../../components/TextButton'
import { useNavigate } from "react-router-dom"
import "./style.css" // Importa os novos estilos otimizados

function Registo() {
	const { isLoaded, signUp, setActive } = useSignUp()

	// Estados para o formulário
	const [nome, setNome] = useState("")
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

		if (password.length < 8) {
			alert("A password tem de ter pelo menos 8 caracteres!")
			return
		}

		try {
			await signUp.create({
				emailAddress: email,
				password: password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
			setPendingVerification(true)
		} catch (err) {
			console.error("Erro no Clerk:", err)
			alert("Erro ao registar: " + (err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Verifica os teus dados."))
		}
	}

	// Passo 2: Verificação do Código
	const handleVerify = async (e) => {
		e.preventDefault()
		if (!isLoaded) return

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({ code })

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				navigate("/")
			}
		} catch (err) {
			alert("O código está incorreto ou expirou. Tenta novamente.")
		}
	}

	return (
		<Page>
			<Header />
			<ContentBox className="register-content-box">
				{!pendingVerification && (
					<>
						<h1 className="register-main-title">Registar</h1>

						<form onSubmit={handleSubmit}>
							<TextField
								fullWidth
								label="Nome"
								type="text"
								autoComplete="name"
								margin="normal"
								variant="outlined"
								value={nome}
								onChange={(e) => setNome(e.target.value)}
							/>
							<TextField
								fullWidth
								label="Email"
								type="email"
								autoComplete="email"
								margin="normal"
								variant="outlined"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<TextField
								fullWidth
								label="Password"
								type="password"
								autoComplete="new-password"
								margin="normal"
								variant="outlined"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<PrimaryButton
								fullWidth
								type="submit"
								variant="contained"
							>
								Registar
							</PrimaryButton>
						</form>

						<p className="register-footer-text">
							Já tem conta?{" "}
							<TextButton
								onClick={() => navigate("/login")}
							>
								Entrar
							</TextButton>
						</p>
					</>
				)}
				{pendingVerification && (
					<>
						<h1 className="register-main-title">Verifica o teu email</h1>
						<p className="register-subtitle">
							Enviámos um código para {email}. Insere-o abaixo para concluir o registo.
						</p>

						<form onSubmit={handleVerify}>
							<TextField
								fullWidth
								label="Código de verificação"
								margin="normal"
								variant="outlined"
								value={code}
								onChange={(e) => setCode(e.target.value)}
							/>

							<PrimaryButton
								fullWidth
								type="submit"
								variant="contained"
							>
								Verificar Código
							</PrimaryButton>
						</form>
					</>
				)}
			</ContentBox>
		</Page>
	)
}

export default Registo
