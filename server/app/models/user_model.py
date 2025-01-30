from typing import Optional
from datetime import datetime, timezone
from uuid import UUID, uuid4
from beanie import Document, Indexed
from pydantic import EmailStr, Field

class User(Document):
    id: UUID = Field(default_factory=uuid4, alias="_id")
    email: EmailStr = Indexed(unique=True)
    hashed_password: str
    first_name: str
    last_name: Optional[str]
    created_at: datetime = Field(default_factory=datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=datetime.now(timezone.utc))
    is_active: bool = True

    def __repr__(self) -> str:
        return f"<User {self.email}>"
    
    def __str__(self) -> str:
        return self.email
    
    def  __hash__(self) -> int:
        return hash(self.id)
    
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, User):
            return False
        return self.id == other.id
    
    @property
    def full_name(self) -> str:
        return f"{self.first_name} {self.last_name}" if self.last_name else self.first_name
    
    def create(self) -> datetime:
        self.created_at = datetime.now(timezone.utc)
        return self.created_at
    
    @classmethod
    async def get_by_email(cls, email: EmailStr) -> Optional["User"]:
        return await cls.get_one({"email": email})

    class Meta:
        collection = "users"