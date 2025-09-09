import Title from '@/components/(site)/common/title';
import React from 'react';
import ClassForm from '../component/(site)/form';

const page = () => {
    return (
        <div>
            <Title title="Create Class"/>
            <ClassForm/>
        </div>
    );
};

export default page;