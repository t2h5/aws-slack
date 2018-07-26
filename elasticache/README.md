## Install python packages

Install packages on **Amazon Linux (2017.03)**.

https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/current-supported-versions.html

```
# build image
$ docker build . -t lambda-base:python3.6
# run pip install on amazonlinux
$ docker run --rm -v "$PWD":/wd lambda-base:python3.6 pip install -U -r requirements.txt -t ./lib
```
