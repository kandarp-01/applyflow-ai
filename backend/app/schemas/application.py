from pydantic import BaseModel

class ApplicationCreate(BaseModel):

    company: str
    role: str
    status: str

    job_link: str
    location: str
    notes: str
