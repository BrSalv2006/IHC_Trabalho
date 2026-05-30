import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import { CircularProgress } from "@mui/material"

import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import Page from "../../components/Page"
import PrimaryButton from "../../components/PrimaryButton"
import ScreenSnackbar from "../../components/ScreenSnackbar"
import SecondaryButton from "../../components/SecondaryButton"
import SequenceGrid from "../../components/SequenceGrid"
import {
	generateSequence,
	getSequenceAudioUrl,
	saveSequence,
} from "../../services/genJazzApi"

import "./style.css"

function SequenciaGerada() {
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUser()

	const {
		selectedKey = "Random",
		selectedStructure = "Random",
		selectedModulation = "Random",
		progression: initialProgression = null,
	} = location.state || {}

	const email = user?.primaryEmailAddress?.emailAddress
	const [progression, setProgression] = useState(initialProgression)
	const [audioUrl, setAudioUrl] = useState(null)
	const [loading, setLoading] = useState(!initialProgression)
	const [audioLoading, setAudioLoading] = useState(false)
	const [saving, setSaving] = useState(false)
	const [message, setMessage] = useState(null)

	useEffect(() => {
		if (progression) {
			return undefined
		}

		let isMounted = true

		const generate = async () => {
			setLoading(true)

			try {
				const data = await generateSequence({
					key: selectedKey,
					structure: selectedStructure,
					modulation: selectedModulation,
				})

				if (isMounted) {
					setProgression(data)
				}
			} catch (err) {
				console.error("Erro ao gerar sequência:", err)
				if (isMounted) {
					setMessage({
						severity: "error",
						text: "Não foi possível gerar a sequência.",
					})
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		generate()

		return () => {
			isMounted = false
		}
	}, [progression, selectedKey, selectedStructure, selectedModulation])

	const handleCloseMessage = (_, reason) => {
		if (reason !== "clickaway") {
			setMessage(null)
		}
	}

	const handlePlay = async () => {
		if (!progression?.chords || audioLoading) {
			return
		}

		setAudioLoading(true)

		try {
			const url = await getSequenceAudioUrl(progression.chords)
			setAudioUrl(url)
		} catch (err) {
			console.error("Erro ao gerar áudio:", err)
			setMessage({
				severity: "error",
				text: "Não foi possível gerar o áudio desta sequência.",
			})
		} finally {
			setAudioLoading(false)
		}
	}

	const handleSave = async () => {
		if (!progression?.chords || !email || saving) {
			return
		}

		setSaving(true)

		try {
			await saveSequence({
				email,
				chords: progression.chords,
				key: progression.key,
				structure: selectedStructure,
				modulation: selectedModulation,
			})

			setMessage({
				severity: "success",
				text: "Sequência guardada com sucesso.",
			})
		} catch (err) {
			console.error("Erro ao guardar sequência:", err)
			setMessage({
				severity: "error",
				text: "Não foi possível guardar a sequência.",
			})
		} finally {
			setSaving(false)
		}
	}

	return (
		<Page>
			<Appbar showBackArrow onBackClick={() => navigate("/")} />
			<ContentBox className="generated-content-box">
				<h1 className="generated-main-title">Sequência Gerada</h1>

				<div className="generated-scroll-area">
					{loading ? (
						<div className="generated-loading">
							<CircularProgress color="secondary" />
						</div>
					) : progression ? (
						<>
							<SequenceGrid chords={progression.chords} />
						</>
					) : (
						<p className="generated-feedback">
							A sequência não está disponível. Tenta novamente.
						</p>
					)}
				</div>

				<div className="generated-buttons-container">
					{audioUrl && (
						<audio
							className="generated-audio"
							controls
							src={audioUrl}
							autoPlay
						/>
					)}
					<PrimaryButton
						onClick={handlePlay}
						disabled={!progression || audioLoading}
					>
						{audioLoading ? <CircularProgress size={24} color="inherit" /> : "Ouvir"}
					</PrimaryButton>
					<PrimaryButton
						onClick={handleSave}
						disabled={!progression || saving}
					>
						{saving ? "A guardar..." : "Guardar"}
					</PrimaryButton>
					<SecondaryButton onClick={() => navigate("/")}>
						Concluir
					</SecondaryButton>
				</div>
			</ContentBox>

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

export default SequenciaGerada
