
import Categories from '@/components/homePage/Categories/Categories';
import CTA from '@/components/homePage/CTA/CTA';
import FAQ from '@/components/homePage/FAQ/FAQ';

import React from 'react';

const Home = () => {
    return (
        <div className='sm:space-y-20 space-y-10 '>
            <Categories/>
            <CTA/>
            <FAQ/>
        </div>
    );
};

export default Home;