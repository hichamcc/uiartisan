import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ComponentGrid from '../components/ComponentGrid';
import Sponsors from '../components/Sponsors';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <ComponentGrid />
      <Sponsors />
      <Contact />
    </Layout>
  );
};

export default Home;