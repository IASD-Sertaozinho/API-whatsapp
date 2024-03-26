from services.get_meditation_from_web import GetMeditationFromWeb
from services.get_backup_meditation import GetBackupMeditation
from utils.rabbitmq import Rabbitmq


class EntryPoint:
    def __init__(self, get_backup_meditation: GetBackupMeditation, get_meditation_from_web: GetMeditationFromWeb):
        self.__rabbitmq = Rabbitmq(self.process_message)
        self.__get_backup_meditation = get_backup_meditation
        self.__get_meditation_from_web = get_meditation_from_web
        self.__url: str = ""

    def process_message(self, ch, method, properties, body):
        print(body)
        if body == b'get_common_meditation':
            self.__url = ""
        elif body == b'get_woman_meditation':
            self.__url = ""
        elif body == b'get_yong_meditation':
            self.__url = ""
        else: 
            print("Invalid message")
            return
        try:
            message = self.__get_meditation_from_web.execute(self.__url)
        except ValueError:
            message = self.__get_backup_meditation.get_message()
        self.__rabbitmq.publish((str(message)))

    def start(self):
        self.__rabbitmq.consuming()




