import React from "react"
import { Box, Typography } from "@mui/material"
import saxLogo from "../assets/sax.jpg"

const SplashScreen = () => {
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background: "linear-gradient(180deg, #FFF 72%, #E4A2F4 85%, #C845E9 92%, #7533BC 99.99%)"
			}}
		>
			<Box
				sx={{
					width: 168,
					height: 168,
					borderRadius: "50%",
					backgroundColor: "rgba(255, 255, 255, 0.5)",
					backgroundImage: `url(${saxLogo})`,
					backgroundSize: "80%",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center"
				}}
			/>
			<Box
				sx={{
					display: "flex",
					padding: "18.25px",
					justifyContent: "center",
					alignItems: "center",
					gap: "18.25px"
				}}
			>

			</Box>
			<Typography
				sx={{
					color: "var(--Text-Primary, #1A1A1A)",
					fontFamily: "Roboto, sans-serif",
					fontSize: "32px",
					fontStyle: "normal",
					fontWeight: 700,
					lineHeight: "36.5px"
				}}
			>
				GENERATIVE JAZZ
			</Typography>
		</Box>
	)
}

export default SplashScreen
