from django.contrib import admin

from .models import RSVP


@admin.register(RSVP)
class RSVPAdmin(admin.ModelAdmin):
    list_display = (
        "created_at",
        "full_name",
        "attendance",
        "day_1",
        "day_2",
        "day_3",
        "needs_transfer",
        "meal_choice",
    )

    list_filter = (
        "attendance",
        "day_1",
        "day_2",
        "day_3",
        "needs_transfer",
        "meal_choice",
        "created_at",
    )

    search_fields = (
        "full_name",
        "allergies",
        "comment",
    )

    readonly_fields = ("created_at",)

    fieldsets = (
        (
            "Основная информация",
            {
                "fields": (
                    "created_at",
                    "full_name",
                    "attendance",
                )
            },
        ),
        (
            "Дни посещения",
            {
                "fields": (
                    "day_1",
                    "day_2",
                    "day_3",
                )
            },
        ),
        (
            "Пожелания гостя",
            {
                "fields": (
                    "needs_transfer",
                    "meal_choice",
                    "allergies",
                    "comment",
                )
            },
        ),
    )