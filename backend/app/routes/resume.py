from fastapi import APIRouter

from pydantic import BaseModel

from app.services.resume_match import calculate_match

router = APIRouter(
    prefix="/resume",
    tags=["Resume Match"]
)

class ResumeRequest(BaseModel):

    job_description: str

@router.post("/match")
def match_resume(data: ResumeRequest):

    result = calculate_match(
        data.job_description
    )

    return result
