import "./style.css"

const Page = ({ children, className = "", ...props }) => {
	return (
		<div className={`page-container ${className}`.trim()} {...props}>
			{children}
		</div>
	)
}

export default Page
