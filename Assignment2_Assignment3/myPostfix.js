var operators = ["*", "/", "+", "-", "^"];
var parens = ["(", ")"];

function calculatePostfix()
{
  var infix = document.getElementById("inputEq").value;
  var tokens = [];
  for (var i = 0; i < infix.length; i++){
    if(infix[i] != " "){
      tokens[tokens.length] = infix[i];
    }
  }
  getPostfix(tokens);

}

function isOperator(t) {
    if (operators.indexOf(t) >= 0) {
        return true;
    }
    return false;
}

function isPrecGreater(a, b) {
    var pn1 = 1;
    var pn2 = 1;
    if (a == "^") {
        pn1 = 3;
    }
    if (b == "^") {
        pn2 = 3;
    }
    if (a == "*" || a == "/") {
        pn1 = 2;
    }
    if (b == "*" || b == "/") {
        pn2 = 2;
    }
    console.log(pn1, pn2);
    if (pn1 >= pn2) {
        return true;
    }
    return false;
}

var operations = {
    "+": function(a, b) {
        return a + b;
    },
    "-": function(a, b) {
        return a - b;
    },
    "*": function(a, b) {
        return a * b;
    },
    "/": function(a, b) {
        return a / b;
    },
    "^": function(a, b) {
        return Math.pow(a, b);
    }
};


function postfixResult(postfix) {

  var stack = new Stack();
  var ch; // current char

  for (var k = 0, length = postfix.length; k < length;  k++) {

    ch = postfix[k];


    if (/\d/.test(ch))
      stack.push(ch);


    else if (isOperator(ch)) {

      var b = stack.pop();
      var a = stack.pop();
      a = parseInt(a);
      b = parseInt(b);


      var value = operations[ch](a,b);
      console.log(value);
      stack.push(value);

    }

  }

  if (stack.length > 1)
    throw "ParseError: " + postfix + ", stack: " + stack;

  return stack.stackToString();

}

function getPostfix (infix) {
    var stack = new Stack();
    var postfix = new Stack();
    var infixLength = infix.length;
    document.getElementById('visual').innerHTML = '';

    for (var i = 0; i < infix.length; i++) {

        var currentScan = infix[i];

        if (currentScan === '(') {
            stack.push(currentScan);
        } else if (currentScan === ')') {
            while(stack.getTop() !== '(') {
                postfix.push(stack.pop());
            }
            stack.pop();
        }
        else {
            if (isOperator(currentScan)) {
                var top = stack.getTop();
                if (top !== null) {
                    while(top && isPrecGreater(top, currentScan)) {
                        postfix.push(stack.pop());
                        top = stack.getTop();
                    }
                    stack.push(currentScan);
                }
                else {
                    stack.push(currentScan);
                }
            }
            else {
                postfix.push(currentScan);
            }
            updateVisualization(i, infix, postfix);
        }

    }
    var top = stack.getTop();

    if (top !== null) {
        document.getElementById('visual').innerHTML += "<h1> Poping stack....</h1>";
        while(top){
            postfix.push(stack.pop());
            top = stack.getTop();
        }
    }
    updateVisualization(i,infix,postfix);
    document.getElementById('visual').innerHTML += "<h1> Result: " + postfix.stackToString() + "</h1><hr>" +
     "<h1> Evaluation: " + postfixResult(postfix.stackToString()) + "</h1><hr>";
    var infixExp = document.getElementById("inputEq").value;
    console.log(postfix.stackToString());
    console.log(postfixResult(postfix.stackToString()));
    return postfix._storage;
}

function allClear()
{
  document.getElementById("visual").innerHTML = "";
  document.getElementById("inputEq").value = "";
}

function updateVisualization(step, tokens, postfix) {

    var tokenStack = new Stack();
    // tokenStack = tokens;

    var outS = "<hr><h1>Step " + (step + 1) + "</h1>";
    //update infix
    outS += "<div>";
    var infix = document.getElementById("inputEq").value;
    outS += "<h2>Infix:</h2>";
    for (var i = 0; i < tokens.length; i++) {
        if (i == step) {
            outS += "<span class='smallBox'><b>" + tokens[i] + "</b></span>";
        } else {
            outS += "<span class='smallBox'>" + tokens[i] + "</span>";
        }
    }
    outS += "</div>";
    //update stack
    tokens = [];
    outS += "<div>";
    outS += "<h2>Stack:</h2>";
    for (var i = 0; i < tokens.length; i++) {
        outS += "<span class='smallBox'>" + tokens[i] + "</span>";
    }
    outS += "<span class='smallBox'><b>&lt;-</b></span>";
    outS += "</div>";
    //update postfix postfix
    tokens = postfix.stackToString();
    outS += "<div>";
    outS += "<h2>Postfix:</h2>";
    for (var i = 0; i < tokens.length; i++) {
        if (i == step) {
            outS += "<span class='smallBox'><b>" + tokens[i] + "</b></span>";
        } else {
            outS += "<span class='smallBox'>" + tokens[i] + "</span>";
        }
    }
    outS += "</div>";
    document.getElementById("visual").innerHTML += outS;
}





/**
 * Stack implementation
 */
function Stack() {
    this._size = 0;
    this._storage = {};
}

Stack.prototype = {
    push: function(data) {
        var size = ++this._size;
        this._storage[size] = data;
    },
    pop: function() {
        var size = this._size;
        var deletedData;

        if (size) {
            deletedData = this._storage[size];

            delete this._storage[size];
            this._size--;

            return deletedData;
        }
    },
    getTop: function() {
        return this._storage[this._size];
    },
    last: function() {
        return this._storage[1];
    },
    length: function() {
        return this._size;
    },
    stackToString: function () {

        var retString = '';

        for (var i in this._storage) {

            retString += this._storage[i];
        }
        return retString.trim();

    },
    toArray: function () {
        var retArr = [];

        for (var i in this._storage) {

            retArr.push(this._storage[i]);
        }
        return retArr;
    }
};
