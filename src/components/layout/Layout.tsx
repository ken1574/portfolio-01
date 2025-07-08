import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { theme } from '../../styles/theme';
import { FloatingNav } from '../navigation/FloatingNav';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';

interface LayoutProps {
  children: ReactNode;
}

const LayoutWrapper = styled.div`
  @media print {
    background: white !important;
    color: black !important;
    
    * {
      color: black !important;
      text-shadow: none !important;
      box-shadow: none !important;
    }

    section {
      min-height: auto !important;
      padding: 2rem 0 !important;
      page-break-inside: avoid;
    }

    a[href]:after {
      content: " (" attr(href) ")";
      font-size: 0.8em;
    }
  }

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  position: relative;
  background: transparent;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at 70% 30%,
      ${theme.colors.accent}15 0%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

const Header = styled.header`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  padding: ${theme.spacing.md} 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;

  @media print {
    display: none;
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, ${theme.colors.glass.background}, transparent);
  }
`;

const Nav = styled.nav`
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 ${theme.spacing.md};
    max-width: 1200px;
    margin: 0 auto;
    width: 90%;
  }
`;

const Logo = styled(motion.div)`
  color: ${theme.colors.light};
  font-family: ${theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 700;
`;

// const NavLinks = styled.div`
//   display: flex;
//   gap: ${theme.spacing.lg};

//   a {
//     color: ${theme.colors.textLight};
//     transition: all ${theme.transitions.default};
//     font-weight: 500;
//     padding: ${theme.spacing.xs} ${theme.spacing.sm};
//     border-radius: 4px;

//     &:hover {
//       color: ${theme.colors.light};
//       background-color: rgba(255, 255, 255, 0.1);
//     }
//   }

//   @media (max-width: ${theme.breakpoints.sm}) {
//     gap: ${theme.spacing.md};
//   }
// `;

const ResumeButton = styled.a`
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  font-weight: 600;
  padding: 6px 16px;
  border-radius: 20px;
  text-decoration: none;
  transition: background ${theme.transitions.default}, transform ${theme.transitions.default};
  box-shadow: 0 2px 8px ${theme.colors.accent}40;

  &:hover {
    background: ${theme.colors.accent};
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
    box-shadow:
      0 0 0 2px ${theme.colors.accent}80,
      0 0 0 4px ${theme.colors.accent}40;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 4px 12px;
    font-size: 0.9rem;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: ${theme.breakpoints.sm}) {
    display: block;
  }

  div {
    width: 24px;
    height: 2px;
    background-color: ${theme.colors.textLight};
    margin: 5px 0;
    transition: all 0.3s ease;
  }

  &.open div:nth-of-type(1) {
    transform: rotate(45deg) translate(4px, 4px);
  }

  &.open div:nth-of-type(2) {
    opacity: 0;
  }

  &.open div:nth-of-type(3) {
    transform: rotate(-45deg) translate(4px, -4px);
  }
`;


const DesktopNavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }

  a {
    color: ${theme.colors.textLight};
    font-weight: 500;
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: 4px;
    transition: all ${theme.transitions.default};

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const MobileMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  right: ${theme.spacing.md};
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(10px);
  padding: ${theme.spacing.md};
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 999;

  a {
    color: ${theme.colors.textLight};
    padding: ${theme.spacing.sm} 0;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      color: ${theme.colors.accent};
    }
  }

  ${ResumeButton} {
    margin-top: ${theme.spacing.sm};
    align-self: flex-start;
    padding: 5px;
    border-radius: 5px;
  }
`;

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } }
};

const Main = styled.main`
  flex: 1;
  margin-top: 4.5rem;
  width: 100%;
  overflow-x: hidden;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: ${theme.colors.accent};
  color: ${theme.colors.textDark};
  padding: ${theme.spacing.sm};
  z-index: 9999;
  transition: top 0.2s;

  &:focus {
    top: 0;
  }
`;

const Footer = styled.footer`
  background: ${theme.colors.glass.background};
  backdrop-filter: blur(8px);
  color: ${theme.colors.textLight};
  padding: ${theme.spacing.lg} 0;
  text-align: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: -20px;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to top, ${theme.colors.glass.background}, transparent);
  }
`;



export const Layout = ({ children }: LayoutProps) => {
  useKeyboardNavigation();

  useEffect(() => {
    // Add keyboard navigation instructions to console
    console.info(
      'Keyboard Navigation:\n',
      '- Arrow Up/Down or PageUp/PageDown: Navigate between sections\n',
      '- Home: Go to top\n',
      '- End: Go to bottom'
    );
  }, []);

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <LayoutWrapper>
      <SkipLink href="#main-content">
        Skip to main content
      </SkipLink>

      <Header role="banner">
        <Nav role="navigation" aria-label="Main navigation">
          <div className="container">
            <Logo
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              role="heading"
              aria-level={1}
            >
              Portfolio
            </Logo>

            <DesktopNavLinks role="list">
              {/* always visible on desktop */}
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#contact">Contact</a>
              <ResumeButton href="/portfolio-01/resume.pdf" target="_blank" rel="noopener noreferrer">
                Resume
              </ResumeButton>
            </DesktopNavLinks>

            <HamburgerButton
              className={isMenuOpen ? 'open' : ''}
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div></div>
              <div></div>
              <div></div>
            </HamburgerButton>

            <AnimatePresence>
              {isMenuOpen && (
                <MobileMenu
                  key="mobileMenu"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={mobileMenuVariants}
                  role="list"
                >
                  <a onClick={() => setIsMenuOpen(false)} href="#about">About</a>
                  <a onClick={() => setIsMenuOpen(false)} href="#projects">Projects</a>
                  <a onClick={() => setIsMenuOpen(false)} href="#skills">Skills</a>
                  <a onClick={() => setIsMenuOpen(false)} href="#contact">Contact</a>
                  <ResumeButton href="/portfolio-01/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </ResumeButton>
                </MobileMenu>

              )}
            </AnimatePresence>
          </div>
        </Nav>
      </Header>
      <Main id="main-content" role="main" tabIndex={-1}>
        {children}
      </Main>
      <FloatingNav />
      <Footer role="contentinfo">
        <div className="container">
          <p>© {new Date().getFullYear()} Ken Yew. All rights reserved.</p>
        </div>
      </Footer>
    </LayoutWrapper>
  );
};
