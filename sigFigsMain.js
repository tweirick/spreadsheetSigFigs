


function countSigFigs(number)
{  
    var number_str = number.toString();


    //First Non-Zero
    //Decimal
    var past_decimal  = false;
    var first_nonzero = false;
    var sigfig_cnt = 0;
    

    for (i=0; i < number_str.length; i++)
    {  
        
        if (number_str[i] != "." & number_str[i] != "0") { 
            first_nonzero = true;
        }
        

        if (number_str[i] == ".") {
            past_decimal = true;
        }
        else {
                
            if (first_nonzero) {
                sigfig_cnt++;
            }
        }
         
    }
    return sigfig_cnt;
}


console.log( countSigFigs("0.00052") ) ;


function decimalSigFigCnt(s,isIntBool)
{
  //s is a string and isIntBool is an int
  //where 1 is true and 0 is false
  s=s+""
  if(isIntBool==1)
  {
     return s.length
  }   
  else
  {
     s = stripZeros(s)
     return s.length  
  }
}


function stripZeros(n)//where in is a string
{
   n=n+""//convert n to string is not allready string.
   while(n.charAt(0)=="0" && n.length!=0)
   {
      n=n.slice(1,n.length)
   }//POSTCOND: string starts with a decimal or significant number.
   return n
}

function stripUntil(n)//where in is a string
{
   n=n+""//convert n to string is not allready string.
   while(n.charAt(0)!="." && n.length!=0) 
   {
      n=n.slice(1,n.length)
   }
   //POSTCOND: string starts with a decimal or significant number.
   n=n.slice(1,n.length)
   return n
}




function outputToSigFig(number,toXplaces)
{
    number = number+''
    number = parseFloat(number)  
    number = number.toExponential(10)+""
    return number
    //3.4500000000e+2
    if(number.charAt(0)!="0")
    {
        return number
    }
    else
    {
       i=0
       rtnS=""
       while(number.charAt(0)!="e" && i<toXplaces) 
       {
          rtnS = rtnS+ number.charAt(0)
          number=number.slice(1,number.length)
          i=i+1
       }
       if(number.charAt(0)=="e" && i<toXplaces)
       {
          rtnS = rtnS+"0"
          i=i+1
       }
       
    }
    return number
}

function setCharAt(str,index,chr) 
{
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}


function addOneToEnd(numStr,place)
{
   i=0
 
   temp = parseInt(numStr.charAt(place))+1
   
   if(temp<10)
   {
       numStr = setCharAt(numStr,place,temp+"") 
   }
   else
   {   
       /////-----------------------------if(i<0)
       numStr = setCharAt(numStr,place,"0")  
       numStr = addOneToEnd(numStr,place-1)
   }
   return numStr
}


function sfADD(x1,x2)
{
    sf1 = getSigFigs(x1)
    sf2 = getSigFigs(x2)
    //x1=x1.toExponential(10)
    //x2=x2.toExponential(10)
    
    x = x1+x2
    x = x.toExponential(10)

    if(sf1 > sf2)
        sf = sf2 
    else
        sf = sf1 
    
   //returnStr = cutToXSigFigs(x,sf)
   i=0
   shouldRound=false
   remain="" 
   firstChar=true
   round=false
    i=0
    returnStr=""
    while(i <= sf)    
    {
       if(i==0)
       {
          if(x.charAt(0)=="0" || x.charAt(0)==".")
          {
             returnStr = returnStr + x.charAt(0)
             x=x.slice(1,x.length)
          }
          else
          {
             returnStr = returnStr + x.charAt(0)
             x=x.slice(1,x.length)
             i++
          }
       }
       else
       {
          returnStr = returnStr + x.charAt(0)
          x=x.slice(1,x.length)
          i++
       }
   }

   while(x.length>0 && x.charAt(0)!="e")
   {
          
     //return remain 
     
     if(firstChar)
     {
        remain=x.charAt(0)
        firstChar=false
        if(remain>5)
        {
          round=true
        }
     }
     x=x.slice(1,x.length)
   } 
   returnStr = addOneToEnd(returnStr,returnStr.length)
    //returnStr
    //
    finalStr=""
    i=0
    while(i <= sf)    
    {
       if(i==0)
       {
          if(returnStr.charAt(0)=="0" || returnStr.charAt(0)==".")
          {
             finalStr = finalStr + returnStr.charAt(0)
             returnStr=returnStr.slice(1,returnStr.length)
          }
          else
          {
             finalStr = finalStr + returnStr.charAt(0)
             returnStr=returnStr.slice(1,returnStr.length)
             i++
          }
       }
       else
       {
          finalStr = finalStr + returnStr.charAt(0)
          returnStr=returnStr.slice(1,returnStr.length)
          i++
       }
   }

   //slice off e
   x=x.slice(1,x.length)
   sign= x.charAt(0)
   x=x.slice(1,x.length)
  
   expnt=""
   while(x.length>0)
   {
      expnt=expnt+x.charAt(0)
      x=x.slice(1,x.length)
   } 
   return finalStr+"e"+sign+expnt
}




function sfSUB(x1,x2)
{
    sf1 = getSigFigs(x1)
    sf2 = getSigFigs(x2)
    //x1=x1.toExponential(10)
    //x2=x2.toExponential(10)
    
    x = x1-x2
    x = x.toExponential(10)

    if(sf1 > sf2)
        sf = sf2 
    else
        sf = sf1 
    
   //returnStr = cutToXSigFigs(x,sf)
   i=0
   shouldRound=false
   remain="" 
   firstChar=true
   round=false
    i=0
    returnStr=""
    while(i <= sf)    
    {
       if(i==0)
       {
          if(x.charAt(0)=="0" || x.charAt(0)==".")
          {
             returnStr = returnStr + x.charAt(0)
             x=x.slice(1,x.length)
          }
          else
          {
             returnStr = returnStr + x.charAt(0)
             x=x.slice(1,x.length)
             i++
          }
       }
       else
       {
          returnStr = returnStr + x.charAt(0)
          x=x.slice(1,x.length)
          i++
       }
   }

   while(x.length>0 && x.charAt(0)!="e")
   {
          
     //return remain 
     
     if(firstChar)
     {
        remain=x.charAt(0)
        firstChar=false
        if(remain>5)
        {
          round=true
        }
     }
     x=x.slice(1,x.length)
   } 
   returnStr = addOneToEnd(returnStr,returnStr.length)
    //returnStr
    //
    finalStr=""
    i=0
    while(i <= sf)    
    {
       if(i==0)
       {
          if(returnStr.charAt(0)=="0" || returnStr.charAt(0)==".")
          {
             finalStr = finalStr + returnStr.charAt(0)
             returnStr=returnStr.slice(1,returnStr.length)
          }
          else
          {
             finalStr = finalStr + returnStr.charAt(0)
             returnStr=returnStr.slice(1,returnStr.length)
             i++
          }
       }
       else
       {
          finalStr = finalStr + returnStr.charAt(0)
          returnStr=returnStr.slice(1,returnStr.length)
          i++
       }
   }

   //slice off e
   x=x.slice(1,x.length)
   sign= x.charAt(0)
   x=x.slice(1,x.length)
  
   expnt=""
   while(x.length>0)
   {
      expnt=expnt+x.charAt(0)
      x=x.slice(1,x.length)
   } 
   return finalStr+"e"+sign+expnt
}


//nice tutoiral
//http://nodeguide.com/beginner.html#hello-world-tutorial




