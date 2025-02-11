# Create a Jutge API Client
from jutge_api_client import JutgeApiClient
jutge = JutgeApiClient()

# Get all compilers and print their name and programming language
compilers = jutge.tables.get_compilers()
for id, compiler in compilers.items():
    print(f"{id}: '{compiler.name}' ({compiler.language})")
