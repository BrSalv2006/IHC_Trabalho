import React from "react"
import { BrowserRouter, Routes, Route, Navigate } from "react-router"
import { SignedIn, SignedOut } from "@clerk/clerk-react"

import SmartphoneFrame from "./components/SmartphoneFrame"
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

function App() {
	return (
		<BrowserRouter>
			<SmartphoneFrame>
				<Routes>
					{/* Rotas Públicas */}
					<Route path="/login" element={<Login />} />
					<Route path="/registo" element={<Registo />} />
					<Route path="/recuperar-password" element={<RecuperarPassword />} />

					{/* Rota Raiz: Protegida */}
					<Route path="/" element={
						<>
							<SignedIn><Dashboard /></SignedIn>
							<SignedOut><Navigate to="/login" replace /></SignedOut>
						</>
					} />

					{/* Rotas Protegidas */}
					<Route path="/tonalidade" element={<SignedIn><Tonalidade /></SignedIn>} />
					<Route path="/estrutura" element={<SignedIn><Estrutura /></SignedIn>} />
					<Route path="/modulacao" element={<SignedIn><Modulacao /></SignedIn>} />
					<Route path="/sequencia-gerada" element={<SignedIn><SequenciaGerada /></SignedIn>} />
					<Route path="/minhas-sequencias" element={<SignedIn><MinhasSequencias /></SignedIn>} />
					<Route path="/detalhes-sequencias" element={<SignedIn><DetalhesSequencias /></SignedIn>} />
					<Route path="/carregamento" element={<SignedIn><TelaCarregamento /></SignedIn>} />
					<Route path="/alterar-password" element={<SignedIn><AlterarPassword /></SignedIn>} />

					{/* Fallback */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</SmartphoneFrame>
		</BrowserRouter>
	)
}

export default App
