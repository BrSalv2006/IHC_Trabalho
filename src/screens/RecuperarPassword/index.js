import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignIn } from "@clerk/clerk-react"

import Page from '../../components/Page'
import Header from '../../components/Header'
import ContentBox from '../../components/ContentBox'
import TextField from '../../components/TextField'
import PrimaryButton from '../../components/PrimaryButton'
import TextButton from '../../components/TextButton'
import ScreenSnackbar from "../../components/ScreenSnackbar"

import "./style.css"

function RecuperarPassword() {
	const { isLoaded, signIn, setActive } = useSignIn()
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [code, setCode] = useState("")
	const [password, setPassword] = useState("")

	const [pendingVerification, setPendingVerification] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	const [apiMessage, setApiMessage] = useState("")
	const [snackbarSeverity, setSnackbarSeverity] = useState("error")
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpenSnackbar(false)
	}

	const handleRequestCode = async (e) => {
		e.preventDefault()

		if (!isLoaded || loading) {
			return
		}

		const newErrors = {}

		if (!email) {
			newErrors.email = "O email é obrigatório."
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			await signIn.create({
				strategy: "reset_password_email_code",
				identifier: email,
			})

			setPendingVerification(true)
			setApiMessage("Foi enviado um código para o teu email!")
			setSnackbarSeverity("success")
			setOpenSnackbar(true)
		} catch (error) {
			console.error("Erro no Clerk:", error)

			setApiMessage(error?.errors?.[0]?.longMessage || error?.errors?.[0]?.message || "Ocorreu um erro. Verifica o teu email.")
			setSnackbarSeverity("error")
			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	const handleResetPassword = async (e) => {
		e.preventDefault()

		if (!isLoaded || loading) {
			return
		}

		const newErrors = {}

		if (!code) {
			newErrors.code = "O código é obrigatório."
		}

		if (!password) {
			newErrors.password = "A nova password é obrigatória."
		} else if (password.length < 8) {
			newErrors.password = "A password tem de ter pelo menos 8 caracteres."
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			const result = await signIn.attemptFirstFactor({
				strategy: "reset_password_email_code",
				code: code,
				password: password,
			})

			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId })
				navigate("/")
			}
		} catch (error) {
			console.error("Erro no Clerk:", error)

			setApiMessage("O código está incorreto ou expirou. Tenta novamente.")
			setSnackbarSeverity("error")
			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Page>
			<Header />
			<ContentBox className="recover-content-box">
				{!pendingVerification ? (
					<>
						<h1 className="recover-main-title">Recuperar Password</h1>
						<p className="recover-subtitle">
							Insere o teu email associado à conta para receberes um código de recuperação.
						</p>

						<form key="request-code-form" onSubmit={handleRequestCode}>
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

							<PrimaryButton
								type="submit"
								loading={loading}
							>
								Enviar Código
							</PrimaryButton>
						</form>

						<p className="recover-footer-text">
							Lembrou-se da password?{" "}
							<TextButton
								onClick={() => {
									navigate("/login")
								}}
							>
								Voltar ao Login
							</TextButton>
						</p>
					</>
				) : (
					<>
						<h1 className="recover-main-title">Redefinir Password</h1>
						<p className="recover-subtitle">
							Enviámos um código para {email}.
						</p>

						<form key="reset-password-form" onSubmit={handleResetPassword} autoComplete="off">
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

							<TextField
								label="Nova Password"
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
								Redefinir e Entrar
							</PrimaryButton>
						</form>
						<p className="recover-footer-text">
							<TextButton
								onClick={() => {
									setPendingVerification(false)
								}}
								disabled={loading}
							>
								Pedir um novo código
							</TextButton>
						</p>
					</>
				)}
			</ContentBox>
			<ScreenSnackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				severity={snackbarSeverity}
			>
				{apiMessage}
			</ScreenSnackbar>
		</Page>
	)
}

export default RecuperarPassword
