/*
This is a collection of mathematical functions which preserve significant 
figures.

Functions avalible
sfADD
sfSUBT
sfMULT
sfDEVIDE
sfSUM
sfAVERAGE
*/

function cntSigFigs(number)
{  
    /*
    Return the number of significant digits in a number.
    */
    var number_str    = Number(number).toString();
    var count_sigfigs = false;
    var sigfig_cnt    = 0;
    
    for (i=0; i < number_str.length; i++)
    {  
        if (number_str[i] != "." & number_str[i] != "0") 
        { 
            /*Leading zeros are not significant.*/
            count_sigfigs = true;
        } 
        /*Once counting begins, count all */ 
        if (count_sigfigs & number_str[i] != ".") {
                sigfig_cnt++;
        } 
    }
    return sigfig_cnt;
}


function outputToSigFig(number,Xplaces)
{ 
    /*
    Convert 
    */
    var rnd_num  = Number(number).toExponential();    
    numb_and_exp =  rnd_num.split("e"); 
    var num_str  = Number(numb_and_exp[0]).toFixed(Xplaces-1).toString();
    var exp_str  = numb_and_exp[1];     
    return num_str+"e"+exp_str;
}


function SFADD(x,y)
{
   var x_num = Number( x );
   var y_num = Number( y );
    
   var sigfigs_in_x = cntSigFigs(x);
   var sigfigs_in_y = cntSigFigs(y);
   /**/
   var output_sf = sigfigs_in_y;
   if (sigfigs_in_x > sigfigs_in_y) {
       output_sf = sigfigs_in_x;    
   }

   return outputToSigFig( x_num + y_num ,output_sf);

}

function SFSUB(x,y)
{
   var x_num = Number( x );
   var y_num = Number( y );

   var sigfigs_in_x = cntSigFigs(x);
   var sigfigs_in_y = cntSigFigs(y);
   /**/
   var output_sf = sigfigs_in_y;
   if (sigfigs_in_x > sigfigs_in_y) {
       output_sf = sigfigs_in_x;
   }
   return outputToSigFig( x_num - y_num ,output_sf);
}


function SFMULT(x,y)
{
   var x_num = Number( x );
   var y_num = Number( y );

   var sigfigs_in_x = cntSigFigs(x);
   var sigfigs_in_y = cntSigFigs(y);
   /**/
   var output_sf = sigfigs_in_y;
   if (sigfigs_in_x < sigfigs_in_y) {
       output_sf = sigfigs_in_x;
   }
   return outputToSigFig( x_num * y_num ,output_sf);
}

function SFDIV(x,y)
{
   var x_num = Number( x );
   var y_num = Number( y );

   var sigfigs_in_x = cntSigFigs(x);
   var sigfigs_in_y = cntSigFigs(y);
   /**/
   var output_sf = sigfigs_in_y;
   if (sigfigs_in_x < sigfigs_in_y) {
       output_sf = sigfigs_in_x;
   }
   return outputToSigFig( x_num / y_num ,output_sf);
}

//nice tutoiral
//http://nodeguide.com/beginner.html#hello-world-tutorial

console.log( "0.00052" ) ;
console.log( cntSigFigs("000.00052") ) ;
console.log( "1.00052" ) ;
console.log( cntSigFigs("010.00052") );
console.log( "1.00052e+1" ) ;
console.log( cntSigFigs("1.000052e+1") );

console.log( SFADD("8.002e+1","10.52") );

console.log( SFSUB("8.002e+1","10.52") );

console.log( SFMULT("8.002e+1","10.52") );

console.log( SFDIV("8.002e+1","10.52") );


