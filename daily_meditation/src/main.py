
from controller.entry_point import EntryPoint
from services.get_backup_meditation import GetBackupMeditation
from services.get_meditation_from_web import GetMeditationFromWeb


def main():
    backup_url = "src/backup/file.json"
    get_backup_meditation = GetBackupMeditation(backup_url)
    get_meditation_from_web = GetMeditationFromWeb()
    controller = EntryPoint(get_backup_meditation, get_meditation_from_web)
    controller.start()


if __name__ == '__main__':
    main()