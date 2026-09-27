import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const MessageSection = () => {

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const firstMsgSplit = SplitText.create(".first-message", { type: "words" });
            const secMsgSplit = SplitText.create(".second-message", { type: "words" });
            const paragraphSplit = SplitText.create(".message-content p", { type: "words,lines", linesClass: "paragraph-line" });

            gsap.to(firstMsgSplit.words, {
                color: "#faeade",
                ease: "power1.in",
                stagger: 1,
                scrollTrigger: {
                    trigger: ".message-content",
                    start: "top center",
                    end: "30% center",
                    scrub: true,
                    // markers: true
                }
            });

            gsap.to(secMsgSplit.words, {
                color: "#faeade",
                ease: "power1.in",
                stagger: 1,
                scrollTrigger: {
                    trigger: ".second-message",
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                    // markers: true
                }
            });

            //Timeline
            const revealTl = gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: ".msg-text-scroll",
                    start: "top 60%",
                    // markers: true
                }
            });

            revealTl.to(".msg-text-scroll", {
                duration: 0.5,
                clipPath: "polygon(0% 0%,100% 0%, 100% 100%, 0% 100%)",
                ease: "circ.inOut"
            }, "<");

            const paragraphTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".message-content p",
                    start: "top 60%",
                    // markers: true
                }
            });

            paragraphTl.from(paragraphSplit.words, {
                duration: 1,
                stagger: 0.01,
                yPercent: 300,
                rotate: 3,
                ease: "power1.inOut"
            });
        });
    }, []);

    return (
        <section className="message-content bg-[#0058A3] !bg-[#0058A3]" style={{ backgroundColor: "#0058A3" }}>
            <div className="container mx-auto flex-center py-28 relative">
                <div className="w-full h-full md:px-30 ">
                    <div className="msg-wrapper">
                        <h1 className="first-message text-wrap w-[90%]">Make room for better living</h1>
                        <div className="msg-text-scroll md:mt-12 mt-0">
                            <div className="bg-[#FFDA1A] md:pb-4 pb-3 px-5" style={{ backgroundColor: "#FFDA1A" }}>
                                <h2 className="text-[#0051BA]">Everyday</h2>
                            </div>
                        </div>
                        <h1 className="second-message md:w-full w-[80%]">Design your home with smart ideas for every space</h1>
                    </div>
                    <div className="flex-center md:mt-20 mt-10">
                        <div className="max-w-md px-10 flex-center overflow-hidden">
                            <p>Discover affordable furniture, clever storage, and smart designs made for everyday life. Create a home that feels comfortable, functional, and uniquely yours.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MessageSection;