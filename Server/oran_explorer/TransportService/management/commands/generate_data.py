from django.core.management.base import BaseCommand
from TransportService.models import (
    VehicleLocation, Taxi, TaxiDriver, Tourist, TouristGuide, Bus, Train, Tram
)
import random


class Command(BaseCommand):
    help = 'Generate sample data for TransportService'

    def handle(self, *args, **kwargs):
        # Create vehicle location
        location = VehicleLocation.objects.create(
            latitude=random.uniform(32.0, 33.0),
            longitude=random.uniform(-1.0, 0.0)
        )


        # Create a tourist guide
        TouristGuide.objects.create(
            name="Mohame M",
            bio="Experienced guide with 7+ years in Oran.",
            languages_spoken="Arabic, French, English",
            rating=4.8,
            phone_number="0661123456",
            is_available=True,
            img="https://example.com/guide.jpg"
        )

        self.stdout.write(self.style.SUCCESS('Sample data generated successfully.'))
