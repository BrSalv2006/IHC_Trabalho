import React from "react"
import { Box, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import saxLogo from "../assets/sax.jpg"

// Função auxiliar matemática para desenhar cada "fatia" do círculo em SVG
const renderWedge = (cx, cy, rIn, rOut, angle, data, isInner, handleSelection) => {
    const startRad = (angle - 15 - 90) * Math.PI / 180
    const endRad = (angle + 15 - 90) * Math.PI / 180

    const x1 = cx + rOut * Math.cos(startRad)
    const y1 = cy + rOut * Math.sin(startRad)
    const x2 = cx + rOut * Math.cos(endRad)
    const y2 = cy + rOut * Math.sin(endRad)
    const x3 = cx + rIn * Math.cos(endRad)
    const y3 = cy + rIn * Math.sin(endRad)
    const x4 = cx + rIn * Math.cos(startRad)
    const y4 = cy + rIn * Math.sin(startRad)

    // Caminho (path) exato da fatia
    const d = `M ${x1} ${y1} A ${rOut} ${rOut} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 0 0 ${x4} ${y4} Z`

    // Calcular o centro da fatia para colocar o texto
    const textRadius = rIn + (rOut - rIn) / 2
    const textX = cx + textRadius * Math.cos((angle - 90) * Math.PI / 180)
    const textY = cy + textRadius * Math.sin((angle - 90) * Math.PI / 180)

    // Permite que textos como "F#\nGb" fiquem em duas linhas
    const lines = data.label.split('\n')

    return (
        <g 
            key={`${isInner ? 'inner' : 'outer'}-${data.val}`} 
            onClick={() => handleSelection(data.val)} 
            style={{ cursor: 'pointer' }}
        >
            <path 
                d={d} 
                fill="#FDF5FF" 
                stroke="#1A1A1A" 
                strokeWidth="1"
                onMouseOver={(e) => e.currentTarget.setAttribute('fill', '#EED8F2')}
                onMouseOut={(e) => e.currentTarget.setAttribute('fill', '#FDF5FF')}
            />
            <text x={textX} y={textY} textAnchor="middle" dominantBaseline="central" fontSize="10px" fill="#1A1A1A" style={{ pointerEvents: 'none', fontFamily: 'sans-serif' }}>
                {lines.map((line, i) => (
                    <tspan key={i} x={textX} dy={i === 0 ? (lines.length > 1 ? '-0.5em' : '0') : '1.2em'}>{line}</tspan>
                ))}
            </text>
        </g>
    )
}

function Tonalidade() {
    const navigate = useNavigate()

    // Avança para a estrutura e guarda a tonalidade escolhida
    const handleSelection = (tonalidade) => {
        navigate("/estrutura", { state: { selectedKey: tonalidade } })
    }

    // Dados do Círculo de Quintas
    const keysData = [
        { angle: 0, outer: { label: 'C', val: 'C' }, inner: { label: 'Am', val: 'Am' } },
        { angle: 30, outer: { label: 'G', val: 'G' }, inner: { label: 'Em', val: 'Em' } },
        { angle: 60, outer: { label: 'D', val: 'D' }, inner: { label: 'Bm', val: 'Bm' } },
        { angle: 90, outer: { label: 'A', val: 'A' }, inner: { label: 'F#m', val: 'F#m' } },
        { angle: 120, outer: { label: 'E', val: 'E' }, inner: { label: 'C#m', val: 'C#m' } },
        { angle: 150, outer: { label: 'B', val: 'B' }, inner: { label: 'G#m', val: 'G#m' } },
        { angle: 180, outer: { label: 'F#\nGb', val: 'F#' }, inner: { label: 'D#m\nEbm', val: 'D#m' } },
        { angle: 210, outer: { label: 'C#\nDb', val: 'Db' }, inner: { label: 'A#m\nBbm', val: 'Bbm' } },
        { angle: 240, outer: { label: 'Ab', val: 'Ab' }, inner: { label: 'Fm', val: 'Fm' } },
        { angle: 270, outer: { label: 'Eb', val: 'Eb' }, inner: { label: 'Cm', val: 'Cm' } },
        { angle: 300, outer: { label: 'Bb', val: 'Bb' }, inner: { label: 'Gm', val: 'Gm' } },
        { angle: 330, outer: { label: 'F', val: 'F' }, inner: { label: 'Dm', val: 'Dm' } },
    ]

    return (
        <Box sx={{ 
            p: 2.5, // Ligeiramente reduzido para dar margem de manobra
            pb: 4, // Mais espaço no fundo para compensar as bordas redondas do telemóvel
            display: 'flex', 
            flexDirection: 'column', 
            height: '100%', 
            boxSizing: 'border-box', // Garante que o padding não aumenta a altura total
            fontFamily: 'sans-serif' 
        }}>
            
            {/* Cabeçalho */}
            <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                mb: 3, // Reduzido de 4 para 3
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
                
                <img src={saxLogo} alt="Logo Generative Jazz" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
            </Box>

            {/* Título */}
            <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2, textAlign: 'center' }}>
                Escolher Tonalidade
            </Typography>

            {/* Círculo de Quintas */}
            <Box sx={{ 
                flex: 1, // Preenche o espaço disponível
                minHeight: 0, // Impede que ultrapasse o tamanho da frame
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                my: 2 // Margem vertical controlada
            }}>
                <svg width="100%" height="100%" viewBox="0 0 300 300" style={{ maxWidth: '280px', maxHeight: '280px' }}>
                    {keysData.map((data) => (
                        <React.Fragment key={data.angle}>
                            {/* Anel Exterior (Maiores) */}
                            {renderWedge(150, 150, 90, 145, data.angle, data.outer, false, handleSelection)}
                            {/* Anel Interior (Menores) */}
                            {renderWedge(150, 150, 45, 90, data.angle, data.inner, true, handleSelection)}
                        </React.Fragment>
                    ))}
                    {/* Furo do meio */}
                    <circle cx="150" cy="150" r="45" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1" />
                </svg>
            </Box>

            {/* Botões Inferiores */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button 
                    fullWidth 
                    variant="contained" 
                    onClick={() => handleSelection("Random")}
                    sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', '&:hover': { bgcolor: '#b034d1' } }}
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

export default Tonalidade