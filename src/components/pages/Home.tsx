import React, { useEffect } from 'react';
import { Hero } from '../home/Hero';
import { Marquee } from '../home/Marquee';
import { FeaturedCategories } from '../home/FeaturedCategories';
import { NewArrivals } from '../home/NewArrivals';
import { BrandStory } from '../home/BrandStory';
import { Lookbook } from '../home/Lookbook';
import { Testimonials } from '../home/Testimonials';
import { SocialFeed } from '../home/SocialFeed';
import { Newsletter } from '../home/Newsletter';

export const Home: React.FC = () => {
  // Support automatic page top adjustments
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col bg-neutral-950 w-full min-h-screen">
      <Hero />
      <Marquee />
      <FeaturedCategories />
      <NewArrivals />
      <BrandStory />
      <Lookbook />
      <Testimonials />
      <SocialFeed />
      <Newsletter />
    </div>
  );
};
