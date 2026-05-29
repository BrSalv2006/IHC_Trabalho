import React, { useState } from "react"
import { useUser, SignOutButton } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Menu, MenuItem } from "@mui/material"

import Page from '../../components/Page'
import Appbar from '../../components/Appbar'
import ContentBox from '../../components/ContentBox'
import PrimaryButton from '../../components/PrimaryButton'

import "./style.css"

function Dashboard() {
	const { user } = useUser()
	const navigate = useNavigate()
	const [anchorEl, setAnchorEl] = useState(null)

	const handleOpenMenu = (e) => {
		setAnchorEl(e.currentTarget)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
	}

	const handleNavigateTonalidade = () => {
		navigate("/tonalidade")
	}

	const handleNavigateSequencias = () => {
		navigate("/minhas-sequencias")
	}

	const handleNavigateAlterarPassword = () => {
		setAnchorEl(null)
		navigate("/alterar-password")
	}

	return (
		<Page>
			<Appbar onLogoClick={handleOpenMenu} />
			<ContentBox className="dashboard-content-box">
				<h1 className="dashboard-greeting">Olá, {user?.firstName || "Músico"}!</h1>
				<PrimaryButton onClick={handleNavigateTonalidade}>
					Criar nova sequência
				</PrimaryButton>
				<PrimaryButton onClick={handleNavigateSequencias}>
					As minhas sequências
				</PrimaryButton>
			</ContentBox>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleCloseMenu}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				PaperProps={{
					sx: {
						borderRadius: '15px',
						boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
						minWidth: '180px'
					}
				}}
			>
				<MenuItem onClick={handleNavigateAlterarPassword}>
					Alterar password
				</MenuItem>
				<SignOutButton>
					<MenuItem>Sair</MenuItem>
				</SignOutButton>
			</Menu>
		</Page >
	)
}

export default Dashboard
