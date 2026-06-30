import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Events from './pages/Events';
import Tournaments from './pages/Tournaments';
import Coaching from './pages/Coaching';
import Blog from './pages/Blog';
import Gallery from './pages/Gallery';
import BookCourt from './pages/BookCourt';
import Contact from './pages/Contact';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="membership" element={<Membership />} />
          <Route path="events" element={<Events />} />
          <Route path="tournaments" element={<Tournaments />} />
          <Route path="coaching" element={<Coaching />} />
          <Route path="blog" element={<Blog />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="book-court" element={<BookCourt />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

