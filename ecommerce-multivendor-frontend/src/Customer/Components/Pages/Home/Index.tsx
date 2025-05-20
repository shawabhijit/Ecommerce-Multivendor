
import HeroCarousel from './Private/HeroCarousel/HeroCarousel';
import DealsOfTheDay from './Private/DealsOfTheDay/DealsOfTheDay';
import ProductFeed from './Private/ProductFeed/ProductFeed';
import FeaturesSection from './Public/FeatureSection/FeatureSection';
import CategoriesSection from './Public/CategoriesSection/CategoriesSection';
import WhyChooseUsSection from './Public/WhyChooseUs/WhyChooseUsSection';
import TestimonialsSection from './Public/TestimonialsSection/TestimonialsSection';
import VendorCTASection from './Public/VendorCTA/VendorCTASection';
import Footer from '../../Layout/Footer/Footer';
import { useAppDispatch, useAppSelecter } from '../../../../app/Store';
import { useEffect, useState } from 'react';
import { Products } from '../../../../types/ProductTupe';
import { fetchAllProducts } from '../../../../app/customer/ProductSlice';



const Index = () => {

    const dispatch = useAppDispatch();
    const [products, setProduct] = useState<Products[]>([]);

    const fetchProducts = async () => {
        const res = await dispatch(fetchAllProducts({}));
        //console.log("getting all products in product feed with ," , res.payload.content);
        if (res.meta.requestStatus == "fulfilled") {
            setProduct(res.payload?.content)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [dispatch])

    const { isLoggedIn } = useAppSelecter((state) => state.customers)
    console.log("isLoggedIn", isLoggedIn)
    return (
        <>
            <div className="flex flex-col min-h-screen overflow-x-hidden">
                {
                    isLoggedIn ? (
                        <main className="flex-grow">
                            <div className="container mx-auto px-4 space-y-8 pb-10 pt-32">

                                <HeroCarousel />

                                <CategoriesSection />

                                <DealsOfTheDay products={products} />

                                {/* <PersonalizedSuggestions products={products} /> */}

                                <ProductFeed products={products} title="Electronics" category="Electronics" />

                                <ProductFeed products={products} title="Fashion" category="Fashion" />


                                <ProductFeed products={products} title="Sports & Outdoors" category="Sports & Outdoors" />
                            </div>
                        </main>
                    ) : (
                        <main>
                            <div className="container mx-auto px-4 space-y-8 pb-10 pt-32">
                                <HeroCarousel />
                                <DealsOfTheDay products={products} />
                                <CategoriesSection />
                                <FeaturesSection />
                                <WhyChooseUsSection />
                                <TestimonialsSection />
                                <VendorCTASection />
                            </div>
                        </main>
                    )
                }
                <Footer />
            </div>
        </>
    );
};

export default Index;