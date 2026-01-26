import requests
import os

url = "https://media.licdn.com/dms/image/v2/C4E0BAQHYNzg6qqiq1w/company-logo_200_200/company-logo_200_200/0/1631314734763?e=2147483647&v=beta&t=IzyYqaKZpFeao1qK8kfoNZX1NsBPnUrXSAE2Yb3EXzg"
output_path = "public/assets/img/icons/universal_mind.png"

try:
    response = requests.get(url)
    if response.status_code == 200:
        with open(output_path, 'wb') as f:
            f.write(response.content)
        print("Successfully downloaded universal_mind.png")
    else:
        print(f"Failed to download: {response.status_code}")
except Exception as e:
    print(f"Error: {e}")
