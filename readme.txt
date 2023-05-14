To avoid CORS, use the below command: 

chrome.exe --allow-file-access-from-files
What is this: live-server --cors


How to push a local project to a remote github repo:
1- create the repo on github
2- copy the https url 
--Now in the local:
1-git remote add <name> <url> / git remote add origin <remote_url>
2-commit all your code with git commit -m <message>
3-git push 

config file in .git


Go to the developer tools (F12 in the browser), then select the three dots in the upper right corner, and go to Settings.

Then, look for Sources, and disable the options:

"Enable JavaScript source maps"
"Enable CSS source maps"