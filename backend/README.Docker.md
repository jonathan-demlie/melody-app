# My Melody-App Node.js Backend Docker Image

This Docker image contains my Melody-app Node.js backend application.

## Prerequisites

Make sure you have Docker installed on your system. You can download and install Docker from [https://www.docker.com/get-started](https://www.docker.com/get-started).

## Usage

To use this Docker image, follow these steps:

1. Open your terminal.
2. Run the following command to pull the Docker image:

    ```bash
    docker pull yonatanzleader/backend:latest
    ```
    Image Size - 150MB

3. Once the image is downloaded, you can run a container using the following command:

    ```bash
    docker run -p 5000:5000 yonatanzleader/backend:latest
    OR
    sudo docker run --env-file .env  -p 5000:5000 backend

    ```

   This will run the backend application inside a Docker container, and you can access it at [http://localhost:5000](http://localhost:5000).

## Support

If you encounter any issues or have questions, feel free to open an issue on [GitHub](https://github.com/jonathan-demlie/melody-app).
