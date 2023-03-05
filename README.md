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

## Implimentation
### User-to-user encryption
1. a user (`A`) wants to send a message to another user (`B`)
2. either a central server hosts a username -> public key database, or `A` and `B` exchange public keys (e.g. over DMs via Diffie-Hellman, etc.)
3. `A` encrypts the message with `B`'s public key and converts it to base64
4. `A` hashes the base64 message with SHA-256 and encrypts it with their private key, then converts it to base64.
5. The message is sent in the form:
```
DPE: <base64 encrypted message>
SIGNED: <base64 signature>
```
### Server / group chat
...

### Disadvantages / consequences
- the public key database is a single point of failure
- By including both a signature and an encrypted message, the full *discord* message is longer than it usually would be. Users are still limited to 2000 characters.
- I'm not sure how this will be implimented into server/group chat, but feel free to make a PR modifying README.md detailing your ideas under [Server / group chat](#server--group-chat).
