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

        # Create a tourist
        tourist = Tourist.objects.create(
            name="Sohaib ",
            nationality="Canadian",
            passport_number="P1245454345678",
            credits=150.00
        )

        # Create a bus
        bus = Bus.objects.create(
            license_plate="BUS1jsssgk23",
            status="in_service",
            location=VehicleLocation.objects.create(
                latitude=random.uniform(32.0, 33.0),
                longitude=random.uniform(32.0, 33.0),
            )
        )

        # Create a train
        train = Train.objects.create(
            license_plate="TRAINkjfd456",
            status="delayed",
            location=VehicleLocation.objects.create(
                latitude=random.uniform(32.0, 33.0),
                longitude=random.uniform(32.0, 33.0),
            )
        )

        # Create a tram
        tram = Tram.objects.create(
            license_plate="TRAMhjd789",
            status="in_service",
            location=VehicleLocation.objects.create(
                latitude=random.uniform(32.0, 33.0),
                longitude=random.uniform(32.0, 33.0),
            )
        )

        # Create a taxi
        taxi = Taxi.objects.create(
            license_plate="TAXIjlkj001",
            status="in_service",
            location=VehicleLocation.objects.create(
                latitude=random.uniform(32.0, 33.0),
                longitude=random.uniform(32.0, 33.0),
            ),
            driver_name="ishaq.",
            phone_number="0771234567",
            car_model="Toyota Prius",
            color="Yellow"
        )

        # Create a taxi driver
        TaxiDriver.objects.create(
            name="hatem",
            taxi=taxi,
            phone_number="0771234567",
            license_number="LIC98hkk7654"
        )

        # Create a tourist guide
        TouristGuide.objects.create(
            name="Asma L.",
            bio="Experienced guide with 5+ years in Oran.",
            languages_spoken="Arabic, French, English",
            rating=4.8,
            phone_number="0661123456",
            is_available=True,
            img="https://example.com/guide.jpg"
        )

        self.stdout.write(self.style.SUCCESS('Sample data generated successfully.'))
