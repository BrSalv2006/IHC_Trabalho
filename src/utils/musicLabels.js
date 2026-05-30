const optionLabels = {
	Random: "Aleatório",
	None: "Nenhuma",
	Dominant: "Dominante",
	Relative: "Relativa",
	Subdominant: "Subdominante",
	Subdominat: "Subdominante",
	Parallel: "Paralela",
	Chromatic: "Cromática",
}

export const formatMusicOptionLabel = (value) => optionLabels[value] || value

export const formatStructureLabel = (structure) => formatMusicOptionLabel(structure)

export const formatModulationLabel = (modulation) => formatMusicOptionLabel(modulation)
