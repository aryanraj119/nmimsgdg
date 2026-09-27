import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { getImage } from "../utils/media";

interface MenuItem {
    name: string;
    img: string;
}

interface NavMenuProps {
    isOpen: boolean;
}

const NavMenu: React.FC<NavMenuProps> = ({ isOpen = false }) => {

    const menuItems: MenuItem[] = [
        { name: "Shop", img: getImage("ikea_hero_banner.jpg") },
        { name: "Find in stores", img: getImage("hero-img.png") },
        { name: "About Us", img: getImage("big-img.png") },
        { name: "Tasty Talks", img: getImage("video-img.webp") },
        { name: "Programs", img: getImage("static-img.png") },
        { name: "Contacts", img: getImage("Final.png") },
    ];
    const defaultMenuImage = getImage("ikea_hero_banner.jpg");

    const [hovered, setHovered] = useState<string | null>(null);
    const [currentImg, setCurrentImg] = useState<string>(defaultMenuImage);

    // GSAP animation for menu open/close
    useEffect(() => {
        const menu = document.querySelector(".navmenu") as HTMLElement | null;
        if (!menu) return;

        if (isOpen) {
            // Open animation
            gsap.fromTo(
                menu,
                { yPercent: -100, opacity: 0, display: "flex" },
                { yPercent: 0, opacity: 1, duration: 1, ease: "power3.out", display: "flex" }
            );
        } else {
            // Close animation
            gsap.to(menu, {
                yPercent: -100,
                opacity: 0,
                duration: 1,
                ease: "power3.in",
                onComplete: () => { gsap.set(menu, { display: "none" }) },
            });
        }
    }, [isOpen]);

    return (
        <div className="navmenu fixed inset-0 w-full h-screen bg-[#faeade] justify-center items-center hidden z-50">
            <div className="flex w-full h-full">
                {/* Left side - Menu Links */}
                <div className="menu-links w-1/2 flex flex-col justify-center items-center text-center">
                    {menuItems.map((item) => (
                        <a
                            href={item.name === "Find in stores" ? "/secondhand.html" : "#"}
                            target={item.name === "Find in stores" ? "_blank" : "_self"}
                            rel={item.name === "Find in stores" ? "noopener noreferrer" : undefined}
                            key={item.name}
                            onMouseEnter={() => {
                                setHovered(item.name);
                                setCurrentImg(item.img);
                            }}
                            onMouseLeave={() => {
                                setHovered(null);
                                setCurrentImg(defaultMenuImage);
                            }}
                            className={`uppercase text-8xl font-extrabold tracking-tighter transition-all duration-400 ${hovered === item.name ? "" : hovered ? "opacity-15" : ""
                                }`}
                        >
                            {item.name}
                        </a>
                    ))}

                    <div className="flex justify-center items-center gap-6 text-lg mt-10">
                        <a href="#">YouTube</a>
                        <a href="#">Instagram</a>
                        <a href="#">TikTok</a>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="menu-img w-1/2 flex justify-center items-center">
                    <img
                        src={currentImg}
                        alt="Menu Preview"
                        className="w-full h-full object-cover transition-all duration-300 ease-out"
                    />
                </div>
            </div>
        </div>
    );
};

export default NavMenu;