from rich.prompt import Prompt   # pip install rich
from jutge_api_client import JutgeApiClient

# Create a Jutge API Client
jutge = JutgeApiClient()

# Ask for email and password on the terminal
email = Prompt.ask("Enter your email")
password = Prompt.ask("Enter your password", password=True)
try:
    jutge.login(email, password)
except Exception:
    print("Invalid credentials")
    exit(1)

# Get user's name and uid in the profile.
profile = jutge.student.profile.get()
print(profile.name)
print(profile.user_uid)
