import { forwardRef } from "react"
import { Button } from "@mui/material"
import "./style.css"

const SecondaryButton = forwardRef(({ fullWidth = true, variant = "contained", className = "", children, ...props }, ref) => {
	return (
		<Button
			ref={ref}
			fullWidth={fullWidth}
			variant={variant}
			className={`secondary-button ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
})

export default SecondaryButton
