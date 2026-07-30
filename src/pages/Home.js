import React from 'react'
import FeaturedProducts from "../components/home/FeaturedProducts";
import HeroSection from '../components/home/HeroSection';
import ReelsSection from '../components/home/ReelsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import HoneyMatcher from '../components/home/HoneyMatcher';
import PurityProcess from '../components/home/PurityProcess';

export default function Home({ onAddToCart }) {
  return (
    <>
      <HeroSection />
      <FeaturedProducts onAddToCart={onAddToCart}/>
      <HoneyMatcher onAddToCart={onAddToCart}/>
      <WhyChooseUs/>
      <ReelsSection/>
      <PurityProcess/>
    </>
  );
}

