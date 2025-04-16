import DealsOfTheDay from './Pages/Home/Private/DealsOfTheDay/DealsOfTheDay';
import HeroCarousel from './Pages/Home/Private/HeroCarousel/HeroCarousel';
import PersonalizedSuggestions from './Pages/Home/Private/PersonalizedSuggestion/PersonalizedSuggestion';
import ProductFeed from './Pages/Home/Private/ProductFeed/ProductFeed';
import CategoriesSection from './Pages/Home/Public/CategoriesSection/CategoriesSection';
import FeaturesSection from './Pages/Home/Public/FeatureSection/FeatureSection';
import HeroSection from './Pages/Home/Public/HeroSection/HeroSection';
import TestimonialsSection from './Pages/Home/Public/TestimonialsSection/TestimonialsSection';
import VendorCTASection from './Pages/Home/Public/VendorCTA/VendorCTASection';
import WhyChooseUsSection from './Pages/Home/Public/WhyChooseUs/WhyChooseUsSection';
import Footer from '../../layout/Footer/Footer';
import { useEffect } from 'react';



const Index = ({ isLogedin }: any) => {

    // Add smooth scrolling for anchor links
    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const id = target.getAttribute('href')?.substring(1);
                const element = document.getElementById(id || '');

                if (element) {
                    const offset = 80; // Account for fixed header
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);
        return () => document.removeEventListener('click', handleAnchorClick);
    }, []);

    return (
        <div className="flex flex-col min-h-screen overflow-x-hidden">
            {/* <Navbar2 isLogedin={isLogedin} /> */}
            {
                isLogedin ? (
                    <main className="flex-grow">
                        <div className="container mx-auto px-4 space-y-8 pb-10 pt-32">

                            <HeroCarousel />

                            <DealsOfTheDay />

                            <ProductFeed title="Electronics" category="electronics" />

                            <ProductFeed title="Fashion" category="fashion" />

                            <PersonalizedSuggestions />

                            <ProductFeed title="Home & Kitchen" category="home" />
                        </div>
                    </main>
                ) : (
                    <main>
                        <div className="container mx-auto px-4 space-y-8 pb-10 pt-32">
                        <HeroCarousel />
                        <FeaturesSection />
                        <CategoriesSection />
                        <DealsOfTheDay />
                        <WhyChooseUsSection />
                        <TestimonialsSection />
                        <VendorCTASection />
                        </div>
                    </main>
                )
            }
            <Footer />
        </div>
    );
};

export default Index;