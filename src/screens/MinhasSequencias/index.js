import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { CircularProgress } from "@mui/material"

import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import Page from "../../components/Page"
import { getUserSequences } from "../../services/genJazzApi"

import "./style.css"

function MinhasSequencias() {
	const navigate = useNavigate()
	const { user } = useUser()
	const email = user?.primaryEmailAddress?.emailAddress

	const [sequencias, setSequencias] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		let isMounted = true

		const fetchSequencias = async () => {
			setLoading(true)
			setError("")

			if (!email) {
				if (isMounted) {
					setLoading(false)
				}
				return
			}

			try {
				const data = await getUserSequences(email)
				if (isMounted) {
					setSequencias(Array.isArray(data) ? data : [])
				}
			} catch (err) {
				console.error("Erro ao carregar sequências:", err)
				if (isMounted) {
					setError("Não foi possível carregar as sequências.")
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchSequencias()

		return () => {
			isMounted = false
		}
	}, [email])

	const openDetails = (sequencia) => {
		navigate("/detalhes-sequencias", { state: { sequencia } })
	}

	return (
		<Page>
			<Appbar showBackArrow onBackClick={() => navigate("/")} />
			<ContentBox className="saved-content-box">
				<h1 className="saved-main-title">As Minhas Sequências</h1>

				<div className="saved-list-area">
					{loading ? (
						<div className="saved-loading">
							<CircularProgress color="secondary" />
						</div>
					) : error ? (
						<p className="saved-feedback">{error}</p>
					) : sequencias.length === 0 ? (
						<p className="saved-feedback">Ainda não tens sequências guardadas.</p>
					) : (
						<ul className="saved-list">
							{sequencias.map((sequencia) => (
								<li key={sequencia.id}>
									<button
										className="saved-list-item"
										type="button"
										onClick={() => openDetails(sequencia)}
									>
										<span>
											<strong>Sequência {sequencia.id}</strong>
											<small>
												Key: {sequencia.key || "-"} | Estrutura: {sequencia.structure || "-"} | Mod: {sequencia.modulation || "-"}
											</small>
										</span>
										<ArrowForwardIosIcon className="saved-list-icon" />
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
			</ContentBox>
		</Page>
	)
}

export default MinhasSequencias
