import React from 'react';
import Layout from '../layout.component';

export function withLayout<P extends object>(Component: React.ComponentType<P>) {
    return function WrappedComponent (props: P) {
        return (
        <Layout>
            <Component {...props} />
        </Layout>
    )
   }
}