from jutge_api_client import JutgeApiClient

# Create a Jutge API client
jutge = JutgeApiClient()

# Get the server time
time = jutge.misc.get_time()
print(time.full_time)
