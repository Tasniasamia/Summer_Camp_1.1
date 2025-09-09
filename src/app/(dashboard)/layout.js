import { FirebaseAuthProvider } from '@/helpers/context/authContext';
import ReactQueryProvider from '@/helpers/context/quries';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const layout = ({children}) => {
    return (
        <div>
            <ReactQueryProvider>
            <FirebaseAuthProvider>
            {children}
            <Toaster/>
            </FirebaseAuthProvider>
            </ReactQueryProvider>
        </div>
    );
};

export default layout;