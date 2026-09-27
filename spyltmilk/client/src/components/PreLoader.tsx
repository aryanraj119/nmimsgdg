import { useEffect, useState } from "react";
import preImg from "../assets/images/nav-logo-MGJZgGlA.png"

const PreLoader = ({ onComplete }: { onComplete?: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [canHide, setCanHide] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const progressTimer = window.setInterval(() => {
            setProgress((current) => Math.min(current + 5, 95));
        }, 50);
        const hideTimer = window.setTimeout(() => {
            window.clearInterval(progressTimer);
            setProgress(100);
            setCanHide(true);
        }, 1000);

        return () => {
            window.clearInterval(progressTimer);
            window.clearTimeout(hideTimer);
        };
    }, []);

    useEffect(() => {
        if (!canHide) return;
        const unmountTimer = window.setTimeout(() => {
            setIsHidden(true);
            onComplete?.();
        }, 500);
        return () => window.clearTimeout(unmountTimer);
    }, [canHide, onComplete]);

    if (isHidden) return null;

    return (
        <div className={`preloader fixed inset-0 flex flex-col items-center justify-end pb-20 z-[9999] text-text-tertiary bg-surface-raised transition-opacity duration-500 ${canHide ? "pointer-events-none opacity-0" : "opacity-100"}`}>
            {/* <h1 className="text-7xl font-bold tracking-widest lg:mb-30">SPYLT MILK</h1> */}
            <img src={preImg} alt="pre img" className="lg:mb-40 mb-[60%] lg:w-[20%] w-[40%]" />
            <p className="lg:text-[2rem] text-[1.5rem] tracking-wider">{progress}%</p>
            <div className="mt-2 lg:w-[12rem] w-64 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-white transition-all duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default PreLoader;