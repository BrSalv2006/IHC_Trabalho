import { SignIn } from "@clerk/clerk-react"

function SignInPage() {
	return (
		<SignIn
			appearance={{
				elements: {
					rootBox: {
						width: "100%",
						height: "100%",
					},
					cardBox: {
						width: "100%",
						height: "100%",
					},
				},
			}}
		/>
	)
}

export default SignInPage
