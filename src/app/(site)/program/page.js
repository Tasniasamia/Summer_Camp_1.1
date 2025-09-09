import Banner from '@/components/(site)/common/banner';
import ClassesSection from '@/components/(site)/home/classSection';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner title="Program"/>
            <ClassesSection/>
        </div>
    );
};

export default page;