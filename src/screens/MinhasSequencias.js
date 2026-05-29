import React, { useState, useEffect } from "react"
import { Box, Typography, IconButton, CircularProgress, List, ListItem, ListItemText, Paper } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import saxLogo from "../assets/sax.jpg"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const BASE_URL = "https://genjazz-api.fly.dev"

function MinhasSequencias() {
    const navigate = useNavigate()
    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress
    
    const [sequencias, setSequencias] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSequencias = async () => {
            if (!email) return
            try {
                // Obter lista de progressões do utilizador 
                const res = await fetch(`${BASE_URL}/api/chords/user/${email}`)
                const data = await res.json()
                setSequencias(data)
            } catch (err) {
                console.error("Erro ao carregar sequências:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchSequencias()
    }, [email])

    return (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', fontFamily: 'sans-serif' }}>
            
            {/* Cabeçalho */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between', bgcolor: '#F9F7FD', p: 1.5, px: 2, borderRadius: '50px' }}>
                <IconButton onClick={() => navigate("/")} sx={{ p: 0, color: '#1A1A1A' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                </IconButton>
                <Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1A1A1A' }}>GENERATIVE JAZZ</Typography>
                <img src={saxLogo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
            </Box>

            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 4, textAlign: 'center' }}>
                As Minhas Sequências
            </Typography>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}><CircularProgress color="secondary" /></Box>
            ) : (
                <List sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    {sequencias.map((seq) => (
                        <Paper key={seq.id} elevation={0} sx={{ mb: 2, border: '1px solid #1A1A1A', borderRadius: '15px', bgcolor: '#FFF' }}>
                            <ListItem 
                                button 
                                onClick={() => navigate("/detalhes-sequencias", { state: { sequencia: seq } })}
                                sx={{ borderRadius: '15px' }}
                            >
                                <ListItemText 
                                    primary={`Sequência ${seq.id}`} 
                                    secondary={`Key: ${seq.key} | Estrutura: ${seq.structure} | Mod: ${seq.modulation}`}
                                    primaryTypographyProps={{ fontWeight: 'bold' }}
                                />
                                <ArrowForwardIosIcon sx={{ fontSize: '16px', color: '#1A1A1A' }} />
                            </ListItem>
                        </Paper>
                    ))}
                </List>
            )}
        </Box>
    )
}

export default MinhasSequencias