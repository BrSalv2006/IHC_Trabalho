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
	const [openSnackbar, setOpenSnackbar] = useState(false)
	const [apiError, setApiError] = useState("")

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (novaPassword !== repetirPassword) {
			setApiError("As passwords não coincidem!")
			setOpenSnackbar(true)
			return
		}

		if (novaPassword.length < 8) {
			setApiError("A password tem de ter pelo menos 8 caracteres!")
			setOpenSnackbar(true)
			return
		}

		try {
			await user.updatePassword({ newPassword: novaPassword })
			alert("Password alterada com sucesso!")
			navigate("/")
		} catch (err) {
			setApiError(err.errors?.[0]?.longMessage || "Erro ao alterar a password.")
			setOpenSnackbar(true)
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
					/>
					<TextField
						label="Nova password"
						type="password"
						value={novaPassword}
						onChange={(e) => setNovaPassword(e.target.value)}
					/>
					<TextField
						label="Repetir nova password"
						type="password"
						value={repetirPassword}
						onChange={(e) => setRepetirPassword(e.target.value)}
					/>

					<PrimaryButton type="submit">
						Alterar
					</PrimaryButton>
				</form>

				<div className="alterar-password-footer">
					<TextButton onClick={() => navigate("/")}>
						Voltar
					</TextButton>
				</div>
			</ContentBox>

			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
				<Alert severity="error" onClose={() => setOpenSnackbar(false)}>{apiError}</Alert>
			</Snackbar>
		</Page>
	)
}

export default AlterarPassword