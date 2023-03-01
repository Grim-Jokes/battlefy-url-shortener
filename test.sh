DATA='{ "url": "http://www.google.ca" }'
HOST="https://eh7bg8n7ek.execute-api.us-east-1.amazonaws.com/prod/"

echo "curl -X \"POST\" \"${HOST}\" -d \"${DATA}\""
SHORTLINK=$(curl -X "POST" "${HOST}" -d "${DATA}" | jq -r ".shortLink") 
echo ""

echo "curl -L ${HOST}${SHORTLINK}"
curl -L "${HOST}${SHORTLINK}"