FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy all files to the container
COPY . .

# Cloud Run injects the PORT environment variable, so we read it
CMD ["sh", "-c", "python3 -m http.server ${PORT:-8080}"]
