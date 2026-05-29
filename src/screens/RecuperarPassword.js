import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react"; // Hook correto
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import saxLogo from "../assets/sax.jpg";

function RecuperarPassword() {
  const { isLoaded, signIn } = useSignIn(); // Hook de SignIn
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Inicia o processo de reset de password
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      alert("Foi enviado um código para o teu email para recuperares a password.");
    } catch (err) {
      alert("Erro ao recuperar: " + err.errors[0].message);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 6, justifyContent: 'center', gap: 2 }}>
        <img 
          src={saxLogo} 
          alt="Logo" 
          style={{ width: '50px', height: '50px', objectFit: 'contain' }} 
        />
        <Typography sx={{ fontWeight: 700, fontSize: '18px', color: '#1A1A1A', fontFamily: 'sans-serif' }}>
          GENERATIVE JAZZ
        </Typography>
      </Box>

      {/* Título */}
      <Typography sx={{ fontSize: "32px", fontWeight: 700, color: "#1A1A1A", mb: 3, fontFamily: 'sans-serif' }}>
        Recuperar Password
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Email" margin="normal" variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        
        <Button fullWidth type="submit" variant="contained" 
          sx={{ mt: 3, bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', fontFamily: 'sans-serif' }}>
          Recuperar
        </Button>
      </form>

      {/* Rodapé: Voltar */}
      <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        <Link href="/login" sx={{ color: '#6750A4', fontWeight: 'bold', textDecoration: 'none' }}>Voltar</Link>
      </Typography>
    </Box>
  );
}

export default RecuperarPassword;