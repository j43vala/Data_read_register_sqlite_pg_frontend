import os
from typing import List
from requests import Response, post
from flask_mail import Mail
mail = Mail()

FAILED_LOAD_EMAIL = "Failed to load Mail."
ERROR_SENDING_EMAIL = "Error in sending confirmation email, user registration failed."


class MailException(Exception):
    def __init__(self, message: str):
        super().__init__(message)


class Mailgun:
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME", None)
    MAIL_PORT = os.environ.get("MAIL_PORT", None)

    FROM_TITLE = "Stores REST API"
    FROM_EMAIL = f"do-not-reply@{MAIL_PORT}"

    @classmethod
    def send_email(
        cls, email: List[str], subject: str, text: str, html: str
    ) -> Response:
        if cls.MAIL_USERNAME is None:
            raise MailException(FAILED_LOAD_EMAIL)

        # if cls.MAILGUN_DOMAIN is None:
        #     raise MailException(FAILED_LOAD_DOMAIN)

        response = post(
            # f"https://api.mailgun.net/v3/{cls.MAILGUN_DOMAIN}/messages",
            # auth=("api", cls.MAILGUN_API_KEY),
            data={
                "from": f"{cls.FROM_TITLE} <{cls.FROM_EMAIL}>",
                "to": email,
                "subject": subject,
                "text": text,
                "html": html,
            },
        )
        print(response)
        if response.status_code != 200:
            raise MailException(ERROR_SENDING_EMAIL)

        return response
