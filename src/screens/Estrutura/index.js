import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import Page from "../../components/Page"
import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import { getStructures } from "../../services/genJazzApi"
import { visibleStructures } from "../../utils/musicLabels"

import "./style.css"

function Estrutura() {
	const navigate = useNavigate()
	const location = useLocation()

	const { selectedKey = "Random" } = location.state || {}

	const [estruturas, setEstruturas] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		let isMounted = true

		const fetchStructures = async () => {
			try {
				const allStructures = await getStructures()
				const fetchedStructures = allStructures.filter((structure) =>
					visibleStructures.includes(structure)
				)

				if (isMounted) {
					setEstruturas(fetchedStructures)
				}
			} catch (err) {
				console.error("Erro ao carregar estruturas:", err)
				if (isMounted) {
					setError("Não foi possível carregar as estruturas.")
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchStructures()

		return () => {
			isMounted = false
		}
	}, [])

	const handleSelection = (estrutura) => {
		navigate("/modulacao", { state: { selectedKey, selectedStructure: estrutura } })
	}

	return (
		<Page>
			<Appbar showBackArrow />
			<ContentBox className="estrutura-content-box">
				<h1 className="estrutura-main-title">Escolher Estrutura</h1>
				<div className="estrutura-buttons-container">
					{loading ? (
						<CircularProgress color="secondary" />
					) : error ? (
						<p className="estrutura-feedback">{error}</p>
					) : (
						estruturas.map((est, index) => (
							<PrimaryButton
								key={index}
								onClick={() => handleSelection(est)}
							>
								{est}
							</PrimaryButton>
						))
					)}
				</div>
				<div className="estrutura-buttons-container">
					<PrimaryButton
						onClick={() => handleSelection("Random")}
					>
						Aleatório
					</PrimaryButton>

					<SecondaryButton
						onClick={() => navigate("/")}
					>
						Cancelar
					</SecondaryButton>
				</div>
			</ContentBox>
		</Page>
	)
}

export default Estrutura
