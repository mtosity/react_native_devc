# React native fiding path algorithm
## Download
This project used expo, clone and then $ expo install <br/>
Run on your device: open expo app and scan this QR code <br/>
![alt text](./screenshot/download.png) <br/>
Or in this link: https://expo.io/@minhtamos/rn_bfs
## What it does?
Create a matrix with starting point and ending point and let the algorithm to find the path from start to end
## Algorithm used
BFS: Breadth-first search, prioritize the nearer one <br/>
Just one, will have some more ^^
## How to use?
You will see 10x10 square buttons <br/>
Click on them will change the status of the box <br/>
(None (can go to) -> Blocked (can not go to) -> Starting point -> Ending point) respectively <br/>
Click start to find the path from start to end <br/>
Click reset to reset everything to none status <br/>
Click clear result to set the path (the blue one) to none status <br/>
## Some picture of it
Most of the time will work just fine <br/>
![alt text](./screenshot/ok.png) <br/>
But something will be like this <br/>
![alt text](./screenshot/fail.png) <br/>

