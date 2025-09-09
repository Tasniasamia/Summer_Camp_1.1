import Footer from '@/components/(site)/layout/footer';
import Header from '@/components/(site)/layout/header';
import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import ReactQueryProvider from '@/helpers/context/quries';
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <ReactQueryProvider>
            <FirebaseAuthProvider>
             <Header/>
            {children}
            <Footer/>
            <Toaster/>
            </FirebaseAuthProvider>
            </ReactQueryProvider>
        </div>
    );
};

export default layout;