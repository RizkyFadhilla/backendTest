class Controller {
  static async tes1(req, res) {
    try {
      let { input } = req.body;
      if (input == 0) {
        res.send([]);
      } else if (input == 1) {
        res.send([1]);
      } else if (input == 2) {
        res.send([1, 1]);
      } else {
        let series = new Array(input);
        series.fill(0);
        series[0] = 1;
        series[1] = 1;
        let next;
        let n1 = 2;
        let n2 = 3;
        for (let i = 2; i < input; i++) {
          if (n1 % 2 == 0) {
            next = n1 + n2;
            n1 = n2;
            n2 = next;
          }
          if (n1 % 2 !== 0) {
            series[i] = n1;
            next = n1 + n2;
            n1 = n2;
            n2 = next;
          }
        }
        series.sort((a, b) => b - a);
        res.send(series); 
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async tes2(req, res) {
    try {
      console.log(req.body);
      let string = req.body.input;
      let splitInput = string.split("");
      // let dictionary = "abcdefghijklmnopqrstuvwxyz";
      // let splitDictionary = dictionary.split("")
      let count = 0;
      let tempCount = 0;
      let tempArr = [];
      //Mencari Karakter Irisian
      for (let a = 0; a < splitInput.length; a++) {
        if (
          splitInput.indexOf(splitInput[a]) !==
          splitInput.lastIndexOf(splitInput[a])
        ) {
          if (!tempArr.includes(splitInput[a])) {
            tempArr.push(splitInput[a]);
          }
        }
      }
      //kalau tidak ada irisan
      if (tempArr.length == 0) {
        for (let i = 0; i < splitInput.length; i++) {
          count++;
        }
      }
      // kalau ada irisan
      else {
        for (let i = 0; i < splitInput.length; i++) {
          if (!tempArr.includes(splitInput[i])) {
            console.log(tempCount);
            tempCount++;
          } else {
            if (count < tempCount) {
              count = tempCount;
              tempCount = 0;
            }
          }
        }
      }
      res.send({ count });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
