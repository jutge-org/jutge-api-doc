import os
import time
from jutge_api_client import JutgeApiClient
from datetime import datetime

# Create a Jutge API Client
jutge = JutgeApiClient()

# Login getting credentials from the environment
email = os.environ.get("JUTGE_EMAIL")
password = os.environ.get("JUTGE_PASSWORD")
jutge.login(email, password)

# Prepare submission
problem_id = "P68688_ca"
file = open("P68688.cc", "r")
nowDate = datetime.today().strftime("%d/%m/%Y")
nowTime = datetime.today().strftime("%H:%M:%S")
submitted_data = {
    "compiler_id": "P1++",
    "problem_id": problem_id,
    "annotation": f"Sent through the API on {nowDate} at {nowTime}",
}

# Submit!
submission = jutge.student.submissions.submit(
    submitted_data,
    file,
)

# Wait for verdict
veredict = None
while veredict is None:
    time.sleep(1)
    state = jutge.student.submissions.get(
        problem_id,
        submission.submission_id,
    )
    if state.state == "done":
        veredict = state.veredict

# Show it!
print(f"Verdict: {veredict}")
