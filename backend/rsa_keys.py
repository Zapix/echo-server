# -*- coding: utf-8 -*-
from typing import List
import rsa  # type: ignore
from mtpylon.crypto import KeyPair  # type: ignore


def get_rsa_keys(count: int = 2) -> List[KeyPair]:
    rsa_list = [
        rsa.newkeys(nbits=2048)
        for _ in range(count)
    ]

    return [
        KeyPair(
            public=public,
            private=private
        ) for (public, private) in rsa_list
    ]
