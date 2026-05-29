import React from "react"
import { Box, Typography, Button, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"

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

	const d = `M ${x1} ${y1} A ${rOut} ${rOut} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rIn} ${rIn} 0 0 0 ${x4} ${y4} Z`
	const textRadius = rIn + (rOut - rIn) / 2
	const textX = cx + textRadius * Math.cos((angle - 90) * Math.PI / 180)
	const textY = cy + textRadius * Math.sin((angle - 90) * Math.PI / 180)
	const lines = data.label.split('\n')

	return (
		<g key={`${isInner ? 'inner' : 'outer'}-${data.val}`} onClick={() => handleSelection(data.val)} style={{ cursor: 'pointer' }}>
			<path
				d={d} fill="#FDF5FF" stroke="#1A1A1A" strokeWidth="1"
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

	const handleSelection = (tonalidade) => {
		navigate("/estrutura", { state: { selectedKey: tonalidade } })
	}

	// Mapeamento corrigido com base na lista que recebeste da API
	const keysData = [
		{ angle: 0, outer: { label: 'C', val: 'C' }, inner: { label: 'Am', val: 'Amin' } },
		{ angle: 30, outer: { label: 'G', val: 'G' }, inner: { label: 'Em', val: 'Emin' } },
		{ angle: 60, outer: { label: 'D', val: 'D' }, inner: { label: 'Bm', val: 'Bmin' } },
		{ angle: 90, outer: { label: 'A', val: 'A' }, inner: { label: 'F#m', val: 'F#min' } },
		{ angle: 120, outer: { label: 'E', val: 'E' }, inner: { label: 'C#m', val: 'C#min' } },
		{ angle: 150, outer: { label: 'B', val: 'B' }, inner: { label: 'G#m', val: 'G#min' } },
		{ angle: 180, outer: { label: 'F#\nGb', val: 'Gb' }, inner: { label: 'D#m\nEbm', val: 'Ebmin' } },
		{ angle: 210, outer: { label: 'C#\nDb', val: 'Db' }, inner: { label: 'A#m\nBbm', val: 'Bbmin' } },
		{ angle: 240, outer: { label: 'Ab', val: 'Ab' }, inner: { label: 'Fm', val: 'Fmin' } },
		{ angle: 270, outer: { label: 'Eb', val: 'Eb' }, inner: { label: 'Cm', val: 'Cmin' } },
		{ angle: 300, outer: { label: 'Bb', val: 'Bb' }, inner: { label: 'Gm', val: 'Gmin' } },
		{ angle: 330, outer: { label: 'F', val: 'F' }, inner: { label: 'Dm', val: 'Dmin' } },
	]

	return (
		<Box sx={{ p: 2.5, pb: 4, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box', fontFamily: 'sans-serif' }}>
			<Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between', bgcolor: '#FDF5FF', p: 1.5, px: 2, borderRadius: '50px' }}>
				<IconButton onClick={() => navigate(-1)} sx={{ p: 0, color: '#1A1A1A' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg></IconButton>
				<Typography sx={{ fontWeight: 700, fontSize: '16px', color: '#1A1A1A' }}>GENERATIVE JAZZ</Typography>
				<img src={logo} alt="Logo" style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
			</Box>

			<Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#1A1A1A", mb: 2, textAlign: 'center' }}>Escolher Tonalidade</Typography>

			<Box sx={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', my: 2 }}>
				<svg width="100%" height="100%" viewBox="0 0 300 300" style={{ maxWidth: '280px', maxHeight: '280px' }}>
					{keysData.map((data) => (
						<React.Fragment key={data.angle}>
							{renderWedge(150, 150, 90, 145, data.angle, data.outer, false, handleSelection)}
							{renderWedge(150, 150, 45, 90, data.angle, data.inner, true, handleSelection)}
						</React.Fragment>
					))}
					<circle cx="150" cy="150" r="45" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1" />
				</svg>
			</Box>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				<Button fullWidth variant="contained" onClick={() => handleSelection("Random")} sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>Aleatório</Button>
				<Button fullWidth variant="outlined" onClick={() => navigate("/")} sx={{ color: '#1A1A1A', bgcolor: '#FDF5FF', borderColor: '#1A1A1A', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px' }}>Cancelar</Button>
			</Box>
		</Box>
	)
}

export default Tonalidade
