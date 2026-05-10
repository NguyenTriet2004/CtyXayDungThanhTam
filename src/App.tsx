/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/src/components/layout/Navbar';
import Footer from '@/src/components/layout/Footer';
import HomePage from '@/src/pages/HomePage';
import LoginPage from '@/src/pages/LoginPage';
import ServicesPage from '@/src/pages/ServicesPage';
import ProjectsPage from '@/src/pages/ProjectsPage';
import ProjectDetailPage from '@/src/pages/ProjectDetailPage';
import BlogPage from '@/src/pages/BlogPage';
import BlogDetailPage from '@/src/pages/BlogDetailPage';
import ContactPage from '@/src/pages/ContactPage';
import ScrollToTop from '@/src/components/utils/ScrollToTop';
import AdminDashboard from '@/src/pages/AdminDashboard';
import AdminBlogEditor from '@/src/pages/AdminBlogEditor';
import AdminProjectEditor from '@/src/pages/AdminProjectEditor';
import '@/src/i18n';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
        <Route path="/projects/:id" element={<Layout><ProjectDetailPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/admin/blog/new" element={<Layout><AdminBlogEditor /></Layout>} />
        <Route path="/admin/project/new" element={<Layout><AdminProjectEditor /></Layout>} />
      </Routes>
    </Router>
  );
}
