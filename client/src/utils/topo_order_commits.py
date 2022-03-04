import os
import sys

def find_git():
    path = os.getcwd() 

    while (path != os.path.dirname(path)):  # if not at root
        if (os.path.isdir(path + '/.git')):
            return os.path.join(path, '.git')
        
        path = os.path.dirname(path)
            
    sys.exit("Not inside a Git repository")

if __name__ == "__main__":
    print(find_git())