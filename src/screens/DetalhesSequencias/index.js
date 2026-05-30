import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import {
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material"

import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import Page from "../../components/Page"
import PrimaryButton from "../../components/PrimaryButton"
import ScreenSnackbar from "../../components/ScreenSnackbar"
import SecondaryButton from "../../components/SecondaryButton"
import SequenceGrid from "../../components/SequenceGrid"
import { deleteSequence, getSequenceAudioUrl } from "../../services/genJazzApi"

import "./style.css"

function DetalhesSequencias() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUser()
	const email = user?.primaryEmailAddress?.emailAddress
	const { sequencia } = location.state || {}

	const [audioUrl, setAudioUrl] = useState(null)
	const [audioLoading, setAudioLoading] = useState(false)
	const [deleting, setDeleting] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		if (!sequencia) {
			navigate("/minhas-sequencias", { replace: true })
		}
	}, [navigate, sequencia])

	const handleCloseMessage = (_, reason) => {
		if (reason !== "clickaway") {
			setMessage(null)
		}
	}

	const handlePlay = async () => {
		if (!sequencia?.chords || audioLoading) {
			return
		}

		setAudioLoading(true)

		try {
			const url = await getSequenceAudioUrl(sequencia.chords)
			setAudioUrl(url)
		} catch (err) {
			console.error("Erro ao gerar áudio:", err)
			setMessage({
				severity: "error",
				text: "Não foi possível gerar o áudio.",
			})
		} finally {
			setAudioLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!email || !sequencia?.id || deleting) {
			return
		}

		setDeleting(true)

		try {
			await deleteSequence(email, sequencia.id)
			setOpenDialog(false)
			navigate("/minhas-sequencias")
		} catch (err) {
			console.error("Erro ao apagar sequência:", err)
			setMessage({
				severity: "error",
				text: "Não foi possível apagar a sequência.",
			})
		} finally {
			setDeleting(false)
		}
	}

	if (!sequencia) {
		return null
	}

	return (
		<Page>
			<Appbar showBackArrow />
			<ContentBox className="details-content-box">
				<h1 className="details-main-title">Sequência</h1>

				<div className="details-scroll-area">
					<SequenceGrid chords={sequencia.chords} />
				</div>

				<div className="details-actions">
					{audioUrl && (
						<audio
							className="details-audio"
							controls
							src={audioUrl}
							autoPlay
						/>
					)}

					<PrimaryButton onClick={handlePlay} disabled={audioLoading}>
						{audioLoading ? <CircularProgress size={24} color="inherit" /> : "Ouvir"}
					</PrimaryButton>
					<SecondaryButton
						className="details-delete-button"
						onClick={() => setOpenDialog(true)}
					>
						Apagar
					</SecondaryButton>
				</div>
			</ContentBox>

			<Dialog
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				PaperProps={{ className: "details-dialog-paper" }}
			>
				<DialogTitle className="details-dialog-title">Confirmar</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Esta ação não pode ser desfeita.
					</DialogContentText>
				</DialogContent>
				<DialogActions className="details-dialog-actions">
					<SecondaryButton
						fullWidth={false}
						onClick={() => setOpenDialog(false)}
						disabled={deleting}
					>
						Cancelar
					</SecondaryButton>
					<PrimaryButton
						fullWidth={false}
						onClick={handleDelete}
						disabled={deleting}
					>
						{deleting ? "A apagar..." : "Apagar"}
					</PrimaryButton>
				</DialogActions>
			</Dialog>

			<ScreenSnackbar
				open={Boolean(message)}
				autoHideDuration={5000}
				onClose={handleCloseMessage}
				severity={message?.severity || "info"}
			>
				{message?.text}
			</ScreenSnackbar>
		</Page>
	)
}

export default DetalhesSequencias
