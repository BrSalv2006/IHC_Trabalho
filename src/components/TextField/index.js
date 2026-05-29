import React, { forwardRef } from "react"
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
			FormHelperTextProps={{
				title: tooltipText,
				...FormHelperTextProps
			}}
			{...rest}
		/>
	)
})

export default CustomTextField
