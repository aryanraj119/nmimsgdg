import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { getImage } from '../utils/media';
import heroBgVid from "../assets/videos/hero-bg.mp4"

const HeroSection = () => {

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const titleSplit = SplitText.create(".hero-title", { type: "chars" });

            const tl = gsap.timeline({ delay: 1 });

            tl.to(".hero-content", {
                opacity: 1,
                y: 0,
                ease: "power1.inOut"
            })
                .to(".hero-text-scroll", {
                    duration: 1,
                    clipPath: "polygon(0% 0%,100% 0%,100% 100%, 0% 100%)",
                    ease: "circ.out"
                }, "-=0.5")
                .from(titleSplit.chars, {
                    yPercent: 200,
                    stagger: 0.02,
                    ease: "power2.out"
                }, "-=0.5");

            const heroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".hero-container",
                    start: "1% top",
                    end: "bottom top",
                    scrub: true,
                    // markers: true
                }
            });

            heroTl.to(".hero-container", {
                rotate: 7,
                scale: 0.9,
                yPercent: 30,
                ease: "power1.inOut"
            });
        });
    });


    return (
        <section className="bg-white">
            <div className="hero-container bg-white!" style={{ backgroundColor: "#ffffff" }}>
                <video
                    key={heroBgVid}
                    src={heroBgVid}
                    poster={getImage("hero-bg.png")}
                    autoPlay
                    playsInline
                    muted
                    loop
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ mixBlendMode: "multiply", filter: "brightness(1.12) contrast(1.18)" }}
                />
                <div className="hero-content opacity-0">
                    <div className="overflow-hidden">
                        <h1 className="hero-title lg:p-0 p-2">Everyday Essentials</h1>
                    </div>
                    <div className="hero-text-scroll">
                        <div className="hero-subtitle">
                            <h1>Home + Furniture</h1>
                        </div>
                    </div>
                    <h2>Live better every day with IKEA: Discover stylish furniture and smart solutions made for your home.</h2>
                    <div className="hero-button hover:bg-[#e9aa56]">
                        <a href="#">Explore IKEA</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection;