import json
from typing import Any

from django.http import HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from .models import RSVP


def _get_bool(value: Any) -> bool:
    return bool(value) if value is not None else False


@csrf_exempt
@require_POST
def rsvp_submit(request: HttpRequest) -> JsonResponse:
    try:
        payload = json.loads(request.body.decode("utf-8") or "{}")
    except json.JSONDecodeError:
        return JsonResponse({"ok": False, "error": "invalid_json"}, status=400)

    full_name = str(payload.get("fullName") or "").strip()
    attendance = str(payload.get("attendance") or "").strip()
    meal_choice = str(payload.get("mealChoice") or "").strip()

    if not full_name:
        return JsonResponse({"ok": False, "error": "full_name_required"}, status=400)
    if attendance not in {RSVP.Attendance.YES, RSVP.Attendance.NO, RSVP.Attendance.MAYBE}:
        return JsonResponse({"ok": False, "error": "attendance_invalid"}, status=400)
    if meal_choice and meal_choice not in {RSVP.MealChoice.MEAT, RSVP.MealChoice.FISH}:
        return JsonResponse({"ok": False, "error": "meal_choice_invalid"}, status=400)

    obj = RSVP.objects.create(
        full_name=full_name,
        attendance=attendance,
        day_1=_get_bool(payload.get("days", {}).get("day1")),
        day_2=_get_bool(payload.get("days", {}).get("day2")),
        day_3=_get_bool(payload.get("days", {}).get("day3")),
        needs_transfer=_get_bool(payload.get("needsTransfer")),
        meal_choice=meal_choice,
        allergies=str(payload.get("allergies") or "").strip(),
        comment=str(payload.get("comment") or "").strip(),
    )

    return JsonResponse({"ok": True, "id": obj.id})
