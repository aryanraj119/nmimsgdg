import React, { useState } from "react";
import RoomPlannerHUD from "../components/RoomPlannerHUD";

interface Product {
    id: number;
    name: string;
    category: string;
    condition: "Like New" | "Gently Used" | "Refurbished";
    originalPrice: number;
    secondHandPrice: number;
    image: string;
    location: string;
    description: string;
    savings: number;
}

const PRODUCTS: Product[] = [
    {
        id: 1,
        name: "STRANDMON Wing Chair - Nordvalla Dark Gray",
        category: "Chairs & Armchairs",
        condition: "Like New",
        originalPrice: 349,
        secondHandPrice: 179,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Brooklyn Circular Hub",
        description: "Classic high-backed wing chair in pristine condition. No stains or fabric wear. Thoroughly sanitized.",
        savings: 48
    },
    {
        id: 2,
        name: "LISABO Dining Table - Ash Veneer",
        category: "Tables & Desks",
        condition: "Gently Used",
        originalPrice: 229,
        secondHandPrice: 115,
        image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Downtown Hub",
        description: "Sturdy ash veneer dining table. Minor superficial scratch on corner, fully structural & beautiful finish.",
        savings: 50
    },
    {
        id: 3,
        name: "HEMNES 8-Drawer Dresser - White Stain",
        category: "Storage & Wardrobes",
        condition: "Refurbished",
        originalPrice: 399,
        secondHandPrice: 210,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Queens Warehouse",
        description: "Solid wood 8-drawer dresser with new smooth-running drawer glides installed by IKEA Circular team.",
        savings: 47
    },
    {
        id: 4,
        name: "KALLAX Shelf Unit 4x4 - White",
        category: "Storage & Wardrobes",
        condition: "Like New",
        originalPrice: 159,
        secondHandPrice: 85,
        image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Brooklyn Circular Hub",
        description: "Versatile cube shelving unit. Includes 4 canvas insert baskets. Perfect for living room or studio.",
        savings: 46
    },
    {
        id: 5,
        name: "MARKUS Ergonomic Office Chair - Vissle Dark Gray",
        category: "Office & Study",
        condition: "Like New",
        originalPrice: 289,
        secondHandPrice: 145,
        image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1274?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Midtown Store",
        description: "Mesh back high-performance office chair with adjustable lumbar support and tilt function.",
        savings: 50
    },
    {
        id: 6,
        name: "SÖDERHAMN 3-Seat Sectional Sofa - Samsta Dark Gray",
        category: "Sofas & Beds",
        condition: "Refurbished",
        originalPrice: 899,
        secondHandPrice: 440,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Brooklyn Circular Hub",
        description: "Deep, low-profile modular sofa with brand-new washable covers fitted by IKEA Secondhand Specialists.",
        savings: 51
    },
    {
        id: 7,
        name: "FJÄLLBO Coffee Table - Black Metal & Solid Wood",
        category: "Tables & Desks",
        condition: "Gently Used",
        originalPrice: 119,
        secondHandPrice: 65,
        image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Downtown Hub",
        description: "Industrial style coffee table with metal mesh shelf and pine solid wood top.",
        savings: 45
    },
    {
        id: 8,
        name: "MALM Ottoman Bed Frame - High / White (Queen)",
        category: "Sofas & Beds",
        condition: "Like New",
        originalPrice: 549,
        secondHandPrice: 295,
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
        location: "IKEA Queens Warehouse",
        description: "Hydraulic gas-lift storage bed frame. Clean finish with massive under-bed storage chamber.",
        savings: 46
    }
];

const CATEGORIES = ["All Items", "Sofas & Beds", "Tables & Desks", "Chairs & Armchairs", "Storage & Wardrobes", "Office & Study"];
const CONDITIONS = ["All Conditions", "Like New", "Gently Used", "Refurbished"];

