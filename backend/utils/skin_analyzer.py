# # backend/utils/skin_analyzer.py

# import tensorflow as tf
# from tensorflow import keras 
# from PIL import Image
# import numpy as np
# import io

# from backend.logger_config import logger

# class SkinAnalyzer:
#     def __init__(self, model_path: str):
#         self.model = None
#         self.model_path = model_path
#         self.image_size = (224, 224)
#         # These class names MUST MATCH your model's output classes EXACTLY.
#         self.class_names = ["normal", "acne", "dry", "oily", "combination"] 

#         self._load_model()

#     def _load_model(self):
#         try:
#             logger.info(f"Loading skin analysis model from: {self.model_path}")
#             self.model = keras.models.load_model(self.model_path)
            
#             # Log the model's expected input shape for verification
#             logger.info(f"Model loaded successfully. Expected input shape: {self.model.input_shape}")
#         except Exception as e:
#             logger.error(f"Error loading skin analysis model: {e}", exc_info=True)
#             self.model = None

#     def preprocess_image(self, image_bytes: bytes):
#         """
#         Preprocesses image bytes for the Keras model.
#         This version ensures the image is converted to a 4-channel RGBA format
#         to match the model's input requirements.
#         """
#         try:
#             pil_image = Image.open(io.BytesIO(image_bytes))
            
#             # Ensure the image has 4 channels (RGBA) ---
#             # Your model expects a 4-channel image, so we must explicitly convert to RGBA.
#             # This is the direct solution to the ValueError.
#             image = pil_image.convert("RGBA")

#             # Resize to model's expected input size
#             image = image.resize(self.image_size)
            
#             # Convert PIL Image to a NumPy array
#             image_array = np.array(image, dtype=np.float32)

#             # Normalize pixel values to the range [0, 1]
#             # This is a standard practice for many custom models.
#             image_array /= 255.0
            
#             # Add batch dimension (model expects (1, height, width, channels))
#             processed_image = np.expand_dims(image_array, axis=0)
            
#             logger.debug(f"Image preprocessed. Final shape: {processed_image.shape}")
#             return processed_image
#         except Exception as e:
#             logger.error(f"Error during image preprocessing: {e}", exc_info=True)
#             return None

#     def analyze_skin_type(self, image_bytes: bytes) -> str:
#         """
#         Performs skin type analysis on the provided image bytes.
#         Returns a single string with the predicted class name.
#         """
#         if self.model is None:
#             return "Skin analysis model is not loaded. Cannot perform analysis."

#         processed_image = self.preprocess_image(image_bytes)
#         if processed_image is None:
#             return "Failed to preprocess image for analysis."

#         try:
#             predictions = self.model.predict(processed_image, verbose=0)

#             preds = predictions[0]

#             if len(preds) != len(self.class_names):
#                 logger.error(f"[ERROR] Model output length ({len(preds)}) doesn't match number of categories ({len(self.class_names)}).")
#                 return "An internal error occurred during analysis: category mismatch."

#             top_idx = np.argmax(preds)
#             predicted_skin_type = self.class_names[top_idx]
#             logger.info(f"SKIN_ANALYZER_OUTPUT: Raw Keras model prediction (top class): {predicted_skin_type}")

            
#             logger.info(f"Skin analysis prediction: {predicted_skin_type}")
#             return predicted_skin_type
#         except Exception as e:
#             logger.error(f"Error during skin analysis prediction: {e}", exc_info=True)
#             return "An error occurred during skin analysis. Please try again."


# backend/utils/skin_analyzer.py

import tensorflow as tf
from tensorflow import keras
from PIL import Image
import numpy as np
import io

from backend.logger_config import logger

class SkinAnalyzer:
    def __init__(self, model_path: str):
        self.model = None
        self.model_path = model_path
        self.image_size = (224, 224)
        # These class names MUST MATCH your model's output classes EXACTLY.
        self.class_names = ["normal", "acne", "dry", "oily", "combination"]

        self._load_model()

    def _load_model(self):
        try:
            logger.info(f"Loading skin analysis model from: {self.model_path}")
            self.model = keras.models.load_model(self.model_path)

            # Log the model's expected input shape for verification
            logger.info(f"Model loaded successfully. Expected input shape: {self.model.input_shape}")
        except Exception as e:
            logger.error(f"Error loading skin analysis model: {e}", exc_info=True)
            self.model = None

    def preprocess_image(self, image_bytes: bytes):
        """
        Preprocesses image bytes for the Keras model.
        This version ensures the image is converted to the correct number of channels.
        """
        try:
            pil_image = Image.open(io.BytesIO(image_bytes))

            # The fix: Convert to 3-channel RGB to match the model's input shape.
            # The error log showed the model expects (None, 224, 224, 3).
            image = pil_image.convert("RGB")

            # Resize to model's expected input size
            image = image.resize(self.image_size)

            # Convert PIL Image to a NumPy array
            image_array = np.array(image, dtype=np.float32)

            # Normalize pixel values to the range [0, 1]
            image_array /= 255.0

            # Add batch dimension (model expects (1, height, width, channels))
            processed_image = np.expand_dims(image_array, axis=0)

            logger.debug(f"Image preprocessed. Final shape: {processed_image.shape}")
            return processed_image
        except Exception as e:
            logger.error(f"Error during image preprocessing: {e}", exc_info=True)
            return None

    def analyze_skin_type(self, image_bytes: bytes) -> str:
        """
        Performs skin type analysis on the provided image bytes.
        Returns a single string with the predicted class name.
        """
        if self.model is None:
            return "Skin analysis model is not loaded. Cannot perform analysis."

        processed_image = self.preprocess_image(image_bytes)
        if processed_image is None:
            return "Failed to preprocess image for analysis."

        try:
            predictions = self.model.predict(processed_image, verbose=0)

            preds = predictions[0]

            if len(preds) != len(self.class_names):
                logger.error(f"[ERROR] Model output length ({len(preds)}) doesn't match number of categories ({len(self.class_names)}).")
                return "An internal error occurred during analysis: category mismatch."

            top_idx = np.argmax(preds)
            predicted_skin_type = self.class_names[top_idx]
            logger.info(f"SKIN_ANALYZER_OUTPUT: Raw Keras model prediction (top class): {predicted_skin_type}")

            logger.info(f"Skin analysis prediction: {predicted_skin_type}")
            return predicted_skin_type
        except Exception as e:
            logger.error(f"Error during skin analysis prediction: {e}", exc_info=True)
            return "An error occurred during skin analysis. Please try again."