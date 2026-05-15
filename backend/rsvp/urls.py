from django.urls import path

from .views import rsvp_submit

urlpatterns = [
    path("rsvp/", rsvp_submit, name="rsvp_submit"),
]

