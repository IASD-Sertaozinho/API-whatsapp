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

import json


def get_backup(backup_url: str, weekday: str):
    with open(backup_url, "r") as file:
        backup = json.load(file)
    data = filter_by_weekday(backup, weekday)
    if not data:
        raise Exception("No data found")
    return data


def filter_by_weekday(file, weekday: str):
    filtered_data = list(filter(lambda item: item["weekday"] == weekday, file))
    return filtered_data[0] if filtered_data else None


class GetBackupMeditation:
    def __init__(self, backup_url: str, weekday: str):
        self.backup = get_backup(backup_url, weekday)

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
