import React, { ReactNode } from 'react';
import MusicPlayer from './components/general/MusicPlayer';
import Header from './components/general/Header';
import ScrollArrow from './components/general/ScrollArrow';
import { ThemeContext } from './contexts/ThemeContext';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const themeContext = React.useContext(ThemeContext);

  if (!themeContext) {
    throw new Error(
      `ThemeContext is undefined. Make sure it is provided by a ThemeProvider`,
    );
  }

  const { theme } = themeContext;

  return (
    <div
      className={theme === `dark` ? `dark bg-black text-white` : `text-text`}
    >
      <Header />
      <MusicPlayer />
      {children}
      <ScrollArrow />
    </div>
  );
};

export default Layout;
