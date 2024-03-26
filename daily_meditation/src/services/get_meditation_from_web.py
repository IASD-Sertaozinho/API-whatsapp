from datetime import datetime
import re
from bs4 import BeautifulSoup
import requests
import calendar


from models.daily_meditation import DailyMeditation

# Css class
TEXT_TITLE_CLASS = "mdl-card__title-text"
TEXT_BODY_CLASS = "mdl-card__supporting-text"
IMAGE_CLASS = "mdl-card__media"

class GetMeditationFromWeb:

    def execute(self, url: str) -> DailyMeditation:
        """
        Retrieves the meditation content from the provided URL.

        Args:
            url (str): The URL to fetch the meditation content from.

        Returns:
            dict: A dictionary containing the title, body, and image link of the meditation content.

        Raises:
            ValueError: If the URL is invalid or any of the required elements are missing.

        """

        response = requests.get(url)
        html_content = response.text

        # Parse HTML content
        soup = BeautifulSoup(html_content, 'html.parser')

        # Extract Title
        text_title = soup.find('h2', class_=TEXT_TITLE_CLASS)

        # Extract Body
        text_body = soup.find('div', class_=TEXT_BODY_CLASS)

        # Extract Image
        image = soup.find('div', class_=IMAGE_CLASS)

        if(image is None or text_title is None or text_body is None):
            raise ValueError("Invalid URL")

        # Parse Image url
        pattern = r'url\((.*?)\)'
        matches = re.findall(pattern, str(image))
        image_link = matches[0]

        # If any of the elements are missing, raise an error
        if(image is None or text_title is None or text_body is None):
            raise ValueError("Invalid URL")
        
        day_week = datetime.today().weekday()
        name_day_week = calendar.day_name[day_week]

        
        meditation = DailyMeditation(text_title.get_text(), image_link, text_body.get_text().strip(), name_day_week)


        return meditation