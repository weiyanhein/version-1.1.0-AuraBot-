from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import FileResponse
from pymongo import MongoClient
import os

router = APIRouter()

client = MongoClient("mongodb://localhost:27017")
db = client["skincare_chatbot_db"]
products_collection = db["products"]

IMAGE_FOLDER = os.path.join(os.getcwd(), "backend","static", "product_images")


@router.get("/api/products")
async def get_products(
    search: str = Query(None),
    product_type: str = Query(None)
):
    query = {}
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"brand": {"$regex": search, "$options": "i"}},
            {"product_type": {"$regex": search, "$options": "i"}},
            {"concerns": {"$elemMatch": {"$regex": search, "$options": "i"}}}
        ]
    if product_type:
        query["product_type"] = {"$regex": product_type, "$options": "i"}

    products = list(products_collection.find(query))
    if not products:
        raise HTTPException(status_code=404, detail="No products found")

    for product in products:
        product["_id"] = str(product["_id"])
        product["imageUrl"] = f"/api/product-images/{product['image_filename']}"
    return products

@router.get("/api/product-images/{image_filename}")
async def get_product_image(image_filename: str):
    print(f"My image file name {image_filename}")
    
    image_path = os.path.join(IMAGE_FOLDER, image_filename)
    print("Looking for:", image_path)
    print("Files in folder:", os.listdir(IMAGE_FOLDER))  
    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail=f"Image not found at {image_path}")
    return FileResponse(image_path)
