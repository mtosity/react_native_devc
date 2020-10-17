a = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 3, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

validPoint = (point, r, matrix) => {
  if (point.x < 0 || point.y < 0 || point.x > 9 || point.y > 9) {
    return false;
  }
  if (matrix[point.x][point.y] === 2 || matrix[point.x][point.y] === 1) {
    return false;
  }

  for (i = 0; i < r.length; i++) {
    //use return in foreach didn't exit the function
    if (r[i].x === point.x && r[i].y === point.y) {
      return false;
    }
  }

  return true;
};

bfs = (start, end, matrix) => {
  let q = [];
  q.push(start); //queue
  let r = []; //result
  let haveNext = true;
  console.log(matrix);
  do {
    if (!haveNext) {
      //console.log('q', q);
      //console.log('r', r);
      if (q.length > 0) {
        while (r[r.length - 1].l >= q[q.length - 1].l) {
          r.pop();
        }
      } else {
        return [];
      }
      //r.pop()
    }

    cur = q.pop();
    r.push(cur);

    newPoint = [
      { x: cur.x + 1, y: cur.y, l: cur.l + 1 }, //right
      { x: cur.x - 1, y: cur.y, l: cur.l + 1 }, //left
      { x: cur.x, y: cur.y - 1, l: cur.l + 1 }, //down
      { x: cur.x, y: cur.y + 1, l: cur.l + 1 }
    ]; //up

    haveNext = false;
    dis_store = []; //distance to the end, proritize the shortest
    dis_sort = [];

    newPoint.forEach(p => {
      if (validPoint(p, r, matrix) != false) {
        //q.push(newPoint1);
        const d = Math.sqrt(
          (end.x - p.x) * (end.x - p.x) + (end.y - p.y) * (end.y - p.y)
        );
        dis_store.push(d);
        dis_sort.push(d);
        haveNext = true;
      } else {
        dis_store.push(100);
        dis_sort.push(100);
      }
    });

    if (haveNext) {
      dis_sort.sort();
      dis_sort.reverse();
      dis_sort.forEach((d_s, i) => {
        if (d_s != 100) {
          q.push(newPoint[dis_store.indexOf(d_s)]);
        }
      });
    }

    //console.log("r:", r);
  } while (r[r.length - 1].x != end.x || r[r.length - 1].y != end.y);

  r.pop();
  r.shift();

  return r;
};

//console.log(bfs({x: 2, y: 1}, {x: 3, y: 3}, a));

module.exports = bfs;
