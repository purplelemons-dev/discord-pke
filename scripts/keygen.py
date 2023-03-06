
import rsa
import base64
import argparse
from math import sqrt
from hashlib import sha256

def next_prime(n:int):
    # return the next prime number after n
    if n % 2 == 0:
        n += 1
    while True:
        if all(n % i != 0 for i in range(3, int(sqrt(n)) + 1, 2)):
            return n
        n += 2

def discord_pubkey(id:str):
    nameHash = sha256(id.encode()).hexdigest()
    nameSum = sum(base64.b64encode(nameHash.encode()))
    # create keypair where e = the next prime number after the sum of the username
    nextSumPrime = next_prime(nameSum)
    return rsa.newkeys(nbits=2048,exponent=nextSumPrime)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("id", help="The discord ID of the user to generate a key for")
    parser.add_argument("-d", "--debug", help="Enable debug mode. Only use this if you know what you are doing, as it prints keys to the console.", action="store_true")
    args = parser.parse_args()
    keys = discord_pubkey(args.id)
    if args.debug:
        print("Public key:", keys[1])
        print("Private key:", keys[0])
    # write the keys to discord_rsa and discord_rsa.pub
    with open("discord_rsa","wb") as f:
        f.write(keys[0].save_pkcs1())
    with open("discord_rsa.pub","wb") as f:
        f.write(keys[1].save_pkcs1())
