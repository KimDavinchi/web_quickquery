"use client";

import { useEffect, useRef } from "react";

type Props = {
    className?: string;
    slotId?: string;
    format?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
    responsive?: string;
    style?: React.CSSProperties;
};

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdSenseBanner({ className, slotId, format = "auto", responsive = "true", style }: Props) {
    const isLoaded = useRef(false);

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || !slotId) {
            return;
        }

        // Avoiding double push if component re-renders quickly, though React usually handles this.
        // For multiple ads on same page, we need to push {} for EACH slot.
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error", err);
        }
    }, [slotId]);

    if (process.env.NODE_ENV !== "production") {
        return (
            <div className={`bg-slate-800/50 border border-dashed border-slate-600 flex items-center justify-center text-slate-500 text-xs ${className}`} style={style}>
                Ad: {slotId || "No Slot ID"}
            </div>
        );
    }

    if (!process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || !slotId) {
        return null;
    }

    return (
        <div className={`overflow-hidden text-center ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client={`ca-pub-${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive={responsive}
            />
        </div>
    );
}
