
import rsa
import base64
import argparse

def discord_pubkey(fullname:str):
    nameSum = sum(base64.b64encode(fullname.encode()))
    # create keypair where e = the next prime number after the sum of the username
    return rsa.newkeys(nbits=2048,exponent=nameSum)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("fullname", help="The username + discriminator of the user to generate a key for")
    args = parser.parse_args()
    keys = discord_pubkey(args.fullname)
    # write the keys to discord_rsa and discord_rsa.pub
    with open("discord_rsa","wb") as f:
        f.write(keys[0].save_pkcs1())
    with open("discord_rsa.pub","wb") as f:
        f.write(keys[1].save_pkcs1())
