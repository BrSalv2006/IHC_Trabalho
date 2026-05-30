import { useNavigate } from "react-router-dom"
import "./style.css"
import logo from "../../assets/logo.jpg"
import arrowBack from "../../assets/arrowBack.svg"

const Appbar = (props) => {
	const navigate = useNavigate()

	let showBackArrow = false

	if (props.showBackArrow !== undefined) {
		showBackArrow = props.showBackArrow
	}

	let leftContent = null

	if (showBackArrow === true) {
		leftContent = (
			<button
				className="appbar-back-button"
				onClick={() => {
					if (props.onBackClick !== undefined) {
						props.onBackClick()
					} else {
						navigate(-1)
					}
				}}
			>
				<img src={arrowBack} alt="Voltar atrás" />
			</button>
		)
	}

	const handleLogoClick = (e) => {
		if (props.onLogoClick !== undefined) {
			props.onLogoClick(e)
		}
	}

	return (
		<header className="appbar-container">
			<div className="appbar-left">
				{leftContent}
			</div>
			<h1 className="appbar-title">GENERATIVE JAZZ</h1>
			<div className="appbar-right">
				<img
					src={logo}
					alt="Logótipo Generative Jazz"
					className="appbar-logo"
					onClick={handleLogoClick}
				/>
			</div>
		</header>
	)
}

export default Appbar
