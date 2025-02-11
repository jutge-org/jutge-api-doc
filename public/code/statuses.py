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

# Get all problem statuses, filter those that are accepted... 
statuses = jutge.student.statuses.get_all()
accepted = []
for problem_nm, status in statuses.items():
    if status.status == "accepted":
        accepted.append(problem_nm)

# ...and print the first 8 in alphabetical order.
print(sorted(accepted)[:8])
