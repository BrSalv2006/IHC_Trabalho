import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react"; // Hook correto para registo
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import saxLogo from "../assets/sax.jpg";

function Registo() {
  const { isLoaded, signUp, setActive } = useSignUp(); // Hook correto
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      // Cria o utilizador
      const result = await signUp.create({
        emailAddress: email,
        password: password,
      });

      // Se for preciso confirmar email, podes lidar aqui
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
      } else {
        console.log("Confirmação necessária:", result.verifications);
      }
    } catch (err) {
      alert("Erro ao registar: " + err.errors[0].message);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      
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

      <Typography sx={{ fontSize: "32px", fontWeight: 700, color: "#1A1A1A", mb: 3, fontFamily: 'sans-serif' }}>
        Registar
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField 
          fullWidth label="Nome" margin="normal" variant="outlined"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        <TextField 
          fullWidth label="Email" margin="normal" variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        <TextField 
          fullWidth label="Password" type="password" margin="normal" variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: '15px', fontFamily: 'sans-serif' } }}
        />
        
        <Button fullWidth type="submit" variant="contained" 
          sx={{ mt: 3, bgcolor: '#C845E9', borderRadius: '15px', py: 1.5, textTransform: 'none', fontSize: '16px', fontFamily: 'sans-serif' }}>
          Registar
        </Button>
      </form>

      <Typography sx={{ mt: 3, textAlign: 'center', fontSize: '14px', fontFamily: 'sans-serif' }}>
        Já tem conta? <Link href="/login" sx={{ color: '#6750A4', fontWeight: 'bold', textDecoration: 'none' }}>Entrar</Link>
      </Typography>
    </Box>
  );
}

export default Registo;