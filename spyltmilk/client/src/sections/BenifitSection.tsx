import { useGSAP } from "@gsap/react"
import ClipPathTitle from "../components/ClipPathTitle"
import gsap from "gsap";
import { SplitText } from "gsap/all";
import VideoPin from "../components/VideoPin";

const BenifitSection = () => {

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const hParaSplit = SplitText.create(".para-animation", { type: "words" });


            const revealTl = gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: ".benefit-section",
                    start: "top 65%",
                    end: "top -10%",
                    scrub: 1.5,
                    // markers: true
                }
            });

            revealTl.from(hParaSplit.words, {
                duration: 1,
                stagger: 0.2,
                opacity: 0,
                rotate: 8,
                yPercent: 30,
                ease: "power1.inOut"
            }).to(".benefit-section .first-title", {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            }).to(".benefit-section .second-title", {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            }).to(".benefit-section .third-title", {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            }).to(".benefit-section .fourth-title", {
                duration: 1,
                opacity: 1,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.out"
            });
        });
    });

    return (
        <section className="benefit-section">
            <div className="container mx-auto pt-16 mb-0 py-0">
                <div className="col-center">
                    <p className="md:text-sm para-animation">Unlock the Advantages:
                        <br />Explore the Key Benefits of Choosing IKEA
                    </p>
                </div>

                <div className="md:mt-20 md:mb-0 mb-30 mt-30 col-center">
                    <ClipPathTitle title={"Affordable Design"} color={"#111111"} bg={"#E00751"} className={"first-title"} />
                    <ClipPathTitle title={"Smart+Functional"} color={"#FFDB00"} bg={"#111111"} className={"second-title"} />
                    <ClipPathTitle title={"Made for Everyday"} color={"#0058A3"} bg={"#FFDB00"} className={"third-title"} />
                    <ClipPathTitle title={"Easy to Assemble"} color={"#FFDB00"} bg={"#0058A3"} className={"fourth-title"} />
                </div>
                <div className="md:mt-0 md:pb-0 pb-20 mt-10">
                    <p>And much more ...</p>
                </div>
            </div>

            <div className="vd-pin relative overlay-box md:-mt-52 mt-0">
                <div className="video-wrapper relative w-full h-screen">
                    <VideoPin />
                </div>
            </div>
        </section>
    )
}

export default BenifitSection