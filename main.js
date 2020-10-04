var td= document.querySelector('#board')
var question = document.getElementById('question')
var answer = document.getElementById('answer')
var ans
var calculated = false
var operator = ['+','-','*','/']
const clearButton = document.getElementById('clear')
const removeButton = document.getElementById('remove')
const equalsButton = document.getElementById('calculate')
clearButton.addEventListener('click',clrscr)
removeButton.addEventListener('click',remove)
equalsButton.addEventListener('click',calc)
td.addEventListener('click',function(e){
    if(e.target.className=='number'){
        if(calculated)
            clrscr()
        if(e.target.id == 'decimal')
        {
            const ques = question.innerHTML.split(' ')
            if(ques[ques.length-1].includes('.')) return
        }
        answer.innerHTML= ""
        question.innerHTML+=e.target.innerHTML
    }
    if(e.target.className=='operator'){
        if(calculated)
        {
            question.innerHTML = answer.innerHTML
            answer.innerHTML = ''
            calculated = false
        }
        str=question.innerHTML
        if(str[str.length-1] != " " && str.length!=0)
            question.innerHTML += " " + e.target.innerHTML + " "
    }
})
function clrscr()
{
    question.innerHTML="";
    answer.innerHTML="";
    calculated = false
}
function remove(){
    var str = question.innerHTML
    if(str[str.length-1]==" ")
        question.innerHTML= str.slice(0,-3);
    else
        question.innerHTML= str.slice(0,-1);
    answer.innerHTML = ''
    calculated = false
}
function calc()
{
    var str = question.innerHTML
    if(str[str.length-1]==" "){
        answer.innerHTML= "Wrong Syntax"
        return;
    }
    nums = str.split(" ")
    ans = evaluate(nums)
    answer.innerHTML = ans
    calculated = true
}
function isoperator(ch){
    switch(ch){
        case '+':
        case '-':
        case '*':
        case '÷': return true
        default : return false
    }
}
function result(opr,num1,num2){
    switch(opr){
        case '+' : return num1+num2;
        case '-' : return num1-num2;
        case '*' : return num1*num2;
        case '÷' : if(num2!=0)
                    return num1/num2;
                return "Infinity"
    }
}
function precendence(ch)
{
    switch(ch){
        case '*' :
        case '÷' : return 2;
        case '-' :
        case '+' : return 1;
        default: return 0;
    }
}
function evaluate(nums)
{   nums.push(')')
    var postfix=[]
    var stack=['(']

    for(var i=0;i<nums.length;i++)
    {
        if(isoperator(nums[i])){
            while(stack[stack.lenght-1]!='(' && precendence(stack[stack.length-1])>=precendence(nums[i]))
                postfix.push(stack.pop())
            stack.push(nums[i])
        }
        else if(nums[i]==')')
        {
            while(stack[stack.length-1]!='(')
            {
                postfix.push(stack.pop())
            }
			stack.pop();
        }
        else{
            postfix.push(nums[i])
        }
    }
    return evaluatePostfix(postfix)
}
function evaluatePostfix(postfix)
{
    var ans =[]
    for(var i=0;i<postfix.length;i++)
    {
        if(isoperator(postfix[i]))
        {
            let num1=parseFloat(ans.pop())
            let num2=parseFloat(ans.pop())
            ans.push(result(postfix[i],num2,num1))
        }
        else
        {
            ans.push(postfix[i])
        }
    }
    return ans[0]
}