import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import saxLogo from "../assets/sax.jpg"; 

function Login() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      const result = await signIn.create({ identifier: email, password });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      }
    } catch (err) {
      alert("Erro ao entrar: " + err.errors[0].message);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
      {/* Cabeçalho: Sem círculo, apenas logo e texto */}
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
        Login
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Email" margin="normal" variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        <TextField 
          fullWidth label="Password" type="password" margin="normal" variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        
        <Link href="/recuperar-password" sx={{ display: 'block', mt: 1, mb: 3, color: '#6750A4', textDecoration: 'none', fontSize: '14px', fontFamily: 'sans-serif' }}>
          Recuperar password
        </Link>

        <Button fullWidth type="submit" variant="contained" 
          sx={{ bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', fontFamily: 'sans-serif' }}>
          Entrar
        </Button>
      </form>

      {/* Rodapé */}
      <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Não tem conta? <Link href="/registo" sx={{ color: '#6750A4', fontWeight: 'bold', textDecoration: 'none' }}>Registe-se</Link>
      </Typography>
    </Box>
  );
}

export default Login;