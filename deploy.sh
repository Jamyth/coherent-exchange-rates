#!/bin/sh
IMAGE_NAME="jamyth0712/crypto-exchange-rate"
CONTAINER_NAME="crypto-exchange-rate"
SITE_DOMAIN="exchange-rate.jamyth.com"

build_application() {
    echo ">>> Running pnpm build <<<"
    pnpm build
    echo ">>> Pnpm Build Complete <<<"
}

build_docker_image() {
    echo ">>> Building Docker Image -- $IMAGE_NAME"
    docker image build -t $IMAGE_NAME .
    echo ">>> Docker Image Built <<<"
}

upload_image() {
    echo ">>> Uploading $IMAGE_NAME to DockerHub <<<"
    docker push $IMAGE_NAME
    echo ">>> Image Uploaded <<<"
}

deploy() {
    ssh $JAMYTH_REMOTE_SERVER << EOF
        docker pull $IMAGE_NAME
        docker container rm -f $CONTAINER_NAME
        docker run -d --name $CONTAINER_NAME -p 80 --net env-proxy -e VIRTUAL_HOST=$SITE_DOMAIN $IMAGE_NAME
EOF
}

set -e
build_application
build_docker_image
upload_image
deploy

echo ">>> Deploy Script Done <<<"