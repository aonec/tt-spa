#!/bin/bash
BuildVersion=$(grep -oP '(?<="version": ").*?(?=",)' $1)
echo Image Version $BuildVersion
echo GITHUB_LOGIN $GITHUB_LOGIN
echo Project path $1
echo Docker registry $3
echo Image name $2
echo Docker file $4
echo Docker image tags: $BuildVersion, $5
docker build . -t $2:${BuildVersion} --build-arg GITHUB_LOGIN=$GITHUB_LOGIN --build-arg GITHUB_TOKEN=$GITHUB_TOKEN -f $4
docker tag $2:${BuildVersion} $3/$2:${BuildVersion}
if [ -z "$5" ]
then
	echo "\$5 is empty"
else
  docker tag $2:${BuildVersion} $3/$2:$5
fi
docker push $3/$2:${BuildVersion}
if [ -z "$5" ]
then
	echo "\$5 is empty"
else
  docker push $3/$2:$5
fi