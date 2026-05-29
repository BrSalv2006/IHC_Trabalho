import React, { useState, useEffect } from "react"
import { Box, Typography, Button, IconButton, CircularProgress } from "@mui/material"
import { useNavigate, useLocation } from "react-router-dom"
import saxLogo from "../assets/sax.jpg"

const BASE_URL = "https://genjazz-api.fly.dev"

function Estrutura() {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Recupera a tonalidade escolhida no ecrã anterior (ou assume Random se falhar)
    const { selectedKey = "Random" } = location.state || {}

    const [estruturas, setEstruturas] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStructures = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/structures`)
                const data = await res.json()
                
                // Extrai as strings da resposta da API
                const allStructures = data.map(s => s.structure ?? s)
                
                // Define as estruturas exatas que desenhaste no Figma
                const estruturasFigma = ["AABA", "AABC", "ABAB"]
                
                // Filtra os resultados da API para mostrar apenas as do Figma
                const fetchedStructures = allStructures.filter(s => 
                    estruturasFigma.includes(s)
                )
                
                setEstruturas(fetchedStructures)
            } catch (err) {
                console.error("Erro ao carregar estruturas:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStructures()
    }, [])

    const handleSelection = (estrutura) => {
        // Avança para a Modulação passando a Tonalidade (key) e a Estrutura (structure)
        navigate("/modulacao", { state: { selectedKey, selectedStructure: estrutura } })
    }

    return (
        <Box sx={{ 
            p: 2.5, 
            pb: 4, // Espaço extra no fundo para a frame do telemóvel não cortar os botões
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
                <img src={saxLogo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
            </Box>

            {/* Título */}
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2, textAlign: 'center' }}>
                Escolher Estrutura
            </Typography>

            {/* Lista de Estruturas (Meio do Ecrã) */}
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
                    estruturas.map((est, index) => (
                        <Button 
                            key={index}
                            fullWidth 
                            variant="contained" 
                            onClick={() => handleSelection(est)}
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
                            {est}
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

export default Estrutura