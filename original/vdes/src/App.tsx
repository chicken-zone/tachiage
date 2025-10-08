import { BrowserRouter as Router, Routes } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import routes from './app/routes'
import { generateRoutes } from './app/route-generator'
import { createCustomTheme } from './theme/customTheme'
import { ThemeModeProvider, useThemeMode } from './context/ThemeContext'

// メインコンテンツコンポーネント（テーマコンテキスト内で使用）
const AppContent = () => {
  const { mode } = useThemeMode();
  const theme = createCustomTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        height: '100vh', 
        width: '100vw',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        '& *': {
          boxSizing: 'border-box'
        }
      }}>
        <Router>
          <Routes>
            {generateRoutes(routes)}
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App
