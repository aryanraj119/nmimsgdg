// Video paths resolved by Vite so the browser loads the bundled asset reliably.
const getVideoUrl = (fileName: string): string => {
    return new URL(`../assets/videos/${fileName}.mp4`, import.meta.url).href;
};

// Define types
interface Flavor {
    name: string;
    color: string;
    rotation: string;
}

interface Card {
    src: any;
    rotation: string;
    name: string;
    img: string;
    translation?: string; // optional since some cards don’t have it
}

// Flavor list
const flavorlists: Flavor[] = [
    {
        name: "BED",
        color: "brown",
        rotation: "md:rotate-[-8deg] rotate-0",
    },
    {
        name: "TABLE",
        color: "red",
        rotation: "md:rotate-[8deg] rotate-0",
    },
    {
        name: "CUBBOARD",
        color: "blue",
        rotation: "md:rotate-[-8deg] rotate-0",
    },
    {
        name: "SOFA",
        color: "orange",
        rotation: "md:rotate-[8deg] rotate-0",
    },
    {
        name: "FLOOR LAMP",
        color: "white",
        rotation: "md:rotate-[-8deg] rotate-0",
    },
    {
        name: "BOOKSHELF",
        color: "black",
        rotation: "md:rotate-[8deg] rotate-0",
    },
];

// Cards list
const cards: Card[] = [
    {
        src: getVideoUrl("f1"),
        rotation: "rotate-z-[-10deg]",
        name: "Madison",
        img: "../assets/images/p1.png",
        translation: "translate-y-[-5%]",
    },
    {
        src: getVideoUrl("f2"),
        rotation: "rotate-z-[4deg]",
        name: "Alexander",
        img: "../assets/images/p2.png",
    },
    {
        src: getVideoUrl("f3"),
        rotation: "rotate-z-[-4deg]",
        name: "Andrew",
        img: "../assets/images/p3.png",
        translation: "translate-y-[-5%]",
    },
    {
        src: getVideoUrl("f4"),
        rotation: "rotate-z-[4deg]",
        name: "Bryan",
        img: "../assets/images/p4.png",
        translation: "translate-y-[5%]",
    },
    {
        src: getVideoUrl("f5"),
        rotation: "rotate-z-[-10deg]",
        name: "Chris",
        img: "../assets/images/p5.png",
    },
    {
        src: getVideoUrl("f6"),
        rotation: "rotate-z-[4deg]",
        name: "Devante",
        img: "../assets/images/p6.png",
        translation: "translate-y-[5%]",
    },
    {
        src: getVideoUrl("f7"),
        rotation: "rotate-z-[-3deg]",
        name: "Melisa",
        img: "../assets/images/p7.png",
        translation: "translate-y-[10%]",
    },
];

export { flavorlists, cards };