import { useNavigate, useLocation } from "react-router-dom"
import { CircularProgress } from "@mui/material"

import Page from "../../components/Page"
import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import useRemoteOptions from "../../hooks/useRemoteOptions"
import { getStructures } from "../../services/genJazzApi"
import { formatStructureLabel } from "../../utils/musicLabels"

import "./style.css"

function Estrutura() {
	const navigate = useNavigate()
	const location = useLocation()

	const { selectedKey = "Random" } = location.state || {}

	const {
		options: estruturas,
		loading,
		error,
	} = useRemoteOptions(getStructures, "Não foi possível carregar as estruturas.")

	const handleSelection = (estrutura) => {
		navigate("/modulacao", { state: { selectedKey, selectedStructure: estrutura } })
	}

	return (
		<Page>
			<Appbar showBackArrow />
			<ContentBox className="estrutura-content-box">
				<h1 className="estrutura-main-title">Escolher Estrutura</h1>
				<div className="estrutura-options-container">
					{loading ? (
						<CircularProgress color="secondary" />
					) : error ? (
						<p className="estrutura-feedback">{error}</p>
					) : estruturas.length === 0 ? (
						<p className="estrutura-feedback">Não existem estruturas disponíveis.</p>
					) : (
						estruturas.map((estrutura) => (
							<PrimaryButton
								key={estrutura}
								onClick={() => handleSelection(estrutura)}
							>
								{formatStructureLabel(estrutura)}
							</PrimaryButton>
						))
					)}
				</div>
				<div className="estrutura-footer">
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
