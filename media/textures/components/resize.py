from PIL import Image
import os
fold = "./hybrid/parallel_path_selector/"
coef = 10
for i in os.listdir(fold):
    print(i)
    if os.path.isfile(fold+i):
        img = Image.open(fold+i)
        img = img.resize(tuple([j * coef for j in img.size]), resample = Image.NEAREST)
        img.save(fold+i)
