import pandas as pd
import sys

# main
def main(dog_breads,name):
    
    sentences=[]
    for i in dog_breads:
        for status in ['running','sitting','standing']:
            
            str1=f'/imagine prompt: art deco style image of {i}, full body, {status}, no ground, white background'
            str2=f'/imagine prompt: an anime style portrait of {i}, full body, {status}, no ground, white background'
            str3=f'/imagine prompt: watercolor art portrait of {i}, full body, {status}, no ground, white background'
            str4=f'/imagine prompt: a vintage, funky illustration of {i}, full body, {status}, no ground, white background'
            str5=f'/imagine prompt: a {i}, fully body, pixar cartoon style,{status}, 3d rendering, ultra-high definition quality, no ground, white background.'
            str6=f'/imagine prompt: an illustration of {i}, in the style of Beatrix Potter, full body, {status}, no ground, background'
            str7=f'/imagine prompt: an illustration of {i}, in the style of hyper realistic oil painting, full body, {status}, no ground, background'
            str8=f'/imagine prompt: a realistic black and white illustration of {i}, full body, in the style of minimalism, coloring page for adults, thick lines, low detail, dark shading, no color. No grey scale or shadows, white background'
            sentences.append(str1)
            sentences.append(str2)
            sentences.append(str3)
            sentences.append(str4)
            sentences.append(str5)
            sentences.append(str6)
            sentences.append(str7)
            sentences.append(str8)
            
    pd.DataFrame(sentences).to_excel('example_'+name+'.xlsx',index=False)
dog_breads= sys.argv[1][1:-1].split(',')


name= sys.argv[2] 
    #dog_breads=['golden retriever','labrador retriever']
main(dog_breads,name)