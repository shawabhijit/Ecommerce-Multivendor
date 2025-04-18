
import { useEffect } from 'react';
import HeroCarousel from './Private/HeroCarousel/HeroCarousel';
import DealsOfTheDay from './Private/DealsOfTheDay/DealsOfTheDay';
import ProductFeed from './Private/ProductFeed/ProductFeed';
import PersonalizedSuggestions from './Private/PersonalizedSuggestion/PersonalizedSuggestion';
import FeaturesSection from './Public/FeatureSection/FeatureSection';
import CategoriesSection from './Public/CategoriesSection/CategoriesSection';
import WhyChooseUsSection from './Public/WhyChooseUs/WhyChooseUsSection';
import TestimonialsSection from './Public/TestimonialsSection/TestimonialsSection';
import VendorCTASection from './Public/VendorCTA/VendorCTASection';
import Footer from '../../Layout/Footer/Footer';



const Index = ({ isLogedin }: any) => {

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