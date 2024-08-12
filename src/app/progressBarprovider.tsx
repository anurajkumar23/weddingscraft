'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function ProgressBarProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            {children}
            <ProgressBar
                height="4px"
                color="#FF0000"
                options={{ showSpinner: true }}
                shallowRouting
            />

        </>
    );
}