## Install python packages

Install packages on **Amazon Linux**.

https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/current-supported-versions.html

```
# build image
$ docker build . -t lambda_deps_builder:python3.6
# run pip install on amazonlinux
$ docker run --rm -v "$PWD":/wd lambda_deps_builder:python3.6 pip install -U -r requirements.txt -t ./lib
```
