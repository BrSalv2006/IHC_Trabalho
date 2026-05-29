import { forwardRef } from "react"
import { Button } from "@mui/material"
import "./style.css"

const PrimaryButton = forwardRef(({ fullWidth = true, variant = "contained", className = "", children, ...props }, ref) => {
	return (
		<Button
			ref={ref}
			fullWidth={fullWidth}
			variant={variant}
			className={`primary-button ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
})

export default PrimaryButton
