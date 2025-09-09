import Banner from '@/components/(site)/common/banner';
import AboutSection from '@/components/(site)/home/about';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner title="About"/>
            <AboutSection/>
        </div>
    );
};

export default page;