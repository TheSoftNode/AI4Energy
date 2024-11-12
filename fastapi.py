# pip install fastapi uvicorn statsmodels


# in python: 

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import statsmodels.api as sm
import numpy as np

app = FastAPI()

# Define request data model
class TimeSeriesData(BaseModel):
    values: List[float]

# Endpoint for fitting AR(2) model and predicting the next value
@app.post("/predict")
async def predict_next(data: TimeSeriesData):
    # Ensure there are enough data points
    if len(data.values) < 3:
        raise HTTPException(status_code=400, detail="At least 3 data points are needed for AR(2) prediction.")
    
    # Fit the AR(2) model
    model = sm.tsa.AR(data.values)
    ar_model = model.fit(maxlag=2)
    
    # Make a prediction
    predicted_value = ar_model.predict(start=len(data.values), end=len(data.values))[0]
    
    return {"next_value": predicted_value}



#Run the FastAPI App
# uvicorn main:app --reload
