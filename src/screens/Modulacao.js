import React, { useState, useEffect } from "react"
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"


const BASE_URL = "https://genjazz-api.fly.dev"

// Dicionário para traduzir os valores da API para o teu design no Figma
const traduzirModulacao = (mod) => {
<<<<<<< HEAD
	const traducoes = {
		"Dominant": "Dominante",
		"Relative": "Relativa",
		"Subdominant": "Subdominante",
		"Subdominat": "Subdominante", // Lida com o typo (erro) que está no enunciado PDF
		"Parallel": "Paralela",
		"Chromatic": "Cromática"
	}
	return traducoes[mod] || mod
=======
    const traducoes = {
        "Dominant": "Dominante",
        "Relative": "Relativa",
        "Subdominant": "Subdominante",
        "Subdominat": "Subdominante", // Lida com o typo (erro) que está na API
        "Parallel": "Paralela",
        "Chromatic": "Cromática"
    }
    return traducoes[mod] || mod
>>>>>>> c09843e4db1404a9312edf99c345d2b11c6975af
}

function Modulacao() {
	const navigate = useNavigate()
	const location = useLocation()

	// Recupera a tonalidade e a estrutura escolhidas nos ecrãs anteriores
	const { selectedKey = "Random", selectedStructure = "Random" } = location.state || {}

	const [modulacoes, setModulacoes] = useState([])
	const [loading, setLoading] = useState(true)

<<<<<<< HEAD
	useEffect(() => {
		const fetchModulations = async () => {
			try {
				const res = await fetch(`${BASE_URL}/api/modulations`)
				const data = await res.json()
=======
    const handleSelection = (modulacaoOriginal) => {
        // AQUI ESTÁ A CORREÇÃO:
        // Avança primeiro para o ecrã de CARREGAMENTO, passando todos os parâmetros recolhidos!
        navigate("/carregamento", { 
            state: { 
                selectedKey, 
                selectedStructure, 
                selectedModulation: modulacaoOriginal 
            } 
        })
    }
>>>>>>> c09843e4db1404a9312edf99c345d2b11c6975af

				// Extrai as strings da API
				const allModulations = data.map(m => m.modulation ?? m)

				// Removemos o "Random" da lista principal, pois tem um botão próprio em baixo
				const filteredModulations = allModulations.filter(m => m.toLowerCase() !== "random")

<<<<<<< HEAD
				setModulacoes(filteredModulations)
			} catch (err) {
				console.error("Erro ao carregar modulações:", err)
			} finally {
				setLoading(false)
			}
		}
		fetchModulations()
	}, [])
=======
            {/* Lista de Modulações (Meio do Ecrã) */}
            <Box sx={{ 
                flex: 1, 
                overflowY: 'auto', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', // Centra os botões verticalmente
                gap: 2, 
                mb: 4 
            }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress color="secondary" />
                    </Box>
                ) : (
                    modulacoes.map((mod, index) => (
                        <Button 
                            key={index} 
                            fullWidth 
                            variant="contained" 
                            onClick={() => handleSelection(mod)} // Envia o valor original (Inglês)
                            sx={{ 
                                bgcolor: '#C845E9', 
                                color: '#FFF',
                                border: '1px solid #1A1A1A', // Borda escura igual ao Figma
                                borderRadius: '15px', 
                                py: 1.5, 
                                textTransform: 'none', 
                                fontSize: '16px', 
                                boxShadow: 'none',
                                '&:hover': { bgcolor: '#b034d1', boxShadow: 'none' } 
                            }}
                        >
                            {/* Mostra o valor traduzido para Português */}
                            {traduzirModulacao(mod)}
                        </Button>
                    ))
                )}
            </Box>
>>>>>>> c09843e4db1404a9312edf99c345d2b11c6975af

	const handleSelection = (modulacaoOriginal) => {
		// Avança para o ecrã de Geração passando todos os parâmetros recolhidos
		navigate("/sequencia-gerada", {
			state: {
				selectedKey,
				selectedStructure,
				selectedModulation: modulacaoOriginal
			}
		})
	}

	return (
		<Box sx={{
			p: 2.5,
			pb: 4, // Espaço extra no fundo
			display: 'flex',
			flexDirection: 'column',
			height: '100%',
			boxSizing: 'border-box',
			fontFamily: 'sans-serif'
		}}>
			{/* Cabeçalho */}
			<Box sx={{
				display: 'flex',
				alignItems: 'center',
				mb: 4,
				justifyContent: 'space-between',
				bgcolor: '#FDF5FF',
				p: 1.5,
				px: 2,
				borderRadius: '50px'
			}}>
				<IconButton onClick={() => navigate(-1)} sx={{ p: 0, color: '#1A1A1A' }}>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
						<line x1="19" y1="12" x2="5" y2="12"></line>
						<polyline points="12 19 5 12 12 5"></polyline>
					</svg>
				</IconButton>
				<Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1A1A1A' }}>
					GENERATIVE JAZZ
				</Typography>
				<img alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
			</Box>

			{/* Título */}
			<Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2, textAlign: 'center' }}>
				Escolher Modulação
			</Typography>

			{/* Lista de Modulações (Meio do Ecrã) */}
			<Box sx={{
				flex: 1,
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center', // Centra os botões verticalmente
				gap: 2,
				mb: 4
			}}>
				{loading ? (
					<Box sx={{ display: 'flex', justifyContent: 'center' }}>
						<CircularProgress color="secondary" />
					</Box>
				) : (
					modulacoes.map((mod, index) => (
						<Button
							key={index}
							fullWidth
							variant="contained"
							onClick={() => handleSelection(mod)} // Envia o valor original (Inglês) para a API
							sx={{
								bgcolor: '#C845E9',
								color: '#FFF',
								border: '1px solid #1A1A1A', // Borda escura igual ao Figma
								borderRadius: '15px',
								py: 1.5,
								textTransform: 'none',
								fontSize: '16px',
								boxShadow: 'none',
								'&:hover': { bgcolor: '#b034d1', boxShadow: 'none' }
							}}
						>
							{/* Mostra o valor traduzido para Português */}
							{traduzirModulacao(mod)}
						</Button>
					))
				)}
			</Box>

			{/* Botões Inferiores Fixos */}
			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Button
					fullWidth
					variant="contained"
					onClick={() => handleSelection("Random")}
					sx={{
						bgcolor: '#C845E9',
						color: '#FFF',
						border: '1px solid #1A1A1A',
						borderRadius: '15px',
						py: 1.5,
						textTransform: 'none',
						fontSize: '16px',
						boxShadow: 'none',
						'&:hover': { bgcolor: '#b034d1', boxShadow: 'none' }
					}}
				>
					Aleatório
				</Button>

				<Button
					fullWidth
					variant="outlined"
					onClick={() => navigate("/")}
					sx={{
						color: '#1A1A1A',
						bgcolor: '#FDF5FF',
						borderColor: '#1A1A1A',
						borderRadius: '15px',
						py: 1.5,
						textTransform: 'none',
						fontSize: '16px',
						'&:hover': { bgcolor: '#EED8F2', borderColor: '#1A1A1A' }
					}}
				>
					Cancelar
				</Button>
			</Box>
		</Box>
	)
}

export default Modulacao
