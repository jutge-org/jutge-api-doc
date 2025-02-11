#!/usr/bin/env python3

"""
This is a tutorial script that shows how to use the Jutge API client in Python.

Full reference documentation is available at https://api.jutge.org
"""

# Import some useful libraries
import webbrowser
import os
from rich import print
from rich.prompt import Prompt

# Import the Jutge API client
import jutge_api_client as j

# Create a Jutge API client
jutge = j.JutgeApiClient()

# Get a fortune cookie
print(jutge.misc.get_fortune())

# Get the current time in the server and print one of its attributes
time = jutge.misc.get_time()
print(time.full_time)
print()

# Get the homepage stats and print them
stats = jutge.misc.get_homepage_stats()
print(f"users: {stats.users}, problems: {stats.problems}, submissions: {stats.submissions}")
print()

# Download the Jutge logo, save it to a file and show it in the browser
logo = jutge.misc.get_logo()
logo.write("logo.png")
webbrowser.open(f"file://{os.path.realpath('logo.png')}")
print("Logo saved to logo.png and opened in the browser")
print()

# Get all compilers and print their name and programming language
compilers = jutge.tables.get_compilers()
for compiler_id, compiler in compilers.items():
    print(f"{compiler_id}: '{compiler.name}' ({compiler.language})")
print()

# Get P68688 (Hello, world!) problem and print its title, author and English statement.
problem = jutge.problems.get_problem("P68688_en")
print(problem.title)
print(problem.abstract_problem.author)
statement = jutge.problems.get_text_statement("P68688_en")
print(statement)
print()

# All previous functions where public, but in order to access
# other functions, we need to login using Jutge.org credentials.

print('Please login to Jutge.org to access more functions')
email = Prompt.ask("Enter your email")
password = Prompt.ask("Enter your password", password=True)
try:
    jutge.login(email, password)
except Exception:
    print("Invalid credentials")
    exit()
print()

# Get user's name and uid in the profile.
profile = jutge.student.profile.get()
print(profile.name)
print(profile.user_uid)
print()

# All authenticated users are students and can use the student module.
# There are other modules for different roles, such as admin, instructor, etc.

# Get all problem statuses, filter those that are accepeted and print the first 8 in alphabetical order.
statuses = jutge.student.statuses.get_all()
accepteds = []
for problem_nm, status in statuses.items():
    if status.status == "accepted":
        accepteds.append(problem_nm)
print(sorted(accepteds)[:8])
print()

# Get the status of P68688
status = jutge.student.statuses.get_for_abstract_problem("P68688")
print(status)
print()

# All types are defined in the client and include basic types such as
# int, float, str, bool,... structured types such as list and dict,
# and complex types such as TTime, TAbstractStatus, which are
# pydantic classes.
# Therefore it is easy to import and export them from and to
# other formats such as JSON and YAML.

# Print the status of P68688 in JSON format:
print(status.model_dump_json())
print()

# Print the status of P68688 in Python format:
print(status.model_dump())
print()

# Logging out is not necessary, but it is advisable.
jutge.logout()
print()

# The client API is type-safe and provides autocompletion and documentation.
# Use modern IDEs such as VSCode to take advantage of it.
# In addition, the server API is also type-safe and validates all input and output data.
#
# See the full doc at https://api.jutge.org
