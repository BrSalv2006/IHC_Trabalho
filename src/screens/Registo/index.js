import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignUp } from "@clerk/clerk-react"

import Page from '../../components/Page'
import Header from '../../components/Header'
import ContentBox from '../../components/ContentBox'
import TextField from '../../components/TextField'
import PrimaryButton from '../../components/PrimaryButton'
import TextButton from '../../components/TextButton'
import ScreenSnackbar from "../../components/ScreenSnackbar"

import "./style.css"

function Registo() {
	const { isLoaded, signUp, setActive } = useSignUp()
	const navigate = useNavigate()

	const [nome, setNome] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [code, setCode] = useState("")

	const [pendingVerification, setPendingVerification] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})
	const [apiError, setApiError] = useState("")
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpenSnackbar(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!isLoaded || loading) {
			return
		}

		const newErrors = {}

		if (!nome) {
			newErrors.nome = "O nome é obrigatório."
		}

		if (!email) {
			newErrors.email = "O email é obrigatório."
		}

		if (!password) {
			newErrors.password = "A password é obrigatória."
		} else if (password.length < 8) {
			newErrors.password = "A password tem de ter pelo menos 8 caracteres."
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			await signUp.create({
				emailAddress: email,
				password: password,
			})

			await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
			setPendingVerification(true)
		} catch (error) {
			console.error("Erro no Clerk:", error)

			setApiError(error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || "Verifica os teus dados.")
			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	const handleVerify = async (e) => {
		e.preventDefault()
		if (!isLoaded || loading) {
			return
		}

		const newErrors = {}

		if (!code) {
			newErrors.code = "O código é obrigatório."
		}

		setErrors(newErrors)
		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			const completeSignUp = await signUp.attemptEmailAddressVerification({ code })

			if (completeSignUp.status === "complete") {
				await setActive({ session: completeSignUp.createdSessionId })
				navigate("/")
			}
		} catch (error) {
			console.error("Erro na verificação Clerk:", error)
			setApiError("O código está incorreto ou expirou. Tenta novamente.")
			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Page>
			<Header />
			<ContentBox className="register-content-box">
				{!pendingVerification ? (
					<>
						<h1 className="register-main-title">Registar</h1>
						<form key="register-form" onSubmit={handleSubmit}>
							<TextField
								label="Nome"
								type="text"
								autoComplete="name"
								value={nome}
								onChange={(e) => {
									setNome(e.target.value)
									setErrors({ ...errors, nome: "" })
								}}
								error={Boolean(errors.nome)}
								helperText={errors.nome}
								disabled={loading}
							/>
							<TextField
								label="Email"
								type="email"
								autoComplete="email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value)
									setErrors({ ...errors, email: "" })
								}}
								error={Boolean(errors.email)}
								helperText={errors.email}
								disabled={loading}
							/>
							<TextField
								label="Password"
								type="password"
								autoComplete="new-password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
									setErrors({ ...errors, password: "" })
								}}
								error={Boolean(errors.password)}
								helperText={errors.password}
								disabled={loading}
							/>
							<PrimaryButton
								type="submit"
								loading={loading}
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
				) : (
					<>
						<h1 className="register-main-title">Verifica o teu email</h1>
						<p className="register-subtitle">
							Enviámos um código para {email}. Insere-o abaixo para concluir o registo.
						</p>
						<form key="verify-form" onSubmit={handleVerify}>
							<TextField
								label="Código de verificação"
								type="text"
								autoComplete="one-time-code"
								value={code}
								onChange={(e) => {
									setCode(e.target.value)
									setErrors({ ...errors, code: "" })
								}}
								error={Boolean(errors.code)}
								helperText={errors.code}
								disabled={loading}
							/>
							<PrimaryButton
								type="submit"
								loading={loading}
							>
								Verificar Código
							</PrimaryButton>
						</form>
					</>
				)}
			</ContentBox>
			<ScreenSnackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				severity="error"
			>
				{apiError}
			</ScreenSnackbar>
		</Page>
	)
}

export default Registo
