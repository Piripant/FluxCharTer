// Generated by CoffeeScript 1.10.0
(function() {
  var functions_index;

  functions_index = {
    "pi": "The constant of PI",
    "sin": "The sine of an angle",
    "cos": "The cosine of an angle",
    "tan": "The tangent of an angle",
    "abs": "The absolute value of a variable",
    "mod": "The module operator",
    "^": "The power operator",
    "input": "Prompts the user to input data",
    "output": "Prints the data"
  };

  this.PrintInstuctions = function() {
    var i, indexstr, key, len, ref;
    indexstr = "";
    ref = Object.keys(functions_index);
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      console.log(key);
      indexstr += key + " => " + functions_index[key] + "\n";
    }
    console.log(indexstr);
    return swal("Here is a list of all functions", indexstr);
  };

}).call(this);
