from fastapi import FastAPI, File, UploadFile
import tensorflow as tf
import numpy as np
from PIL import Image
import io

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



model = tf.keras.models.load_model("jan_seva_model.h5")
class_names = ["DamagedElectricalPoles", "DamagedRoadSigns", "Garbage", "Potholes and RoadCracks"]

def preprocess(image):
    image = image.resize((224, 224))
    img_array = np.array(image) / 255.0
    return np.expand_dims(img_array, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    image_bytes = await file.read()
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    input_tensor = preprocess(image)
    predictions = model.predict(input_tensor)[0]

    idx = np.argmax(predictions)

    return {
        "issueType": class_names[idx],
        "confidence": float(predictions[idx])
    }

@app.get("/health")
def health():
    return {"status": "ML API running"}
