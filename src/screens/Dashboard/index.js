import React, { useState } from "react"
import { useUser, SignOutButton } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import { Menu, MenuItem, IconButton, Box, Typography } from "@mui/material"

import Page from '../../components/Page'
import ContentBox from '../../components/ContentBox'
import PrimaryButton from '../../components/PrimaryButton'
import logo from "../../assets/logo.jpg"

import "./style.css"

function Dashboard() {
    const { user } = useUser()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    return (
        <Page className="dashboard-page">
            <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Cabeçalho "pílula" */}
                <Box className="dashboard-header">
                    <Typography className="dashboard-brand">GENERATIVE JAZZ</Typography>
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
                        <img src={logo} alt="Logo" className="dashboard-logo" />
                    </IconButton>
                </Box>

                <Typography className="dashboard-greeting">
                    Olá, {user?.firstName || "Júlia"}!
                </Typography>

                {/* Ao usar o PrimaryButton, ele herda a borda preta do seu style.css */}
                <ContentBox className="dashboard-actions">
                    <PrimaryButton onClick={() => navigate("/tonalidade")}>
                        Criar nova sequência
                    </PrimaryButton>
                    <PrimaryButton onClick={() => navigate("/minhas-sequencias")}>
                        As minhas sequências
                    </PrimaryButton>
                </ContentBox>
            </Box>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
                <MenuItem onClick={() => { setAnchorEl(null); navigate("/alterar-password"); }}>
                    Alterar password
                </MenuItem>
                <SignOutButton>
                    <MenuItem>Sair</MenuItem>
                </SignOutButton>
            </Menu>
        </Page>
    )
}

export default Dashboard