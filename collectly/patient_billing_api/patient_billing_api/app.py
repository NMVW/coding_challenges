from fastapi import FastAPI
from pydantic import BaseModel
import debugpy

app = FastAPI()
debugpy.listen("0.0.0.0", 5678)

class Patient(BaseModel):
    id: int
    name: str
    dob: str

patients = {}

@app.post("/patients/")
async def create_patient(patient: Patient):
    patients[patient.id] = patient
    return patient

@app.get("/patients/{patient_id}")
async def read_patient(patient_id: int):
    return patients.get(patient_id, {"error": "Patient not found"})