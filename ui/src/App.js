import * as React from 'react';
import logo from './logo.svg';
import NavBar from './muiAppBar';
import ProjectsPage from './projectsPage';
import {Route, Routes} from 'react-router-dom'
import GlobalStyles from "@mui/material/GlobalStyles";
import { useTheme, ThemeProvider, createTheme} from '@mui/material/styles';
import { Typography } from '@mui/material';


const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#029E5F",
      contrastText: "#fff",
    },
  },
});


function App() {
  return (
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles
          styles={{
            color: "white",
            body: { backgroundColor: "#25D18B" }
          }}
        />
        <NavBar
        user_name="FooBar"/>
          <Routes>
            <Route path="/" element={<div />} /> {/* TODO */}
            <Route path="/hardware" element={<Typography color='#44A4F6'>Nothing here. go to projects</Typography>} /> {/* TODO */}
            <Route path="/logout" element={<div />} /> {/* TODO */}
            <Route path="/projects" element={<ProjectsPage />} /> 
          </Routes>     
      </ThemeProvider>
  );
}

export default App;
