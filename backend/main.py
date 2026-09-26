from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import rooms, reconstruction, furniture

app = FastAPI(
    title="SPYLT Circular Hub - AI 3D Room Planner Backend",
    description="Backend API for VGGT photo reconstruction, Blender asset pipeline, and AI room layout generation.",
    version="1.0.0"
)

# Enable CORS for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(rooms.router, prefix="/api/rooms", tags=["Rooms"])
app.include_router(reconstruction.router, prefix="/api/reconstruction", tags=["VGGT Reconstruction"])
app.include_router(furniture.router, prefix="/api/furniture", tags=["Furniture"])

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "SPYLT AI 3D Room Planner & Reconstruction API",
        "vggt_enabled": True,
        "blender_mcp_ready": True
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
