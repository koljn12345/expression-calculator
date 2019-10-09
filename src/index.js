// function eval() {
//     // Do not use eval!!!
//     return;
// }


function  split (expr, operator)  {
    const result = [];
    let bracket = 0;
    let currentChunk = "";
    for (let i = 0; i < expr.length; ++i) {        
        if (expr[i] == '(') {
            bracket++;
        } else if (expr[i] == ')') {
            bracket--;
        }
        if (bracket == 0 && operator == expr[i]) {
            result.push(currentChunk);
            currentChunk = "";
        } else currentChunk += expr[i];
    }
    if (currentChunk != "") {
        result.push(currentChunk);
    }
    return result;
}

function parseDivisionExpression(expr) {
    CheckDivisionZero(expr);
    let NumbersStr=split(expr,'/');
    let currentNuber=NumbersStr.map(AtomNumber => {
        if(AtomNumber[0]=='(') {
            return parsePlusExpression(AtomNumber.substr(1, AtomNumber.length - 2)) ;            
        }
        else    
        return AtomNumber;        
    });      
    let result=currentNuber.reduce((val1,val2)=>parseFloat(val1) / parseFloat(val2));
    return result;
}
function parseMultiExpression(expr) {
    let NumbersStr=split(expr,'*');
    let currentNuber=NumbersStr.map(AtomNumber => parseDivisionExpression(AtomNumber));
    let result=currentNuber.reduce((val1,val2)=>parseFloat(val1) * parseFloat(val2));
    return result;
}
function parseMinusExpression(expr) {
    let NumbersStr=split(expr,'-');
    let currentNuber=NumbersStr.map(AtomNumber => parseMultiExpression(AtomNumber));
    let result=currentNuber.reduce((val1,val2)=>parseFloat(val1) - parseFloat(val2));
    return result;
}

function parsePlusExpression(expr) {
    let NumbersStr=split(expr,'+');
    let currentNuber=NumbersStr.map(AtomNumber => parseMinusExpression(AtomNumber));
    let result=currentNuber.reduce((val1,val2)=>parseFloat(val1) + parseFloat(val2));
    return result;
}

function CheckBreckets(expr) {
    let OpenBracket=0;
    let CloseBracket=0;
    expr.split('').map(value => {
        if(value=='(') OpenBracket++;
        if(value==')') CloseBracket++;
    });

    if((OpenBracket-CloseBracket)) 
    {
        throw new Error('ExpressionError: Brackets must be paired');
    }
}

function CheckDivisionZero(expr) {    
    if(expr[expr.indexOf(0)-1]=='/')
    throw new Error('TypeError: Devision by zero.');
}

function expressionCalculator(expr) {

    expr=expr.replace(/\s/g,'');
    CheckBreckets(expr);
    let result=parsePlusExpression(expr); 
    result=result;
    return result;
    
}
module.exports = {
    expressionCalculator
}