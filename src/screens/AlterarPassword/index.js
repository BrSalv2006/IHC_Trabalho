import React, { useState } from "react"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Snackbar, Alert } from "@mui/material"

import Page from '../../components/Page'
import Header from '../../components/Header'
import ContentBox from '../../components/ContentBox'
import TextField from '../../components/TextField'
import PrimaryButton from '../../components/PrimaryButton'
import TextButton from '../../components/TextButton'

import "./style.css"

function AlterarPassword() {
	const { user } = useUser()
	const navigate = useNavigate()

	const [novaPassword, setNovaPassword] = useState("")
	const [repetirPassword, setRepetirPassword] = useState("")

	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({})

	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [apiMessage, setApiMessage] = useState("")
	const [snackbarSeverity, setSnackbarSeverity] = useState("error")

	const handleCloseSnackbar = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}
		setOpenSnackbar(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (loading) {
			return
		}

		const newErrors = {}

		if (!novaPassword) {
			newErrors.novaPassword = "A nova password é obrigatória."
		} else if (novaPassword.length < 8) {
			newErrors.novaPassword = "A password tem de ter pelo menos 8 caracteres."
		}

		if (!repetirPassword) {
			newErrors.repetirPassword = "Por favor, repete a password."
		} else if (novaPassword !== repetirPassword) {
			newErrors.repetirPassword = "As passwords não coincidem."
		}

		setErrors(newErrors)

		if (Object.keys(newErrors).length > 0) {
			return
		}

		setLoading(true)

		try {
			await user.updatePassword({ newPassword: novaPassword })

			setApiMessage("Password alterada com sucesso!")
			setSnackbarSeverity("success")
			setOpenSnackbar(true)

			setTimeout(() => {
				navigate("/")
			}, 1500)

		} catch (err) {
			setApiMessage(err?.errors?.[0]?.longMessage || err?.errors?.[0]?.message || "Erro ao alterar a password.")
			setSnackbarSeverity("error")
			setOpenSnackbar(true)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Page>
			<Header />
			<ContentBox className="alterar-password-content-box">
				<h1 className="alterar-password-main-title">Alterar Password</h1>
				<form onSubmit={handleSubmit} className="alterar-password-form">
					<TextField
						label="Email"
						value={user?.primaryEmailAddress?.emailAddress || ""}
						InputProps={{ readOnly: true }}
						disabled
						helperText=" "
					/>
					<TextField
						label="Nova password"
						type="password"
						value={novaPassword}
						onChange={(e) => {
							setNovaPassword(e.target.value)
							setErrors({ ...errors, novaPassword: "" })
						}}
						error={Boolean(errors.novaPassword)}
						helperText={errors.novaPassword || " "} /* Previne o layout shift */
						disabled={loading}
					/>
					<TextField
						label="Repetir nova password"
						type="password"
						value={repetirPassword}
						onChange={(e) => {
							setRepetirPassword(e.target.value)
							setErrors({ ...errors, repetirPassword: "" })
						}}
						error={Boolean(errors.repetirPassword)}
						helperText={errors.repetirPassword || " "}
						disabled={loading}
					/>

					<PrimaryButton
						type="submit"
						loading={loading}
					>
						Alterar
					</PrimaryButton>
				</form>

				<div className="alterar-password-footer">
					<TextButton onClick={() => navigate("/")}>
						Voltar
					</TextButton>
				</div>
			</ContentBox>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
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
					severity={snackbarSeverity}
					sx={{
						width: '100%',
						borderRadius: '15px',
						boxShadow: '0px 4px 12px rgba(0,0,0,0.1)'
					}}
				>
					{apiMessage}
				</Alert>
			</Snackbar>
		</Page>
	)
}

export default AlterarPassword
