import { useEffect, useState } from "react"

const useRemoteOptions = (loadOptions, errorMessage) => {
	const [options, setOptions] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		let isMounted = true

		const fetchOptions = async () => {
			setLoading(true)
			setError("")

			try {
				const data = await loadOptions()

				if (isMounted) {
					setOptions(Array.isArray(data) ? data : [])
				}
			} catch (err) {
				console.error(errorMessage, err)

				if (isMounted) {
					setError(errorMessage)
				}
			} finally {
				if (isMounted) {
					setLoading(false)
				}
			}
		}

		fetchOptions()

		return () => {
			isMounted = false
		}
	}, [loadOptions, errorMessage])

	return { options, loading, error }
}

export default useRemoteOptions
