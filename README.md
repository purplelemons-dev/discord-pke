# Discord Public Key Encryption

thing

## Installation
```
pip install -r requirements.txt
```

## Purpose
when directly communicating with someone, discord stores your messages in plaintext. this is bad.

additionally, you can sign messages (e.g. the hash of an image/video) with your private key to verify that you sent them.

## Help
```
usage: keygen.py [-h] fullname

positional arguments:
  fullname    The username + discriminator of the user to generate a key for

options:
  -h, --help  show this help message and exit
```
