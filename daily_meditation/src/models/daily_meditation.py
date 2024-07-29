

class DailyMeditation:
    def __init__(self, title, image, content, date):
        self.title = title
        self.image = image
        self.content = content
        self.weekDay= str # YYYY-MM-DD
        self.to_dict = self.to_dict
    def __str__(self):
        return f"Title: {self.title}\nImage: {self.image}\nContent: {self.content}\nWeekDay: {self.weekDay}"

    def to_dict(self):
        return {
            "title": self.title,
            "image": self.image,
            "content": self.content,
            "weekDay": self.weekDay
        }
