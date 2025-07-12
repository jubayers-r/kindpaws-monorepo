import AboutUs from '@/components/homePage/AboutUs/AbutUs';
import BookAppointment from '@/components/homePage/BookApointment/BookApointment';
import Categories from '@/components/homePage/Categories/Categories';
import CTA from '@/components/homePage/CTA/CTA';
import OurServices from '@/components/homePage/OurServices/OurServices';
import SuccessStories from '@/components/homePage/SuccessStories/SuccessStories';
import React from 'react';

const Home = () => {
    return (
        <div >
            <Categories/>
            <CTA/>
            <AboutUs/>
            <SuccessStories/>
            <BookAppointment/>
            <OurServices/>
        </div>
    );
};

export default Home;