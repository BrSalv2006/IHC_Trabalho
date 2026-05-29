import "./style.css"
import logo from "../../assets/logo.jpg"

const SplashScreen = () => {
	return (
		<div className="splash-container">
			<img
				src={logo}
				alt="Logótipo Generative Jazz"
				className="splash-logo"
			/>
			<div className="splash-content-spacer" />
			<h1 className="splash-title">
				GENERATIVE JAZZ
			</h1>
		</div>
	)
}

export default SplashScreen
