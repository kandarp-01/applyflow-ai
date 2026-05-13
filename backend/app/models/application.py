from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.database import Base

class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String)
    role = Column(String)
    status = Column(String)

    job_link = Column(String)
    location = Column(String)
    notes = Column(String)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    owner = relationship(
    "User",
    back_populates="applications"
    )
