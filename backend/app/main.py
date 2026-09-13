from fastapi import FastAPI
app = FastAPI(title="API")
@app.get("/")
def root():
    return {"message": "VenueVault Backend is running"}