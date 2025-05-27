# cd build

# if ! lsof -i :$PORT > /dev/null; then
#     echo "Starting"
#     http-server > server.log 2>&1 &
# fi

# cd ../

if ! lsof -i :$PORT > /dev/null; then
    echo "Starting"
    npm run deploy > server.log 2>&1 &
fi