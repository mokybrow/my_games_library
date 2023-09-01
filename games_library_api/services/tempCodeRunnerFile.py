import re


def making_slug():
    s = "ПРивет №; я хочу насрать в строке    "
    s = re.sub(" +", " ", s)
    s.translate(None, r',.@#$ #;\/:*?"<>|')

    print(s.strip().replace(" ", "_"))


making_slug()
