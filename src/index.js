import ReactDOM from "react-dom/client"
import './index.css'
import App from "./App"
import { ClerkProvider } from "@clerk/clerk-react"

const PUBLISHABLE_KEY = "pk_test_c3Rhci1mbGFtaW5nby0zMy5jbGVyay5hY2NvdW50cy5kZXYk"

function Root() {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<App />
		</ClerkProvider>
	)
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<Root />)
