import { forwardRef } from "react"
import { TextField } from "@mui/material"
import "./style.css"

const CustomTextField = forwardRef((props, ref) => {
	const {
		fullWidth = true,
		variant = "outlined",
		margin = "normal",
		className = "",
		helperText,
		FormHelperTextProps,
		slotProps = {},
		...rest
	} = props

	let tooltipText = ""

	if (typeof helperText === "string") {
		if (helperText.trim() !== "") {
			tooltipText = helperText
		}
	}

	return (
		<TextField
			ref={ref}
			fullWidth={fullWidth}
			variant={variant}
			margin={margin}
			className={`custom-input-field ${className}`}
			helperText={helperText}
			slotProps={{
				...slotProps,
				formHelperText: {
					title: tooltipText,
					...FormHelperTextProps,
					...slotProps.formHelperText,
				},
			}}
			{...rest}
		/>
	)
})

export default CustomTextField
