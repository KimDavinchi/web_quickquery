"use client";

import { useEffect, useRef } from "react";

type Props = {
    className?: string;
};

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdSenseBanner({ className }: Props) {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || !process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT) {
            return;
        }

        if (isLoaded.current) return;

        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            isLoaded.current = true;
        } catch (err) {
            console.error("AdSense error", err);
        }
    }, []);

    if (process.env.NODE_ENV !== "production") {
        return (
            <div className={`w-full max-w-7xl mx-auto h-24 bg-slate-800 border border-dashed border-slate-600 flex items-center justify-center text-slate-400 ${className}`}>
                AdSense Placeholder (Production Only)
            </div>
        );
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || !process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT) {
        return null;
    }

    return (
        <div className={`w-full max-w-7xl mx-auto overflow-hidden my-8 text-center ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
                data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SLOT}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}
