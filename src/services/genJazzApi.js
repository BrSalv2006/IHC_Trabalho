export const API_BASE_URL = process.env.REACT_APP_GENJAZZ_API_URL || "https://genjazz-api.fly.dev"

const ensureOk = (response, fallbackMessage) => {
	if (!response.ok) {
		throw new Error(`${fallbackMessage} (${response.status})`)
	}
}

const readJson = async (response, fallbackMessage) => {
	ensureOk(response, fallbackMessage)

	const text = await response.text()

	if (!text) {
		return null
	}

	try {
		return JSON.parse(text)
	} catch {
		throw new Error(`${fallbackMessage} Resposta inválida.`)
	}
}

const normalizeList = (data, key) => {
	if (!Array.isArray(data)) {
		return []
	}

	const values = data
		.map((item) => item?.[key] ?? item)
		.filter((item) => item !== null && item !== undefined)
		.map((item) => String(item).trim())
		.filter(Boolean)

	return [...new Set(values)]
}

const apiPathValue = (value) => encodeURIComponent(String(value || "Random"))

const sequencePayload = ({
	email,
	chords,
	key,
	structure = "Random",
	modulation = "Random",
}) => ({
	email,
	chords,
	key,
	structure,
	modulation,
})

export const getStructures = async () => {
	const response = await fetch(`${API_BASE_URL}/api/structures`)
	const data = await readJson(response, "Não foi possível carregar as estruturas.")

	return normalizeList(data, "structure")
}

export const getModulations = async () => {
	const response = await fetch(`${API_BASE_URL}/api/modulations`)
	const data = await readJson(response, "Não foi possível carregar as modulações.")

	return normalizeList(data, "modulation")
}

export const generateSequence = async ({
	key = "Random",
	structure = "Random",
	modulation = "Random",
}) => {
	const response = await fetch(
		`${API_BASE_URL}/api/generate/${apiPathValue(key)}/${apiPathValue(structure)}/${apiPathValue(modulation)}`
	)

	return readJson(response, "Não foi possível gerar a sequência.")
}

export const getSequenceAudioUrl = async (chords) => {
	const response = await fetch(`${API_BASE_URL}/api/chords2mp3/${encodeURIComponent(chords)}`)
	const data = await readJson(response, "Não foi possível gerar o áudio.")

	if (!data?.mp3_url) {
		throw new Error("A API não devolveu um ficheiro de áudio.")
	}

	return data.mp3_url.startsWith("http") ? data.mp3_url : `${API_BASE_URL}${data.mp3_url}`
}

export const saveSequence = async ({
	email,
	chords,
	key,
	structure = "Random",
	modulation = "Random",
}) => {
	const payload = sequencePayload({
		email,
		chords,
		key,
		structure,
		modulation,
	})

	const bodyResponse = await fetch(`${API_BASE_URL}/api/chords`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	})

	if (bodyResponse.ok) {
		return
	}

	if (bodyResponse.status !== 404 && bodyResponse.status !== 405) {
		throw new Error(`Não foi possível guardar a sequência. (${bodyResponse.status})`)
	}

	const pathResponse = await fetch(
		`${API_BASE_URL}/api/chords/${apiPathValue(payload.email)}/${apiPathValue(payload.chords)}/${apiPathValue(payload.key)}/${apiPathValue(payload.structure)}/${apiPathValue(payload.modulation)}`,
		{ method: "POST" }
	)

	ensureOk(pathResponse, "Não foi possível guardar a sequência.")
}

export const getUserSequences = async (email) => {
	const response = await fetch(`${API_BASE_URL}/api/chords/user/${encodeURIComponent(email)}`)

	return readJson(response, "Não foi possível carregar as sequências.")
}

export const deleteSequence = async (email, sequenceId) => {
	const response = await fetch(
		`${API_BASE_URL}/api/chords/${encodeURIComponent(email)}/${encodeURIComponent(sequenceId)}`,
		{ method: "DELETE" }
	)

	if (!response.ok) {
		throw new Error(`Não foi possível apagar a sequência. (${response.status})`)
	}
}
