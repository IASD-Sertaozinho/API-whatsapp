import unittest

from get_meditation_from_web import GetMeditationFromWeb

class TestGetMeditationFromWeb(unittest.TestCase):
    def test_should_be_able_to_get_meditation_from_web(self):
        # Given
        url = 'https://mais.cpb.com.br/meditacao-da-mulher-2/'
        get_meditation = GetMeditationFromWeb()

        result = get_meditation.execute(url)
        # Then
        self.assertIsInstance(result.title, str)
        self.assertIsInstance(result.image, str)
        self.assertIsInstance(result.content, str)
        self.assertIsInstance(result.weekDay, str)

    def test_should_not_be_able_to_get_meditation_from_wrong_url(self):
        # Given
        url = 'https://mais.cpb.com.br/meditacao-da-mulher-21/'
        get_meditation = GetMeditationFromWeb()

        # When
        with self.assertRaises(ValueError):
            get_meditation.execute(url)
if __name__ == '__main__':
    unittest.main()