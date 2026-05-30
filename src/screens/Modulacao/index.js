import { useState, useEffect } from "react"
import { CircularProgress } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"

import Page from "../../components/Page"
import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import { getModulations } from "../../services/genJazzApi"
import { translateModulation } from "../../utils/musicLabels"

import "./style.css"

function Modulacao() {
	const navigate = useNavigate()
	const location = useLocation()

	const { selectedKey = "Random", selectedStructure = "Random" } = location.state || {}

	const [modulacoes, setModulacoes] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		let isMounted = true

		const fetchModulations = async () => {
			try {
				const allModulations = await getModulations()
				const filteredModulations = allModulations.filter((modulation) =>
					String(modulation).toLowerCase() !== "random"
				)

				if (isMounted) {
					setModulacoes(filteredModulations)
				}
			} catch (err) {
				console.error("Erro ao carregar modulações:", err)
				if (isMounted) {
					setError("Não foi possível carregar as modulações.")
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchModulations()

		return () => {
			isMounted = false
		}
	}, [])

	const handleSelection = (modulacaoOriginal) => {
		navigate("/sequencia-gerada", {
			state: {
				selectedKey,
				selectedStructure,
				selectedModulation: modulacaoOriginal
			}
		})
	}

	return (
		<Page>
			<Appbar showBackArrow />
			<ContentBox className="modulacao-content-box">
				<h1 className="modulacao-main-title">Escolher Modulação</h1>
				<div className="modulacao-buttons-container">
					{loading ? (
						<CircularProgress color="secondary" />
					) : error ? (
						<p className="modulacao-feedback">{error}</p>
					) : (
						modulacoes.map((mod) => (
							<PrimaryButton
								key={mod}
								onClick={() => handleSelection(mod)}
							>
								{translateModulation(mod)}
							</PrimaryButton>
						))
					)}
				</div>
				<div className="modulacao-buttons-container">
					<PrimaryButton onClick={() => handleSelection("Random")}>
						Aleatório
					</PrimaryButton>
					<SecondaryButton onClick={() => navigate("/")}>
						Cancelar
					</SecondaryButton>
				</div>
			</ContentBox>
		</Page>
	)
}

export default Modulacao
