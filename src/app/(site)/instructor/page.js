import Banner from '@/components/(site)/common/banner';
import InstructorsSection from '@/components/(site)/home/instructorSection';
import React from 'react';

const page = () => {
    return (
        <div>
            <Banner title="Instructor"/>
            <InstructorsSection/>
        </div>
    );
};

export default page;