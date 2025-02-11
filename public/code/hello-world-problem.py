# Import the Jutge API client
from jutge_api_client import JutgeApiClient

# Create a Jutge API client
jutge = JutgeApiClient()

# Get "Hello, world!" problem (P68688); print title and author 
problem = jutge.problems.get_problem("P68688_en")
print(problem.title)
print(problem.abstract_problem.author)

# print the English statement
statement = jutge.problems.get_text_statement("P68688_en")
print(statement)
