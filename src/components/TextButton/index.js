import { forwardRef } from "react"
import { Button } from "@mui/material"
import "./style.css"

const TextButton = forwardRef(({ fullWidth = false, className = "", children, ...props }, ref) => {
	return (
		<Button
			ref={ref}
			fullWidth={fullWidth}
			variant="text"
			className={`text-button ${className}`}
			{...props}
		>
			{children}
		</Button>
	)
})

export default TextButton
