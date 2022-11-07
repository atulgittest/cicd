import hashlib


def encryption(password):
    result = hashlib.sha3_256(password.encode())
    return  result.hexdigest()