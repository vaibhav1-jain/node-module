var calc=function(a,b,p)
{console.log("2");
if(a===""||b===""||p==="")
{
return "Please provide all parameters";
}
else
{
switch(p)
{
case '+':{
return a+b;
break;
}
case '-':{
return a-b;
break;
}
case '*':{
return a*b;
break;
}
case '/':{
return a/b;
break;
}
default:{return;}
}
}
}
exports.calc=calc; //very important line

var palindrome = function palindrome(str) {
	console.log("3");
 var len = str.length;
    for ( var i = 0; i < (len/2); i++ ) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

exports.palindrome = palindrome;