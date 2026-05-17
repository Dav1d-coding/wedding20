from django.db import models


class RSVP(models.Model):
    class Attendance(models.TextChoices):
        YES = "yes", "Приду"
        NO = "no", "Не смогу"
        MAYBE = "maybe", "Пока не уверен(а)"

    class MealChoice(models.TextChoices):
        MEAT = "meat", "Мясо"
        FISH = "fish", "Рыба"

    created_at = models.DateTimeField(auto_now_add=True)

    full_name = models.CharField(max_length=200)
    attendance = models.CharField(max_length=10, choices=Attendance.choices)

    day_1 = models.BooleanField(default=False)
    day_2 = models.BooleanField(default=True)
    day_3 = models.BooleanField(default=False)

    needs_transfer = models.BooleanField(default=False)
    meal_choice = models.CharField(max_length=10, choices=MealChoice.choices, blank=True)

    allergies = models.TextField(blank=True)
    comment = models.TextField(blank=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Ответ гостя"
        verbose_name_plural = "Ответы гостей"

    def __str__(self) -> str:
        return f"{self.full_name} ({self.attendance})"