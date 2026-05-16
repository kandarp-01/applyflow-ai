from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import SessionLocal
from app.models.application import Application
from app.models.user import User

from app.auth.dependencies import get_current_user

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/stats")
def get_dashboard_stats(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    applications = db.query(Application).filter(
        Application.user_id == current_user.id
    ).all()

    total = len(applications)

    interviews = len([
        app for app in applications
        if app.status.lower() == "interview"
    ])

    offers = len([
        app for app in applications
        if app.status.lower() == "offer"
    ])

    rejected = len([
        app for app in applications
        if app.status.lower() == "rejected"
    ])

    applied = len([
        app for app in applications
        if app.status.lower() == "applied"
    ])

    return {

        "total_applications": total,

        "applied": applied,

        "interviews": interviews,

        "offers": offers,

        "rejected": rejected
    }


@router.get("/status-distribution")
def status_distribution(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    applications = db.query(Application).filter(
        Application.user_id == current_user.id
    ).all()

    distribution = {}

    for app in applications:

        status = app.status

        if status in distribution:
            distribution[status] += 1

        else:
            distribution[status] = 1

    return distribution

@router.get("/recent-applications")
def recent_applications(

    db: Session = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    applications = db.query(Application).filter(
        Application.user_id == current_user.id
    ).order_by(
        Application.id.desc()
    ).limit(5).all()

    return applications
