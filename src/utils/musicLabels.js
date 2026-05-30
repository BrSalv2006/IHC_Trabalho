export const translateModulation = (modulation) => {
	const labels = {
		Dominant: "Dominante",
		Relative: "Relativa",
		Subdominant: "Subdominante",
		Subdominat: "Subdominante",
		Parallel: "Paralela",
		Chromatic: "Cromática",
	}

	return labels[modulation] || modulation
}

export const visibleStructures = ["AABA", "AABC", "ABAB"]
