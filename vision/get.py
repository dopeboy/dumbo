import os

for i in range(1, 20):
  os.system("wget https://s3.amazonaws.com/dumbo-assets/tests/2015-collegeboard/test3/section3/q%d.png" % i)
