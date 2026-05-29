import "./style.css"
import logo from "../../assets/logo.jpg"

const Header = () => {
	return (
		<header className="header-container">
			<img
				src={logo}
				alt="Logótipo Generative Jazz"
				className="header-logo"
			/>
			<h1 className="header-title">
				GENERATIVE JAZZ
			</h1>
		</header>
	)
}

export default Header
