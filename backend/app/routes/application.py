from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.application import Application
from app.models.user import User

from app.schemas.application import ApplicationCreate

from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/applications",
    tags=["Applications"]
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/")
def create_application(
    application: ApplicationCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_application = Application(

        company=application.company,
        role=application.role,
        status=application.status,

        job_link=application.job_link,
        location=application.location,
        notes=application.notes,

        user_id=current_user.id
    )

    db.add(new_application)

    db.commit()

    db.refresh(new_application)

    return {
        "message": "Application created successfully"
    }
