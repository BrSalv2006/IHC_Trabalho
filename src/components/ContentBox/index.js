import "./style.css"

const ContentBox = ({ children, className = "", ...props }) => {
	return (
		<div className={`content-box ${className}`.trim()} {...props}>
			{children}
		</div>
	)
}

export default ContentBox
