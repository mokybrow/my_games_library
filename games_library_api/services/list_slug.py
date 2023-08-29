import re

import transliterate


async def making_slug(s: str) -> str:
    s = re.sub("[^a-zA-ZА-Яа-я]", " ", s)
    s = re.sub(" +", " ", s)
    s = s.strip()
    s = s.replace(" ", "_")
    s = transliterate.translit(s, reversed=True)
    return s
