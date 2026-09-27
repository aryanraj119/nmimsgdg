import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const BottomBanner = () => {

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const bTitleSplit = SplitText.create(".b-title", { type: "chars" });

            const revealTl = gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: ".bottom-banner",
                    start: "top 50%",
                    end: "top 10%",
                    scrub: 1.5,
                    // markers: true
                }
            });

            revealTl.from(bTitleSplit.chars, {
                stagger: 0.2,
                opacity: 0,
                rotate: 3,
                yPercent: 30,
                ease: "power1.inOut"
            }).to(".bottom-banner .rolling-animation", {
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            });
        });
    });


    return (
        <section className="bottom-banner 2xl:min-h-dvh lg:w-full w-[200%] h-full overflow-hidden relative bg-[#222123] flex flex-col justify-center items-start">
            <div aria-hidden="true" className="w-full h-48 md:h-64 bg-[#FFDB00] -translate-y-1" />
            <div aria-hidden="true" className="w-full h-32 md:h-40 mt-10 bg-[#0058A3]" />

            <div className="absolute w-[35rem] h-[24rem] z-100 lg:top-[30%] top-[50%] lg:left-20 left-10">
                <div className="relative inline-block md:translate-y-20 z-100">
                    <div className="general-title relative flex flex-col justify-center items-center gap-6">
                        <div className="overflow-hidden place-self-start">
                            <h1 className="text-white b-title">Make Room</h1>
                        </div>
                        <div className="rotate-[3deg] rolling-animation text-nowrap place-self-start">
                            <div className="bg-[#fed775] pb-4 md:pt-0 pt-3 md:px-5 px-3 inline-block">
                                <h2 className="text-[#523122]">For</h2>
                            </div>
                        </div>
                        <div className="overflow-hidden place-self-start">
                            <h1 className="text-white b-title">Everyday Living</h1>
                        </div>
                    </div>
                    <div className="lg:mt-10 mt-2 text-[#f3e2d5] text-sm font-paragraph flex flex-col lg:gap-14 gap-8">
                        <div>
                            <p className=" lg:w-1/2 w-[80%]">Buy our drinks at your local store or get them delivered (to your door).</p>
                        </div>
                        <div className="font-medium">
                            <button
                                type="button"
                                onClick={() => { window.location.href = "/secondhand.html"; }}
                                className="px-10 py-4 rounded-4xl bg-black text-[#f3e2d5] inline-block border-0 cursor-pointer hover:bg-slate-900 transition-all active:scale-95 shadow-md"
                            >
                                FIND IN STORES
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default BottomBanner;