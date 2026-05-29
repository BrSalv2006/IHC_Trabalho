import ReactDOM from "react-dom/client"
import { ClerkProvider } from "@clerk/clerk-react"
import { StyledEngineProvider } from '@mui/material/styles'
import App from "./App"
import './index.css'

const PUBLISHABLE_KEY = "pk_test_c3Rhci1mbGFtaW5nby0zMy5jbGVyay5hY2NvdW50cy5kZXYk"

function Root() {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<StyledEngineProvider injectFirst>
				<App />
			</StyledEngineProvider>
		</ClerkProvider>
	)
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Root />)
