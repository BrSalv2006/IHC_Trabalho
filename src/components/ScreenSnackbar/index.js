import { Alert, Snackbar } from "@mui/material"

import "./style.css"

const ScreenSnackbar = ({
	open,
	onClose,
	severity = "info",
	autoHideDuration = 6000,
	children,
}) => (
	<Snackbar
		open={open}
		autoHideDuration={autoHideDuration}
		onClose={onClose}
		className="screen-snackbar"
	>
		<Alert
			onClose={onClose}
			severity={severity}
			className="screen-alert"
		>
			{children}
		</Alert>
	</Snackbar>
)

export default ScreenSnackbar
