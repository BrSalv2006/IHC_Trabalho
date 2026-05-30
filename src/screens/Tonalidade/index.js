import { Fragment } from "react"
import { useNavigate } from "react-router-dom"

import Page from "../../components/Page"
import Appbar from "../../components/Appbar"
import ContentBox from "../../components/ContentBox"
import PrimaryButton from "../../components/PrimaryButton"
import SecondaryButton from "../../components/SecondaryButton"

import "./style.css"

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
		<g key={`${isInner ? 'inner' : 'outer'}-${data.val}`} onClick={() => handleSelection(data.val)}>
			<path d={d} className="tonalidade-wedge-path" />
			<text
				x={textX}
				y={textY}
				textAnchor="middle"
				dominantBaseline="central"
				className="tonalidade-wedge-text"
			>
				{lines.map((line, i) => {
					let dyValue = "1.2em"

					if (i === 0) {
						if (lines.length > 1) {
							dyValue = "-0.5em"
						} else {
							dyValue = "0"
						}
					}

					return (
						<tspan key={i} x={textX} dy={dyValue}>
							{line}
						</tspan>
					)
				})}
			</text>
		</g>
	)
}

function Tonalidade() {
	const navigate = useNavigate()

	const handleSelection = (tonalidade) => {
		navigate("/estrutura", { state: { selectedKey: tonalidade } })
	}

	return (
		<Page>
			<Appbar showBackArrow />
			<ContentBox className="tonalidade-content-box">
				<h1 className="tonalidade-main-title">Escolher Tonalidade</h1>
				<div className="tonalidade-svg-container">
					<svg className="tonalidade-wheel" width="100%" height="100%" viewBox="0 0 300 300">
						{keysData.map((data) => (
							<Fragment key={data.angle}>
								{renderWedge(150, 150, 90, 145, data.angle, data.outer, false, handleSelection)}
								{renderWedge(150, 150, 45, 90, data.angle, data.inner, true, handleSelection)}
							</Fragment>
						))}
						<circle cx="150" cy="150" r="45" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1" />
					</svg>
				</div>
				<div className="tonalidade-buttons-container">
					<PrimaryButton fullWidth onClick={() => handleSelection("Random")}>
						Aleatório
					</PrimaryButton>
					<SecondaryButton fullWidth onClick={() => navigate("/")}>
						Cancelar
					</SecondaryButton>
				</div>
			</ContentBox>
		</Page>
	)
}

export default Tonalidade
