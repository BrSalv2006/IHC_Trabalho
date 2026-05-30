import { CircularProgress } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"

import Page from "../../components/Page"
import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"
import useRemoteOptions from "../../hooks/useRemoteOptions"
import { getModulations } from "../../services/genJazzApi"
import { formatModulationLabel } from "../../utils/musicLabels"

import "./style.css"

function Modulacao() {
	const navigate = useNavigate()
	const location = useLocation()

	const { selectedKey = "Random", selectedStructure = "Random" } = location.state || {}

	const {
		options: modulacoes,
		loading,
		error,
	} = useRemoteOptions(getModulations, "Não foi possível carregar as modulações.")

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
				<div className="modulacao-options-container">
					{loading ? (
						<CircularProgress color="secondary" />
					) : error ? (
						<p className="modulacao-feedback">{error}</p>
					) : modulacoes.length === 0 ? (
						<p className="modulacao-feedback">Não existem modulações disponíveis.</p>
					) : (
						modulacoes.map((mod) => (
							<PrimaryButton
								key={mod}
								onClick={() => handleSelection(mod)}
							>
								{formatModulationLabel(mod)}
							</PrimaryButton>
						))
					)}
				</div>
				<div className="modulacao-footer">
					<SecondaryButton onClick={() => navigate("/")}>
						Cancelar
					</SecondaryButton>
				</div>
			</ContentBox>
		</Page>
	)
}

export default Modulacao
