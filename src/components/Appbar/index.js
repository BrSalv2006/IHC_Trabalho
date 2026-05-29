import { useNavigate } from "react-router-dom"
import "./style.css"
import logo from "../../assets/logo.jpg"

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
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor" />
				</svg>
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
