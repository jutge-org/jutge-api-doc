# Import the Jutge API client
import jutge_api_client as j

# Create a Jutge API client
jutge = j.JutgeApiClient()

# Get all compilers and print their name and programming language
compilers = jutge.tables.get_compilers()
for compiler_id, compiler in compilers.items():
    print(f"{compiler_id}: '{compiler.name}' ({compiler.language})")
