import { render, screen } from '@testing-library/react'
import App from './App'

jest.mock('react-router-dom', () => ({
	BrowserRouter: ({ children }) => children,
	Routes: ({ children }) => children,
	Route: ({ path, element }) => (path === '/' ? element : null),
	Navigate: () => null,
	useNavigate: () => jest.fn(),
	useLocation: () => ({ state: null }),
}), { virtual: true })

jest.mock('@clerk/clerk-react', () => ({
	SignedIn: ({ children }) => children,
	SignedOut: () => null,
	useUser: () => ({
		user: {
			firstName: 'Teste',
		},
	}),
	SignOutButton: ({ children }) => children,
}))

test('renders the dashboard after the splash has been seen', () => {
	sessionStorage.setItem('hasSeenSplash', 'true')

	render(<App />)

	expect(screen.getByText(/Olá, Teste!/i)).toBeInTheDocument()
})
