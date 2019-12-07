## Install python packages

Install packages on **Amazon Linux**.

- https://github.com/lambci/docker-lambda
- https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/current-supported-versions.html

```
# install dependencies into ./lib via container
$ docker run --rm -v "$PWD":/wd -w /wd lambci/lambda:build-python3.7 pip install -U -r requirements.txt -t ./lib
```
