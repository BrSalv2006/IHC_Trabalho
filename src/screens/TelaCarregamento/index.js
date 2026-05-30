import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"

import Page from "../../components/Page"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import { generateSequence } from "../../services/genJazzApi"
import logo from "../../assets/logo.jpg"

import "./style.css"

function TelaCarregamento() {
	const navigate = useNavigate()
	const location = useLocation()
	const [openError, setOpenError] = useState(false)
	const [loading, setLoading] = useState(true)

	const gerarSequencia = useCallback(async () => {
		const {
			selectedKey = "Random",
			selectedStructure = "Random",
			selectedModulation = "Random",
		} = location.state || {}

		setLoading(true)
		setOpenError(false)

		try {
			const progression = await generateSequence({
				key: selectedKey,
				structure: selectedStructure,
				modulation: selectedModulation,
			})

			navigate(
				"/sequencia-gerada",
				{
					state: {
						...location.state,
						progression,
					},
					replace: true,
				}
			)
		} catch (err) {
			console.error("Erro ao gerar sequência:", err)
			setLoading(false)
			setOpenError(true)
		}
	}, [location.state, navigate])

	useEffect(() => {
		gerarSequencia()
	}, [gerarSequencia])

	return (
		<Page className="loading-page">
			{loading && (
				<div className="loading-content">
					<img
						src={logo}
						alt="Logótipo Generative Jazz"
						className="loading-logo"
					/>
					<p className="loading-text">A gerar sequência...</p>
				</div>
			)}

			<Dialog
				open={openError}
				PaperProps={{ className: "loading-dialog-paper" }}
			>
				<DialogTitle className="loading-dialog-title">Erro</DialogTitle>
				<DialogContent>
					<DialogContentText className="loading-dialog-text">
						Não foi possível gerar a sequência.
					</DialogContentText>
				</DialogContent>
				<DialogActions className="loading-dialog-actions">
					<PrimaryButton fullWidth={false} onClick={gerarSequencia}>
						Tentar Novamente
					</PrimaryButton>
					<SecondaryButton fullWidth={false} onClick={() => navigate("/")}>
						Cancelar
					</SecondaryButton>
				</DialogActions>
			</Dialog>
		</Page>
	)
}

export default TelaCarregamento