const SecondHandFurniture: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Items");
    const [selectedCondition, setSelectedCondition] = useState("All Conditions");
    const [searchQuery, setSearchQuery] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [reservedItems, setReservedItems] = useState<number[]>([]);

    const filteredProducts = PRODUCTS.filter((product) => {
        const matchesCategory = selectedCategory === "All Items" || product.category === selectedCategory;
        const matchesCondition = selectedCondition === "All Conditions" || product.condition === selectedCondition;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesCondition && matchesSearch;
    });

    const handleReserve = (id: number) => {
        if (!reservedItems.includes(id)) {
            setReservedItems([...reservedItems, id]);
            setCartCount(cartCount + 1);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] text-[#222123] font-sans">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 bg-[#0051BA] text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <a href="/" className="flex items-center space-x-2">
                            <span className="bg-[#FFDA1A] text-[#0051BA] font-extrabold text-2xl px-3 py-1 rounded tracking-tighter">
                                IKEA
                            </span>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Circular Hub <span className="text-xs bg-[#FFDA1A] text-[#0051BA] px-2 py-0.5 rounded-full font-bold uppercase ml-1">2nd Hand</span>
                            </span>
                        </a>
                    </div>

                    <div className="flex-1 max-w-md mx-8 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search secondhand sofas, tables, chairs..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FFDA1A] text-sm"
                            />
                            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <a href="/" className="text-sm font-semibold hover:text-[#FFDA1A] transition-colors">
                            ← Back to Spylt
                        </a>
                        <div className="relative cursor-pointer bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#FFDA1A] text-[#0051BA] font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Banner Section */}
            <section className="bg-gradient-to-r from-[#0051BA] to-[#003B87] text-white py-14 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                        <div className="inline-flex items-center space-x-2 bg-[#FFDA1A] text-[#0051BA] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <span>🌱 Sustainable Living</span>
                            <span>•</span>
                            <span>Up to 60% Off</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                            Buy & Sell Pre-Loved <span className="text-[#FFDA1A]">IKEA Furniture</span>
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Give quality furniture a second life. Inspected, sanitized, and certified by IKEA Circular specialists with 1-year guarantee.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <a href="#catalog" className="bg-[#FFDA1A] text-[#0051BA] font-bold px-6 py-3 rounded-full hover:bg-yellow-400 transition-colors shadow-lg">
                                Explore 2nd Hand Furniture
                            </a>
                            <a href="#sell" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-full transition-colors border border-white/30">
                                Sell Your Furniture
                            </a>
                        </div>
                    </div>

                    {/* Stats Box */}
                    <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center">
                            <span className="text-3xl font-extrabold text-[#FFDA1A]">12,450+</span>
                            <p className="text-xs text-blue-100 mt-1 uppercase font-bold">Items Saved from Landfill</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center">
                            <span className="text-3xl font-extrabold text-[#FFDA1A]">340 Tons</span>
                            <p className="text-xs text-blue-100 mt-1 uppercase font-bold">CO₂ Emissions Reduced</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3D Room Planner Section with HUD Header */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <span className="text-xs font-extrabold uppercase text-[#0058A3] tracking-widest bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                            Interactive 3D Planner
                        </span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-2">
                            Visualize 2nd-Hand Furniture in Your Room
                        </h2>
                    </div>
                </div>
                <RoomPlannerHUD />
            </section>

            {/* Filter & Search Controls */}
            <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-gray-200">
                    {/* Category Tabs */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? "bg-[#0051BA] text-white shadow-md"
                                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Condition Selector */}
                    <div className="flex items-center space-x-3">
                        <span className="text-xs font-bold uppercase text-gray-500 tracking-wider">Condition:</span>
                        <select
                            value={selectedCondition}
                            onChange={(e) => setSelectedCondition(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0051BA]"
                        >
                            {CONDITIONS.map((cond) => (
                                <option key={cond} value={cond}>
                                    {cond}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                            {/* Product Image */}
                            <div className="relative h-56 overflow-hidden bg-gray-100">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-3 left-3 flex flex-col gap-1">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm ${product.condition === "Like New"
                                                ? "bg-emerald-600"
                                                : product.condition === "Refurbished"
                                                    ? "bg-blue-600"
                                                    : "bg-amber-600"
                                            }`}
                                    >
                                        {product.condition}
                                    </span>
                                </div>

                                <div className="absolute top-3 right-3 bg-[#FFDA1A] text-[#0051BA] font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
                                    Save {product.savings}%
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-bold text-[#0051BA] uppercase tracking-wider">{product.category}</span>
                                    <h3 className="font-bold text-gray-900 text-lg mt-1 group-hover:text-[#0051BA] transition-colors leading-snug">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {product.location}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-2 line-clamp-2">{product.description}</p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-2xl font-extrabold text-gray-900">${product.secondHandPrice}</span>
                                            <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
                                        </div>
                                        <span className="text-[10px] text-emerald-600 font-semibold uppercase">Verified IKEA Certified</span>
                                    </div>

                                    <button
                                        onClick={() => handleReserve(product.id)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${reservedItems.includes(product.id)
                                                ? "bg-emerald-600 text-white cursor-default"
                                                : "bg-[#0051BA] hover:bg-blue-700 text-white shadow-md hover:shadow-lg active:scale-95"
                                            }`}
                                    >
                                        {reservedItems.includes(product.id) ? "Reserved ✓" : "Reserve 2nd Hand"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Sell Trade-in Section */}
            <section id="sell" className="bg-white border-t border-gray-200 py-16 px-4 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="bg-yellow-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            IKEA BuyBack & Resell
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-3">
                            Have IKEA furniture you no longer use?
                        </h2>
                        <p className="text-gray-600 mt-4 leading-relaxed">
                            Sell it back to us! We’ll evaluate your pre-loved IKEA items and give you store credit on the spot. We inspect, clean, and list it for another home.
                        </p>

                        <ul className="mt-6 space-y-3">
                            {["Instant online valuation", "Free store drop-off or home pickup", "Get up to 50% value in IKEA Store Credit", "100% Zero landfill commitment"].map((item, idx) => (
                                <li key={idx} className="flex items-center text-sm font-semibold text-gray-800">
                                    <span className="w-5 h-5 bg-[#0051BA] text-white rounded-full flex items-center justify-center text-xs mr-3 font-bold">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8">
                            <button className="bg-[#0051BA] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg transition-all">
                                Calculate Trade-In Value
                            </button>
                        </div>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 h-96">
                        <img
                            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
                            alt="Sustainable furniture workshop"
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-8 flex flex-col justify-end">
                            <span className="text-[#FFDA1A] font-extrabold text-sm uppercase tracking-widest">Circular Economy Initiative</span>
                            <h3 className="text-white text-2xl font-bold mt-1">Together towards zero waste.</h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#222123] text-white py-12 px-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 border-b border-gray-800 pb-8">
                    <div className="flex items-center space-x-2">
                        <span className="bg-[#FFDA1A] text-[#0051BA] font-extrabold text-xl px-2.5 py-0.5 rounded">IKEA</span>
                        <span className="font-bold text-lg text-white">Circular Hub • 2nd Hand Furniture</span>
                    </div>
                    <div className="flex space-x-6 text-sm text-gray-400">
                        <a href="/" className="hover:text-white transition-colors">Main Spylt Home</a>
                        <a href="#catalog" className="hover:text-white transition-colors">Browse Catalog</a>
                        <a href="#sell" className="hover:text-white transition-colors">Sell Furniture</a>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-8 text-center text-xs text-gray-500">
                    © 2026 IKEA Circular Hub & Secondhand Furniture Market. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default SecondHandFurniture;
