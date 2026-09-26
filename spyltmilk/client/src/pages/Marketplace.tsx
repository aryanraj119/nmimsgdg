import React, { useState } from "react";
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
    const addListing = useFurnitureStore((state) => state.addListing);

    const addObject = useRoomStore((state) => state.addObject);
    const showToast = useUIStore((state) => state.showToast);

    // Modal States
    const [checkoutItem, setCheckoutItem] = useState<Furniture | null>(null);
    const [swapItem, setSwapItem] = useState<Furniture | null>(null);
    const [detailItem, setDetailItem] = useState<Furniture | null>(null);
    const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);

    // Checkout Form State (Buy Flow)
    const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

    // Swap Form State (Swap Flow)
    const [offeredItem, setOfferedItem] = useState("Birch Desk Chair");
    const [offeredEstValue, setOfferedEstValue] = useState(2000);
    const [swapConfirmedCode, setSwapConfirmedCode] = useState<string | null>(null);

    // Create Listing Form State (Listing Creation Flow)
    const [listingStep, setListingStep] = useState<number>(1);
    const [newCategory, setNewCategory] = useState<FurnitureCategory>("Sofas");
    const [newName, setNewName] = useState("");
    const [newCondition, setNewCondition] = useState<FurnitureCondition>("Like New");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState<number>(5000);
    const [newOrigPrice, setNewOrigPrice] = useState<number>(12000);
    const [newWidth, setNewWidth] = useState<number>(1.8);
    const [newDepth, setNewDepth] = useState<number>(0.8);
    const [newHeight, setNewHeight] = useState<number>(0.75);
    const [newLocation, setNewLocation] = useState("Indiranagar, Bengaluru");
    const [isSwapAvailable, setIsSwapAvailable] = useState(true);
    const [newPhotoColor, setNewPhotoColor] = useState("#0058A3");
    const [listingPublished, setListingPublished] = useState(false);

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
            modelUrl: furniture.modelUrl,
            price: furniture.price,
            condition: furniture.condition
        });
        showToast(`Added "${furniture.name}" to 3D Room`);
        navigate("/planner");
    };

    const handleConfirmBuy = () => {
        const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        setOrderConfirmedId(generatedId);
        showToast(`Order #${generatedId} confirmed!`);
    };

    const handleConfirmSwap = () => {
        const generatedCode = `SWAP-${Math.floor(10000 + Math.random() * 90000)}`;
        setSwapConfirmedCode(generatedCode);
        showToast(`Swap request #${generatedCode} submitted!`);
    };

    const handlePublishListing = (e: React.FormEvent) => {
        e.preventDefault();
        const createdItem: Furniture = {
            id: `user-item-${Date.now()}`,
            name: newName || "Scandinavian Modern Furniture",
            category: newCategory,
            price: Number(newPrice),
            originalPrice: Number(newOrigPrice),
            condition: newCondition,
            width: Number(newWidth),
            depth: Number(newDepth),
            height: Number(newHeight),
            sellerId: "user-101",
            sellerName: "You (Verified Member)",
            location: newLocation,
            available: true,
            description: newDescription || "High quality pre-loved Scandinavian furniture item.",
            color: newPhotoColor,
            tags: ["Verified", isSwapAvailable ? "Swap Available" : "For Sale Only"]
        };

        addListing(createdItem);
        setListingPublished(true);
        showToast("🎉 Your furniture listing is now LIVE!");
    };

    const resetListingForm = () => {
        setListingStep(1);
        setNewName("");
        setNewDescription("");
        setListingPublished(false);
        setIsCreateListingOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-slate-900 font-sans pb-16">
            <Navbar />

            {/* Header Banner */}
            <div className="bg-white border-b border-slate-200 py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-[#0058A3] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                                Verified Pre-Loved Furniture
                            </span>
                            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
                                🔄 Swap Enabled
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
                            Second-Hand Furniture Marketplace
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Buy, Sell & Swap pre-loved Scandinavian furniture with 1:1 3D Room Planner integration.
                        </p>
                    </div>

                    {/* Action Bar: Create Listing & Search */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
                        <button
                            onClick={() => {
                                resetListingForm();
                                setIsCreateListingOpen(true);
                            }}
                            className="px-5 py-3 rounded-2xl bg-[#0058A3] hover:bg-blue-800 text-white font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center space-x-2 cursor-pointer"
                        >
                            <span className="text-base">🪑</span>
                            <span>+ Sell / Swap Furniture</span>
                        </button>

                        <div className="relative w-full sm:w-72">
                            <input
                                type="text"
                                placeholder="Search sofas, desks, chairs..."
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
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${selectedCategory === cat
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
                            className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                            onClick={() => setDetailItem(item)}
                        >
                            {/* Visual Asset Box */}
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

                            {/* Card Body Details */}
                            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-[#0058A3] uppercase tracking-wider">
                                            {item.category}
                                        </span>
                                        <span className="text-[10px] text-slate-400">Click card for details 🔎</span>
                                    </div>
                                    <h3 className="font-bold text-slate-900 text-base mt-0.5 group-hover:text-[#0058A3] transition-colors leading-snug">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                        <span>📍</span>
                                        <span>{item.location}</span>
                                    </p>
                                    <p className="text-xs text-slate-600 mt-2 line-clamp-2">{item.description}</p>
                                </div>

                                {/* Dimensions, Price & Action Buttons */}
                                <div className="pt-3 border-t border-slate-100 space-y-3">
                                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                                        <span>Dim: {item.width}m × {item.depth}m × {item.height}m</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDetailItem(item);
                                            }}
                                            className="text-[11px] font-extrabold text-[#0058A3] hover:underline cursor-pointer flex items-center gap-1"
                                        >
                                            <span>🔎 Details & Trust</span>
                                        </button>
                                    </div>

                                    <div className="flex flex-col space-y-2">
                                        <div className="flex items-baseline justify-between">
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
                                            <span className="text-[10px] text-emerald-600 font-bold">✓ Verified</span>
                                        </div>

                                        {/* Action Buttons Row: BUY, SWAP, + 3D */}
                                        <div className="grid grid-cols-3 gap-1.5 pt-1">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCheckoutItem(item);
                                                    setOrderConfirmedId(null);
                                                }}
                                                className="py-2 rounded-xl bg-[#0058A3] hover:bg-blue-800 text-white text-[11px] font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                                            >
                                                <span>🛒 Buy</span>
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSwapItem(item);
                                                    setSwapConfirmedCode(null);
                                                }}
                                                className="py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                                            >
                                                <span>🔄 Swap</span>
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleAddToRoom(item);
                                                }}
                                                className="py-2 rounded-xl bg-[#FFDB00] hover:bg-yellow-400 text-black text-[11px] font-extrabold transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-1 cursor-pointer"
                                                title="Add to 3D Room Planner"
                                            >
                                                <span>+ 3D</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* MANDATORY SECTION 2: 🪑 ITEM LISTING CREATION MODAL */}
            {isCreateListingOpen && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
                        <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-[#FFDB00] block tracking-wider">
                                    Furniture Marketplace
                                </span>
                                <h3 className="font-extrabold text-lg flex items-center gap-2">
                                    <span>🪑</span> <span>List Furniture for Sale / Swap</span>
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsCreateListingOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {!listingPublished ? (
                            <form onSubmit={handlePublishListing} className="p-6 space-y-6">
                                {/* Wizard Stepper Header */}
                                <div className="grid grid-cols-5 gap-2 pb-4 border-b border-slate-200">
                                    {[
                                        { num: 1, label: "Identity" },
                                        { num: 2, label: "Photos" },
                                        { num: 3, label: "Condition" },
                                        { num: 4, label: "Details" },
                                        { num: 5, label: "Price & Swap" }
                                    ].map((s) => (
                                        <button
                                            type="button"
                                            key={s.num}
                                            onClick={() => setListingStep(s.num)}
                                            className={`p-2 rounded-xl text-center transition-all cursor-pointer ${listingStep === s.num
                                                    ? "bg-[#0058A3] text-white shadow-sm font-extrabold"
                                                    : "bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200"
                                                }`}
                                        >
                                            <span className="text-[10px] block opacity-80">Step {s.num}</span>
                                            <span className="text-xs block truncate">{s.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {/* STEP 1: Select / Identify Furniture */}
                                {listingStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <h4 className="font-extrabold text-sm text-slate-900 border-l-4 border-[#0058A3] pl-2">
                                            Step 1: Select / Identify Furniture
                                        </h4>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 block">Category</label>
                                            <select
                                                value={newCategory}
                                                onChange={(e) => setNewCategory(e.target.value as FurnitureCategory)}
                                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-slate-50"
                                            >
                                                {CATEGORIES.filter((c) => c !== "All").map((c) => (
                                                    <option key={c} value={c}>
                                                        {c}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 block">Furniture Name / Model</label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. Scandinavian 3-Seater Fabric Couch / KALLAX Shelf"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0058A3]"
                                            />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(2)}
                                                className="px-5 py-2.5 rounded-xl bg-[#0058A3] text-white font-bold text-xs cursor-pointer"
                                            >
                                                Next: Upload Photos →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: Upload Photos */}
                                {listingStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <h4 className="font-extrabold text-sm text-slate-900 border-l-4 border-[#0058A3] pl-2">
                                            Step 2: Upload Real Item Photos
                                        </h4>
                                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-blue-50/50 transition-colors">
                                            <span className="text-3xl block mb-2">📸</span>
                                            <p className="text-xs font-extrabold text-slate-800">Drag & Drop real photos of your furniture</p>
                                            <p className="text-[11px] text-slate-500 mt-1">Supports PNG, JPG, WebP up to 15MB</p>
                                            <button
                                                type="button"
                                                className="mt-3 px-4 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-700 shadow-sm"
                                            >
                                                Choose Files
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 block">Select 3D Material / Finish Color Accent</label>
                                            <div className="flex items-center space-x-3">
                                                {["#0058A3", "#7C3AED", "#16A34A", "#D97706", "#DC2626", "#475569"].map((color) => (
                                                    <button
                                                        type="button"
                                                        key={color}
                                                        onClick={() => setNewPhotoColor(color)}
                                                        className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${newPhotoColor === color ? "border-slate-900 scale-110 shadow-md" : "border-white"}`}
                                                        style={{ backgroundColor: color }}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(1)}
                                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(3)}
                                                className="px-5 py-2.5 rounded-xl bg-[#0058A3] text-white font-bold text-xs"
                                            >
                                                Next: Condition →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: Condition */}
                                {listingStep === 3 && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <h4 className="font-extrabold text-sm text-slate-900 border-l-4 border-[#0058A3] pl-2">
                                            Step 3: Item Condition Assessment
                                        </h4>
                                        <div className="grid grid-cols-2 gap-3">
                                            {(["Like New", "Excellent", "Good", "Fair"] as FurnitureCondition[]).map((cond) => (
                                                <button
                                                    type="button"
                                                    key={cond}
                                                    onClick={() => setNewCondition(cond)}
                                                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${newCondition === cond
                                                            ? "border-[#0058A3] bg-blue-50 text-[#0058A3] shadow-sm font-extrabold"
                                                            : "border-slate-200 text-slate-700 hover:bg-slate-50"
                                                        }`}
                                                >
                                                    <span className="text-xs font-extrabold block">{cond}</span>
                                                    <span className="text-[10px] text-slate-500 mt-1 block">
                                                        {cond === "Like New" && "Minimal to no signs of wear."}
                                                        {cond === "Excellent" && "Very minor cosmetic scratches."}
                                                        {cond === "Good" && "Sturdy structure with normal use wear."}
                                                        {cond === "Fair" && "Functional with visible surface wear."}
                                                    </span>
                                                </button>
                                            ))}
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(2)}
                                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(4)}
                                                className="px-5 py-2.5 rounded-xl bg-[#0058A3] text-white font-bold text-xs"
                                            >
                                                Next: Description & Dimensions →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 4: Description & Dimensions */}
                                {listingStep === 4 && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <h4 className="font-extrabold text-sm text-slate-900 border-l-4 border-[#0058A3] pl-2">
                                            Step 4: Description & 3D Dimensions
                                        </h4>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 block">Item Description</label>
                                            <textarea
                                                rows={3}
                                                required
                                                placeholder="State purchase history, reasons for selling, pet-free/smoke-free home details..."
                                                value={newDescription}
                                                onChange={(e) => setNewDescription(e.target.value)}
                                                className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="text-[11px] font-bold text-slate-700 block">Width (meters)</label>
                                                <input
                                                    type="number"
                                                    step="0.05"
                                                    value={newWidth}
                                                    onChange={(e) => setNewWidth(Number(e.target.value))}
                                                    className="w-full p-2 border border-slate-300 rounded-xl text-xs font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold text-slate-700 block">Depth (meters)</label>
                                                <input
                                                    type="number"
                                                    step="0.05"
                                                    value={newDepth}
                                                    onChange={(e) => setNewDepth(Number(e.target.value))}
                                                    className="w-full p-2 border border-slate-300 rounded-xl text-xs font-bold"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[11px] font-bold text-slate-700 block">Height (meters)</label>
                                                <input
                                                    type="number"
                                                    step="0.05"
                                                    value={newHeight}
                                                    onChange={(e) => setNewHeight(Number(e.target.value))}
                                                    className="w-full p-2 border border-slate-300 rounded-xl text-xs font-bold"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-700 block">Pickup Location / Area</label>
                                            <input
                                                type="text"
                                                value={newLocation}
                                                onChange={(e) => setNewLocation(e.target.value)}
                                                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                                            />
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(3)}
                                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(5)}
                                                className="px-5 py-2.5 rounded-xl bg-[#0058A3] text-white font-bold text-xs"
                                            >
                                                Next: Price & Swap Options →
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 5: Price & Swap Available */}
                                {listingStep === 5 && (
                                    <div className="space-y-5 animate-in fade-in">
                                        <h4 className="font-extrabold text-sm text-slate-900 border-l-4 border-[#0058A3] pl-2">
                                            Step 5: Pricing & Swap Preference
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 block">Asking Selling Price (₹)</label>
                                                <input
                                                    type="number"
                                                    required
                                                    value={newPrice}
                                                    onChange={(e) => setNewPrice(Number(e.target.value))}
                                                    className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-black text-slate-900"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs font-bold text-slate-700 block">Original Purchase Price (₹)</label>
                                                <input
                                                    type="number"
                                                    value={newOrigPrice}
                                                    onChange={(e) => setNewOrigPrice(Number(e.target.value))}
                                                    className="w-full p-2.5 border border-slate-300 rounded-xl text-sm font-bold text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 flex items-center justify-between">
                                            <div>
                                                <span className="font-extrabold text-xs text-purple-900 block">Enable Item Swap Requests?</span>
                                                <span className="text-[10px] text-purple-700 block">Allow users to offer trade-in furniture + net difference</span>
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={isSwapAvailable}
                                                onChange={(e) => setIsSwapAvailable(e.target.checked)}
                                                className="w-5 h-5 accent-purple-600 rounded cursor-pointer"
                                            />
                                        </div>

                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                                            <span className="font-black text-slate-900 block uppercase">Listing Card Preview:</span>
                                            <div className="flex justify-between items-center text-slate-700">
                                                <span className="font-bold">{newName || "Scandinavian Furniture"}</span>
                                                <span className="font-black text-[#0058A3]">₹{newPrice.toLocaleString("en-IN")}</span>
                                            </div>
                                            <span className="text-[10px] text-emerald-600 font-bold block">✓ Verified Seller Guarantee Included</span>
                                        </div>

                                        <div className="flex justify-between pt-4">
                                            <button
                                                type="button"
                                                onClick={() => setListingStep(4)}
                                                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                                            >
                                                ← Back
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-6 py-3 rounded-2xl bg-[#0058A3] hover:bg-blue-800 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                                            >
                                                🚀 Publish Listing Now
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        ) : (
                            <div className="p-8 text-center space-y-4">
                                <span className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                                    🎉
                                </span>
                                <h4 className="text-2xl font-black text-slate-900">Listing Published Live!</h4>
                                <p className="text-xs font-semibold text-slate-600 max-w-sm mx-auto">
                                    Your item <span className="font-bold text-slate-900">"{newName}"</span> is now active on the marketplace and ready for Buy, Swap, and 3D Room Planner integration.
                                </p>
                                <button
                                    onClick={resetListingForm}
                                    className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs"
                                >
                                    Return to Marketplace
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MANDATORY SECTION 3 & 5: 🔎 ITEM DETAIL MODAL WITH TRUST & SAFETY */}
            {detailItem && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white text-slate-900 w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in-95">
                        {/* Header bar */}
                        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                            <span className="text-xs font-black uppercase tracking-wider text-[#FFDB00]">
                                Item Detail & Verified Seller Verification
                            </span>
                            <button
                                onClick={() => setDetailItem(null)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Large Furniture Image Container */}
                        <div
                            className="relative h-64 sm:h-72 flex items-center justify-center p-8"
                            style={{ backgroundColor: detailItem.color ? `${detailItem.color}20` : "#F1F5F9" }}
                        >
                            <div
                                className="w-40 h-40 rounded-3xl shadow-xl border-4 border-white flex items-center justify-center"
                                style={{ backgroundColor: detailItem.color || "#0058A3" }}
                            >
                                <span className="text-white text-base font-black uppercase tracking-wider text-center px-2">
                                    {detailItem.category}
                                </span>
                            </div>

                            <span className="absolute top-4 left-4 bg-slate-900 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md">
                                Condition: {detailItem.condition}
                            </span>

                            {detailItem.originalPrice && (
                                <span className="absolute top-4 right-4 bg-[#FFDB00] text-black text-xs font-black px-3 py-1 rounded-full shadow-md">
                                    Save {Math.round(((detailItem.originalPrice - detailItem.price) / detailItem.originalPrice) * 100)}%
                                </span>
                            )}
                        </div>

                        {/* Item Info Body */}
                        <div className="p-6 space-y-6">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900">{detailItem.name}</h2>
                                <div className="flex items-baseline space-x-3 mt-2">
                                    <span className="text-3xl font-black text-slate-900">
                                        ₹{detailItem.price.toLocaleString("en-IN")}
                                    </span>
                                    {detailItem.originalPrice && (
                                        <span className="text-sm font-semibold text-slate-400 line-through">
                                            Originally ₹{detailItem.originalPrice.toLocaleString("en-IN")}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-600 mt-3 leading-relaxed">{detailItem.description}</p>
                            </div>

                            {/* Dimensions & Location Breakdown */}
                            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                                <div>
                                    <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Dimensions</span>
                                    <span className="font-extrabold text-slate-800 text-sm block mt-0.5">
                                        {Math.round(detailItem.width * 100)} × {Math.round(detailItem.depth * 100)} × {Math.round(detailItem.height * 100)} cm
                                    </span>
                                </div>
                                <div>
                                    <span className="text-slate-400 font-extrabold uppercase text-[10px] block">Pickup Location</span>
                                    <span className="font-extrabold text-slate-800 text-sm block mt-0.5">
                                        📍 {detailItem.location}
                                    </span>
                                </div>
                            </div>

                            {/* TRUST & SAFETY SECTION (MANDATORY ⭐ 5) */}
                            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-[#0058A3] tracking-wider block">
                                        Seller Verification & Safety
                                    </span>
                                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                                        🛡️ Escrow Protected
                                    </span>
                                </div>

                                <div className="flex items-center justify-between pt-1">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 rounded-full bg-[#0058A3] text-white flex items-center justify-center font-extrabold text-sm">
                                            {detailItem.sellerName.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-extrabold text-xs text-slate-900 flex items-center gap-1">
                                                <span>{detailItem.sellerName}</span>
                                                <span className="text-blue-600 text-xs">✓ Verified</span>
                                            </h4>
                                            <p className="text-[11px] text-slate-500 flex items-center gap-1 font-bold">
                                                <span className="text-amber-500">★★★★★ 4.8</span>
                                                <span>• 23 completed transactions</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-blue-100 text-[10px] font-bold text-slate-700">
                                    <span className="flex items-center gap-1">✓ Phone verified</span>
                                    <span className="flex items-center gap-1">✓ IKEA verified</span>
                                    <span className="flex items-center gap-1">✓ Community member</span>
                                </div>
                            </div>

                            {/* MANDATORY ACTION BUTTONS: [ BUY NOW ] [ REQUEST SWAP ] [ SEE IN MY ROOM ] */}
                            <div className="space-y-2 pt-2">
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            const target = detailItem;
                                            setDetailItem(null);
                                            setCheckoutItem(target);
                                            setOrderConfirmedId(null);
                                        }}
                                        className="py-3 rounded-2xl bg-[#0058A3] hover:bg-blue-800 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
                                    >
                                        <span>🛒 BUY NOW</span>
                                    </button>

                                    <button
                                        onClick={() => {
                                            const target = detailItem;
                                            setDetailItem(null);
                                            setSwapItem(target);
                                            setSwapConfirmedCode(null);
                                        }}
                                        className="py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
                                    >
                                        <span>🔄 REQUEST SWAP</span>
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        const target = detailItem;
                                        setDetailItem(null);
                                        handleAddToRoom(target);
                                    }}
                                    className="w-full py-3 rounded-2xl bg-[#FFDB00] hover:bg-yellow-400 text-black font-extrabold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-1"
                                >
                                    <span>🪑 SEE IN MY ROOM (+ 3D Planner)</span>
                                </button>
                            </div>

                            {/* Report & Security Footer */}
                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-100">
                                <span>🔒 100% Secure Transaction & Inspected Furniture</span>
                                <button
                                    onClick={() => showToast("Listing reported to trust team.")}
                                    className="hover:underline text-rose-500 font-bold cursor-pointer"
                                >
                                    Report listing
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MANDATORY SECTION 4: BUY NOW CHECKOUT MODAL */}
            {checkoutItem && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
                        <div className="p-4 bg-[#0058A3] text-white flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-[#FFDB00] block">Marketplace Checkout</span>
                                <h3 className="font-extrabold text-base">Buy Secondhand Furniture</h3>
                            </div>
                            <button
                                onClick={() => setCheckoutItem(null)}
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {!orderConfirmedId ? (
                            <div className="p-6 space-y-5">
                                <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center font-bold text-[#0058A3] text-xs">
                                        {checkoutItem.category}
                                    </div>
                                    <div>
                                        <h4 className="font-extrabold text-xs text-slate-900">{checkoutItem.name}</h4>
                                        <span className="text-sm font-black text-slate-900">₹{checkoutItem.price.toLocaleString("en-IN")}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold text-slate-700 block">Fulfillment Method</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMethod("delivery")}
                                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${deliveryMethod === "delivery" ? "border-[#0058A3] bg-blue-50 text-[#0058A3]" : "border-slate-200 text-slate-600"}`}
                                        >
                                            🚚 Home Delivery (+₹299)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setDeliveryMethod("pickup")}
                                            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${deliveryMethod === "pickup" ? "border-[#0058A3] bg-blue-50 text-[#0058A3]" : "border-slate-200 text-slate-600"}`}
                                        >
                                            🚗 Self Pickup (Free)
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold text-slate-700 block">Payment Method</label>
                                    <select
                                        value={paymentMethod}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                                    >
                                        <option value="upi">📱 UPI (GPay / PhonePe / Paytm)</option>
                                        <option value="card">💳 Credit / Debit Card</option>
                                        <option value="cash">💵 Cash on Pickup / Delivery</option>
                                        <option value="credits">⭐ Swap Credits Balance (₹5,400 avail)</option>
                                    </select>
                                </div>

                                <div className="pt-3 border-t border-slate-200 space-y-1 text-xs">
                                    <div className="flex justify-between text-slate-600 font-semibold">
                                        <span>Item Price:</span>
                                        <span>₹{checkoutItem.price.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600 font-semibold">
                                        <span>Fulfillment Fee:</span>
                                        <span>{deliveryMethod === "delivery" ? "₹299" : "Free"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                                        <span>Total Payable:</span>
                                        <span className="text-[#0058A3]">
                                            ₹{(checkoutItem.price + (deliveryMethod === "delivery" ? 299 : 0)).toLocaleString("en-IN")}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmBuy}
                                    className="w-full py-3 rounded-2xl bg-[#0058A3] hover:bg-blue-800 text-white font-black text-xs shadow-lg transition-all cursor-pointer"
                                >
                                    Confirm Order & Pay Now →
                                </button>
                            </div>
                        ) : (
                            <div className="p-6 text-center space-y-4">
                                <span className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                                    ✓
                                </span>
                                <h4 className="text-xl font-black text-slate-900">Order Confirmed!</h4>
                                <p className="text-xs font-bold text-slate-600">
                                    Order ID: <span className="font-mono text-[#0058A3]">{orderConfirmedId}</span>
                                </p>
                                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left space-y-1">
                                    <p className="font-bold text-slate-800">Fulfillment: Tomorrow, 2:00 PM</p>
                                    <p className="text-slate-500">Seller: {checkoutItem.sellerName} (Verified)</p>
                                </div>
                                <button
                                    onClick={() => setCheckoutItem(null)}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                                >
                                    Done
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* MANDATORY SECTION 4: REQUEST SWAP MODAL */}
            {swapItem && (
                <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white text-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 my-8">
                        <div className="p-4 bg-purple-700 text-white flex items-center justify-between">
                            <div>
                                <span className="text-[10px] font-black uppercase text-purple-200 block">Furniture Swap Mechanism</span>
                                <h3 className="font-extrabold text-base">Request Furniture Swap</h3>
                            </div>
                            <button
                                onClick={() => setSwapItem(null)}
                                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-sm flex items-center justify-center cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {!swapConfirmedCode ? (
                            <div className="p-6 space-y-5">
                                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
                                    <span className="text-[10px] font-extrabold uppercase text-purple-700 block">Target Item to Acquire</span>
                                    <h4 className="font-black text-slate-900 text-xs">{swapItem.name}</h4>
                                    <p className="text-xs font-bold text-purple-900">Listed Value: ₹{swapItem.price.toLocaleString("en-IN")}</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-extrabold text-slate-700 block">Choose Your Furniture to Offer</label>
                                    <select
                                        value={offeredItem}
                                        onChange={(e) => {
                                            const name = e.target.value;
                                            const val = name.includes("Chair") ? 2000 : name.includes("Desk") ? 3500 : 1500;
                                            setOfferedItem(name);
                                            setOfferedEstValue(val);
                                        }}
                                        className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 bg-white"
                                    >
                                        <option value="Birch Desk Chair">Birch Desk Chair (Est. Value ₹2,000)</option>
                                        <option value="Compact Study Desk">Compact Study Desk (Est. Value ₹3,500)</option>
                                        <option value="Wooden Side Table">Wooden Side Table (Est. Value ₹1,500)</option>
                                    </select>
                                </div>

                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                                    <span className="font-extrabold text-slate-900 block">Swap Credit & Value Difference</span>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Target Item Value:</span>
                                        <span>₹{swapItem.price.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-600">
                                        <span>Your Offered Item:</span>
                                        <span>- ₹{offeredEstValue.toLocaleString("en-IN")}</span>
                                    </div>
                                    <div className="pt-2 border-t border-slate-200 flex justify-between font-black text-slate-900">
                                        <span>Net Difference Settlement:</span>
                                        <span className="text-purple-700">
                                            {swapItem.price >= offeredEstValue
                                                ? `Pay Difference: ₹${(swapItem.price - offeredEstValue).toLocaleString("en-IN")}`
                                                : `Receive Credit: ₹${(offeredEstValue - swapItem.price).toLocaleString("en-IN")}`}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleConfirmSwap}
                                    className="w-full py-3 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-lg transition-all cursor-pointer"
                                >
                                    Submit Swap Request →
                                </button>
                            </div>
                        ) : (
                            <div className="p-6 text-center space-y-4">
                                <span className="w-16 h-16 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                                    🔄
                                </span>
                                <h4 className="text-xl font-black text-slate-900">Swap Requested!</h4>
                                <p className="text-xs font-bold text-slate-600">
                                    Swap Code: <span className="font-mono text-purple-700">{swapConfirmedCode}</span>
                                </p>
                                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-left space-y-1">
                                    <p className="font-bold text-purple-900">Swap Proposal Sent to {swapItem.sellerName}</p>
                                    <p className="text-purple-700">Value Settlement: Net difference held in escrow</p>
                                </div>
                                <button
                                    onClick={() => setSwapItem(null)}
                                    className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                                >
                                    Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
