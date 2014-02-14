

function getSigFigs(number) 
{
   /*This function will retrive the number of significant digits from a string or
   numerical input. The formatting rules of google docs will cause the input to allways
   start with either zero or a non-zero integer. after this can be a decimal or any 0-9 
   digit. The end of entries 0-9 will be preserved as long as a decimal is not present */
  
   //sub function
   function getNumOfSigs(n)
   {
     
      //removes insignificant varibles at the start of the string
      //ex: 0.001->.001 ex2: 00100.00 ||n.charAt(0)=="."
      //while(n.charAt(0)=="0" && n.length!=0)
      //{
      //   n=n.slice(1,n.length)
      //}//POSTCOND: string starts with a decimal or significant number.
      
      n = stripZeros(n);
     
      if(n.charAt(0)!=".")
      {
        //count using normal significance algorithm until reaching end or
        // reaching a decimal then use decimal significance algorithm
        if(n.charAt(n.length-1)==".")
        {//for ints with a final decimal ex 100.
            return countSigFigs(n); 
        } 
        else
        {//     
          i = countSigFigs(n);
          
          n = stripUntil(n);
          if(n!="")
          {  
              j = decimalSigFigCnt(n,1);
              //return i+"#"+n+"#"+j;
              return (i+j);
          }
          else
          {
            //return i+"#"+n
            return (i);
          }
        }     
      }
      else
      {//then count using decimal significance algorithm
         n = stripUntil(n);
         //return "#"+n;
         return decimalSigFigCnt(n,0);
      }     
   }  

   if(typeof(number)=="string")
   {
      return getNumOfSigs(number);
   }
   else if(typeof(number)=="number")
   {
      return getNumOfSigs(number+'');
   } 
}


function countSigFigs(st)
{  
   function recurCount(str)
   {
      /*This will end in either an empty string or a decimal.
      .in the event of the decimal all memebers on the string will
      be significant. In the event of an empty string ending all 
      entries between the first and last non-zero numbers will be 
      significant
      */
      str=str+""//ensure input is a string.     
      c = str.charAt(0);
      str = str.slice(1,str.length); 

      if(c == "")
      {
          return 0;
      }
      else if(c == ".")
      {
          return 1;
      } 
      else//c==digit
      {
          isSig=0;     
          if(c==0)
          {
             if(recurCount(str)>0){isSig=1;} 
          }
          else{   isSig=1;} 
          return (isSig+recurCount(str)); 
      } 
   }
   csfi=0 
   
   for (i=0;i<=5;i++)
   {//Since I am dumb I can't think of a way to not count decimals
     if(st.charAt(i)=='.')
     {
      csfi=1;
      break;
     }

   }
   if(csfi==1){return (recurCount(st)-1);}
   return recurCount(st);
}



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
console.log(  countSigFigs("3.13500") );




