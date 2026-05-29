import { forwardRef } from "react"
import { TextField } from "@mui/material"
import "./style.css"

const CustomTextField = forwardRef(({ fullWidth = true, variant = "outlined", margin = "normal", className = "", ...props }, ref) => {
	return (
		<TextField
			ref={ref}
			fullWidth={fullWidth}
			variant={variant}
			margin={margin}
			className={`custom-input-field ${className}`}
			{...props}
		/>
	)
})

export default CustomTextField
