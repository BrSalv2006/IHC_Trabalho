import { useEffect, useState } from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SignedIn, SignedOut } from "@clerk/clerk-react"

import SmartphoneFrame from "./components/SmartphoneFrame"
import SplashScreen from "./screens/SplashScreen"
import Login from "./screens/Login"
import Registo from "./screens/Registo"
import Dashboard from "./screens/Dashboard"
import Tonalidade from "./screens/Tonalidade"
import Estrutura from "./screens/Estrutura"
import Modulacao from "./screens/Modulacao"
import SequenciaGerada from "./screens/SequenciaGerada"
import MinhasSequencias from "./screens/MinhasSequencias"
import DetalhesSequencias from "./screens/DetalhesSequencias"
import TelaCarregamento from "./screens/TelaCarregamento"
import AlterarPassword from "./screens/AlterarPassword"
import RecuperarPassword from "./screens/RecuperarPassword"
import SignInPage from "./SignInPage"

const ProtectedRoute = ({ children }) => (
	<>
		<SignedIn>{children}</SignedIn>
		<SignedOut><Navigate to="/login" replace /></SignedOut>
	</>
)

function App() {
	const [loading, setLoading] = useState(() => !sessionStorage.getItem("hasSeenSplash"))

	useEffect(() => {
		if (loading) {
			const timer = setTimeout(() => {
				setLoading(false)
				sessionStorage.setItem("hasSeenSplash", "true")
			}, 2000)
			return () => clearTimeout(timer)
		}
	}, [loading])

	return (
		<BrowserRouter>
			<SmartphoneFrame>
				{loading ? (
					<SplashScreen />
				) : (
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/registo" element={<Registo />} />
						<Route path="/recuperar-password" element={<RecuperarPassword />} />

						<Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
						<Route path="/tonalidade" element={<ProtectedRoute><Tonalidade /></ProtectedRoute>} />
						<Route path="/estrutura" element={<ProtectedRoute><Estrutura /></ProtectedRoute>} />
						<Route path="/modulacao" element={<ProtectedRoute><Modulacao /></ProtectedRoute>} />
						<Route path="/sequencia-gerada" element={<ProtectedRoute><SequenciaGerada /></ProtectedRoute>} />
						<Route path="/minhas-sequencias" element={<ProtectedRoute><MinhasSequencias /></ProtectedRoute>} />
						<Route path="/detalhes-sequencias" element={<ProtectedRoute><DetalhesSequencias /></ProtectedRoute>} />
						<Route path="/carregamento" element={<ProtectedRoute><TelaCarregamento /></ProtectedRoute>} />
						<Route path="/alterar-password" element={<ProtectedRoute><AlterarPassword /></ProtectedRoute>} />
						<Route path="/sign-in/*" element={<SignInPage />} />

						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				)}
			</SmartphoneFrame>
		</BrowserRouter>
	)
}

export default App
