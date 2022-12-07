import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import FeaturesTiles from '../components/sections/FeaturesTiles';
import Frontend from '../components/sections/Frontend';
import Backend from '../components/sections/Backend';
import Api from '../components/sections/Api';
import Futurework from '../components/sections/FutureWork';
import Team from '../components/sections/Team';

import FeaturesSplit from '../components/sections/FeaturesSplit';
import Testimonial from '../components/sections/Testimonial';
import Cta from '../components/sections/Cta';

const Home = () => {

  return (
    <>
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <Frontend topDivider/>
      <Backend topDivider/>
      <Api topDivider/>
      <Futurework topDivider/>
      <Team topDivider/>
      {/* <FeaturesSplit invertMobile topDivider imageFill className="illustration-section-02" />
      <Testimonial topDivider /> */}
      {/* <Cta split /> */}
    </>
  );
}

export default Home;