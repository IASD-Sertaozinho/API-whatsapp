"""
The backup should be a json file that contains the following structure:
[
    {
        "weekday: "Monday",
        "title": "The title of the meditation",
        "content": "The content of the meditation",
        image: "The image of the meditation",
        "meditation": "Mulher"
    },
    {}
    ...
]
"""
import calendar
from datetime import datetime
import json

from models.daily_meditation import DailyMeditation


def get_backup(backup_url: str, weekday: str):
    try:
        with open(backup_url, "r") as file:
            backup = json.load(file)
    except FileNotFoundError:
        raise Exception("Backup file not found")
    data = filter_by_weekday(backup, weekday)
    if not data:
        raise Exception("No data found")
    return data


def filter_by_weekday(file, weekday: str):
    filtered_data = list(filter(lambda item: item["weekday"] == weekday, file))
    return filtered_data[0] if filtered_data else None


class GetBackupMeditation:
    def __init__(self, backup_url: str):
        day_week = datetime.today().weekday()
        name_day_week = calendar.day_name[day_week]
        self.weekday = name_day_week
        self.backup = get_backup(backup_url, self.weekday)

    def get_weekday(self):
        return self.backup["weekday"]

    def get_title(self):
        return self.backup["title"]

    def get_content(self):
        return self.backup["content"]

    def get_image(self):
        return self.backup["image"]

    def get_meditation(self):
        return self.backup["meditation"]
    
    def get_message(self) -> DailyMeditation:
        return DailyMeditation(self.get_title(), self.get_image(), self.get_content(), datetime.today().strftime('%Y-%m-%d'))
