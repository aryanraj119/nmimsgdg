import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/ui/Navbar";
import { useFurnitureStore } from "../store/furnitureStore";
import { useRoomStore } from "../store/roomStore";
import { useUIStore } from "../store/uiStore";
import type { FurnitureCategory, FurnitureCondition, Furniture } from "../types/furniture";

const CATEGORIES: FurnitureCategory[] = [
    "All",
    "Chairs",
    "Desks",
    "Tables",
    "Sofas",
    "Beds",
    "Cabinets",
    "Shelves",
    "Storage",
    "Lighting",
    "Office",
    "Classroom",
    "Hospital",
    "Outdoor"
];

const CONDITIONS: Array<FurnitureCondition | "All"> = ["All", "Like New", "Excellent", "Good", "Fair"];

export const Marketplace: React.FC = () => {
    const navigate = useNavigate();

    const selectedCategory = useFurnitureStore((state) => state.selectedCategory);
    const setCategory = useFurnitureStore((state) => state.setCategory);
    const selectedCondition = useFurnitureStore((state) => state.selectedCondition);
    const setCondition = useFurnitureStore((state) => state.setCondition);
    const searchQuery = useFurnitureStore((state) => state.searchQuery);
    const setSearchQuery = useFurnitureStore((state) => state.setSearchQuery);
    const getFilteredFurniture = useFurnitureStore((state) => state.getFilteredFurniture);

    const addObject = useRoomStore((state) => state.addObject);
    const showToast = useUIStore((state) => state.showToast);

    const filteredItems = getFilteredFurniture();

    const handleAddToRoom = (furniture: Furniture) => {
        addObject({
            productId: furniture.id,
            type: "furniture",
            name: furniture.name,
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            width: furniture.width,
            depth: furniture.depth,
            height: furniture.height,
            color: furniture.color,
            price: furniture.price,
            condition: furniture.condition
        });
        showToast(`Added "${furniture.name}" to 3D Room`);
        navigate("/planner");
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans">
            <Navbar />

            {/* Header Banner */}
            <div className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <span className="text-xs font-bold text-[#0058A3] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                            Verified Pre-Loved Furniture
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                            Second-Hand Furniture Marketplace
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Quality tested Scandinavian designs with 1:1 scale 3D preview.
                        </p>
                    </div>

                    {/* Search Input */}
                    <div className="w-full md:w-96">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search desks, chairs, sofas, tables..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0058A3]"
                            />
                            <svg className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category Filters */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-4 scrollbar-none border-b border-slate-200 mb-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sub-Filters */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 text-xs font-semibold text-slate-600">
                        <span>Condition:</span>
                        <select
                            value={selectedCondition}
                            onChange={(e) => setCondition(e.target.value as FurnitureCondition | "All")}
                            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:ring-2 focus:ring-[#0058A3]"
                        >
                            {CONDITIONS.map((cond) => (
                                <option key={cond} value={cond}>
                                    {cond}
                                </option>
                            ))}
                        </select>
                    </div>

                    <span className="text-xs font-semibold text-slate-500">
                        Showing {filteredItems.length} items
                    </span>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredItems.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
                        >
                            {/* Color / Asset Visual Placeholder */}
                            <div
                                className="relative h-48 flex items-center justify-center p-6 transition-transform group-hover:scale-105 duration-500"
                                style={{ backgroundColor: item.color ? `${item.color}15` : "#F1F5F9" }}
                            >
                                <div
                                    className="w-24 h-24 rounded-2xl shadow-md border-2 border-white flex items-center justify-center"
                                    style={{ backgroundColor: item.color || "#64748B" }}
                                >
                                    <span className="text-white text-xs font-black uppercase text-center px-1">
                                        {item.category}
                                    </span>
                                </div>

                                <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                                    {item.condition}
                                </span>

                                {item.originalPrice && (
                                    <span className="absolute top-3 right-3 bg-[#FFDB00] text-black font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-sm">
                                        Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                    </span>
                                )}
                            </div>

                            {/* Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <span className="text-[10px] font-bold text-[#0058A3] uppercase tracking-wider block">
                                        {item.category}
                                    </span>
                                    <h3 className="font-bold text-slate-900 text-base mt-0.5 group-hover:text-[#0058A3] transition-colors leading-snug">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <span>📍</span>
                                        <span>{item.location}</span>
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{item.description}</p>
                                </div>

                                {/* Dimensions & Price Footer */}
                                <div className="pt-3 border-t border-slate-100 space-y-3">
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                        <span>Dim: {item.width}m × {item.depth}m × {item.height}m</span>
                                        <span className="text-[10px] text-slate-400">Seller: {item.sellerName}</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div>
                                            <span className="text-xl font-extrabold text-slate-900">
                                                ₹{item.price.toLocaleString("en-IN")}
                                            </span>
                                            {item.originalPrice && (
                                                <span className="text-xs text-slate-400 line-through ml-1.5">
                                                    ₹{item.originalPrice.toLocaleString("en-IN")}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleAddToRoom(item)}
                                            className="px-3.5 py-2 rounded-xl bg-[#0058A3] hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center space-x-1"
                                        >
                                            <span>+ Add to 3D Room</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
