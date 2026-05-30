import "./style.css"

const toMeasures = (chords) => {
	if (Array.isArray(chords)) {
		return chords
	}

	if (typeof chords !== "string") {
		return []
	}

	return chords.split("|").filter(Boolean)
}

const formatMeasure = (measure) => String(measure).replace(/,/g, " ").trim()

const SequenceGrid = ({ chords }) => {
	const measures = toMeasures(chords)

	if (measures.length === 0) {
		return <p className="sequence-grid-empty">Sem acordes disponíveis.</p>
	}

	return (
		<div className="sequence-grid" aria-label="Tabela de acordes">
			{measures.map((measure, index) => (
				<div className="sequence-grid-cell" key={`${measure}-${index}`}>
					{formatMeasure(measure)}
				</div>
			))}
		</div>
	)
}

export default SequenceGrid
