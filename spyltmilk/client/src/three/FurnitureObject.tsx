import React, { useRef, useState } from "react";
import type { ThreeEvent } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { SceneObject } from "../types/room";
import { useRoomStore } from "../store/roomStore";
import * as THREE from "three";

interface FurnitureObjectProps {
    object: SceneObject;
    isSelected: boolean;
    isColliding: boolean;
}

export const FurnitureObject: React.FC<FurnitureObjectProps> = ({ object, isSelected, isColliding }) => {
    const groupRef = useRef<THREE.Group>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const selectObject = useRoomStore((state) => state.selectObject);
    const moveObject = useRoomStore((state) => state.moveObject);

    const width = object.width || 0.6;
    const depth = object.depth || 0.6;
    const height = object.height || 0.8;
    const color = object.color || "#64748B";

    const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        selectObject(object.id);
        setIsDragging(true);
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const handlePointerUp = (e: ThreeEvent<PointerEvent>) => {
        setIsDragging(false);
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
        if (!isDragging) return;
        e.stopPropagation();
        if (e.point) {
            // Drag on XZ floor plane
            moveObject(object.id, [e.point.x, 0, e.point.z]);
        }
    };

    return (
        <group
            ref={groupRef}
            position={object.position}
            rotation={object.rotation}
            scale={object.scale || [1, 1, 1]}
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerMove={handlePointerMove}
        >
            {/* Main Furniture Geometry Representation */}
            <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={isColliding ? "#EF4444" : isSelected ? "#0058A3" : color}
                    roughness={0.4}
                    metalness={0.1}
                />
            </mesh>

            {/* Selection Bounding Wireframe Box */}
            {(isSelected || isHovered || isColliding) && (
                <mesh position={[0, height / 2, 0]}>
                    <boxGeometry args={[width + 0.05, height + 0.05, depth + 0.05]} />
                    <meshBasicMaterial
                        color={isColliding ? "#EF4444" : isSelected ? "#FFDB00" : "#38BDF8"}
                        wireframe
                    />
                </mesh>
            )}

            {/* Collision Warning Overlay */}
            {isColliding && (
                <Html position={[0, height + 0.3, 0]} center>
                    <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg flex items-center space-x-1 whitespace-nowrap animate-pulse border border-red-300">
                        <span>⚠ Collision</span>
                    </div>
                </Html>
            )}

            {/* Selected Floating Tag */}
            {isSelected && !isColliding && (
                <Html position={[0, height + 0.3, 0]} center>
                    <div className="bg-[#0058A3] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center space-x-1 whitespace-nowrap border border-blue-300">
                        <span>{object.name}</span>
                        {object.price && <span className="text-[#FFDB00]">₹{object.price}</span>}
                    </div>
                </Html>
            )}
        </group>
    );
};
