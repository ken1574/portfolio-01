export const theme = {
  colors: {
    primary: '#3E2C23',        // dark brown base
    secondary: '#5A3E36',      // muted warm brown
    accent: '#D6A77A',         // soft warm tan for highlights
    light: '#D6A77A',          // light beige for contrast
    text: '#FDFBF9',           // near-white for good readability
    textLight: '#FDFBF9',
    textDark: '#3E2C23',
    glass: {
      background: 'rgba(255, 255, 255, 0.06)',
      border: 'transparent',
      card: 'rgba(62, 44, 35, 0.2)',  // dark brown semi-transparent
    },
    gradient: {
      main: 'linear-gradient(135deg, #3E2C23 0%, #5A3E36 50%, #3E2C23 100%)',
      accent: 'linear-gradient(135deg, #D6A77A 0%, #e6c3a5 100%)',
      glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    },
    overlay: {
      light: 'rgba(255, 255, 255, 0.07)',
      dark: 'rgba(62, 44, 35, 0.35)',
    }
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    default: '0.3s ease',
  },
};

export type Theme = typeof theme;
