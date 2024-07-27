from services.get_backup_meditation import GetBackupMeditation


class TestGetBackupMeditation:
    def __init__(self):
        pass

    def test_should_be_able_to_get_backup_meditation(self):
        # Given
        backup_url = '../../../backup/file.json'
        get_backup_meditation = GetBackupMeditation(backup_url, "Monday")

        # When
        weekday = get_backup_meditation.get_weekday()
        title = get_backup_meditation.get_title()
        content = get_backup_meditation.get_content()
        image = get_backup_meditation.get_image()
        meditation = get_backup_meditation.get_meditation()

        # Then
        assert weekday == "Monday"
        print("Weekday passed")
        assert title == "The title of the meditation"
        print("Title passed")
        assert content == "The content of the meditation"
        print("Content passed")
        assert image == "The image of the meditation"
        print("Image passed")
        assert meditation == "Mulher"


test = TestGetBackupMeditation()

test.test_should_be_able_to_get_backup_meditation()
