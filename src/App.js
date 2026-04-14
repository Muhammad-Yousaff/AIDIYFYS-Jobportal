
import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './Pages/ScrollToTop';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <SpeedInsights/>


    </>
  );
}

export default App;
