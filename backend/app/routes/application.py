from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.application import Application
from app.models.user import User

from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate
)

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

@router.get("/")
def get_applications(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    applications = db.query(Application).filter(
        Application.user_id == current_user.id
    ).all()

    return applications

@router.put("/{application_id}")
def update_application(

    application_id: int,
    updated_data: ApplicationUpdate,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == current_user.id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    application.company = updated_data.company
    application.role = updated_data.role
    application.status = updated_data.status

    application.job_link = updated_data.job_link
    application.location = updated_data.location
    application.notes = updated_data.notes

    db.commit()

    db.refresh(application)

    return {
        "message": "Application updated successfully"
    }


@router.delete("/{application_id}")
def delete_application(

    application_id: int,

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    application = db.query(Application).filter(
        Application.id == application_id,
        Application.user_id == current_user.id
    ).first()

    if not application:
        return {
            "message": "Application not found"
        }

    db.delete(application)

    db.commit()

    return {
        "message": "Application deleted successfully"
    }
