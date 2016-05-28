import json

db1 = json.load(open("ocr.json", "r"))
db = db1 * 20


def bag(text):
    stripped = filter(None, map(lambda x: x.strip(), text.replace("\n",  " ").split(" ")))
    return set(stripped)

def compare(set1, set2):
    common = []
    i = 0
    for s in set2:
        if s in set1:
            i += 1
            common.append(s)

    print(common)
    return i

pics =  ["""
What are the solutions to 3x2 + 12x + 6 0 ?
A) x=-2±/2
130
C) x=-6±N2
D) x=-6±6-1
2
""",

"""

at are the solutions to 3x2+ 12x+ 6 = 0 ?
A) x=-2±/2
30
B) x=-2±390
C) x=-6±/2
---6 ±
D) x=-6±6-1
2
""",

"""

at are the solutions to 3x4 12x 6 0
V30
C) x 6 t V2
D) x 6 t 6V
2
"""
]


for pic in pics:
    print("PICTURE " + "#" * 100)
    pic_bag = bag(pic)
    print("Photo: %s" % pic_bag)

    for ocr in db:
        text_bag = bag(ocr["text"])
        #print("Text: %s" % text_bag)
        score = compare(text_bag, pic_bag)
        print("%s scored %s" % (ocr["image"], score))
        #print("####################################")
