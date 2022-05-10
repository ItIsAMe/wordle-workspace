f = open('/Users/anthonydooley/Desktop/untitled folder/words.txt','r')
o = open('/Users/anthonydooley/Desktop/untitled folder/output.txt','w')

for x in f:
    o.write("(\'"+x.strip('\n')+"\'),\n")
