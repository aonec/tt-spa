#!/bin/bash
echo GITHUB_LOGIN $GITHUB_LOGIN
echo Docker registry $2
echo Image name $1
echo Docker file $3
echo Docker image tags: $4
docker build . -t $1 --build-arg GITHUB_LOGIN=$GITHUB_LOGIN --build-arg GITHUB_TOKEN=$GITHUB_TOKEN -f $3
docker tag $1 $2/$1
if [ -z "$4" ]
then
	echo "\$4 is empty"
else
  docker tag $1 $2/$1:$4
fi
docker push $2/$1
if [ -z "$4" ]
then
	echo "\$4 is empty"
else
  docker push $2/$1:$4
fi