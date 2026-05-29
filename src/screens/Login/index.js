import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSignIn } from "@clerk/clerk-react"
import { Snackbar, Alert } from "@mui/material"

import Page from '../../components/Page'
import Header from '../../components/Header'
import ContentBox from '../../components/ContentBox'
import TextField from '../../components/TextField'
import PrimaryButton from '../../components/PrimaryButton'
import TextButton from '../../components/TextButton'

import "./style.css"

function Login() {
	const { isLoaded, signIn, setActive } = useSignIn()
	const navigate = useNavigate()

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [errors, setErrors] = useState({})
	const [apiError, setApiError] = useState("")
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [loading, setLoading] = useState(false)

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

		if (!email) {
			newErrors.email = "O email é obrigatório."
		}

		if (!password) {
			newErrors.password = "A password é obrigatória."
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			const result = await signIn.create({ identifier: email, password })
			if (result.status === "complete") {
				await setActive({ session: result.createdSessionId })
				navigate("/")
			}
		} catch (error) {
			const errorCode = error?.errors?.[0]?.code

			if (errorCode === "form_password_incorrect") {
				setApiError("A password está incorreta. Tenta novamente.")
			} else if (errorCode === "form_identifier_not_found") {
				setApiError("Não encontrámos nenhuma conta com este email.")
			} else {
				setApiError("Credenciais incorretas. Verifica os teus dados.")
			}

			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Page>
			<Header />
			<ContentBox className="login-content-box">
				<h1 className="login-main-title">Login</h1>
				<form onSubmit={handleSubmit}>
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
						autoComplete="current-password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
							setErrors({ ...errors, password: "" })
						}}
						error={Boolean(errors.password)}
						helperText={errors.password}
						disabled={loading}
					/>

					<TextButton
						onClick={() => navigate("/recuperar-password")}
					>
						Recuperar password
					</TextButton>

					<PrimaryButton
						type="submit"
						disabled={loading}
					>
						{loading ? "A entrar..." : "Entrar"}
					</PrimaryButton>
				</form>

				<p className="login-footer-text">
					Não tem conta?{" "}
					<TextButton
						onClick={() => navigate("/registo")}
					>
						Registe-se
					</TextButton>
				</p>
			</ContentBox>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={5000}
				onClose={handleCloseSnackbar}
				sx={{
					position: 'absolute !important',
					bottom: '32px !important',
					left: '32px !important',
					right: '32px !important',
					width: 'auto !important'
				}}
			>
				<Alert
					onClose={handleCloseSnackbar}
					severity="error"
					sx={{
						width: '100%',
						borderRadius: '15px',
						boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
					}}
				>
					{apiError}
				</Alert>
			</Snackbar>
		</Page>
	)
}

export default Login
