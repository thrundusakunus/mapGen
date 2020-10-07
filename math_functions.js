function lagrangePolynomial(x_array, y_array){

    var len = x_array.length;
    if(len != y_array.length){
        console.log("ERROR: lagrange_polynomial(x_array, y_array) --- different number of elements in arrays");
    }

    inner_function = (x, j, m, x_array) =>
    { return (x - x_array[m]) / (x_array[j] - x_array[m]);    };

    lagrange_basis_function = (x, j, length, x_array) =>
    {
        var output = 1;
        for(var m = 0; m < length; ++m){
            if(m == j){ continue;   }
            output *= inner_function(x, j, m, x_array);
        }
        return output;
    };

    lagrange_polynomial_function = (x) =>
    {

        var sum = 0;
        var len = x_array.length;

        for(var j = 0; j < len; ++j){

            sum += y_array[j] * lagrange_basis_function(x, j, len, x_array);

        }

        return sum;

    };

    return lagrange_polynomial_function;



    //return final_function;

}

//prolozeni krivkou provedeno rucne
function temperatureFit(){

    var R_func = (x) =>
    {   return y = 30.5 / (1 + Math.exp((x-44)/10.3)) - 3.2;    }

    var func = (x) =>
    {   return R_func(x) + R_func(-x) - 27; }
    return func;
}

function definiteIntegral(func, x1, x2, steps){

    if(x1 > x2){
        console.log("ERROR: definiteIntegral --- wrong bounds of integral");
        return;
    }

    var step = (x2 - x1) / steps;
    var sum = 0;

    for(var i = x1; i < x2; i += step){

        sum += func(i) * step;

    }

    return sum;

}


function getTemperatureDistribution(T_average_demanded,
    latitude_array = [0,10,20,30,40,50,60,70,80,90,-10,-20,-30,-40,-50,-60,-70,-80, -90], 
    temperature_array = [27,26,25,21,15,7,3,0,-2,-3,26,25,21,15,7,3,0,-2,-3]){

    //baseTemperatureDist = lagrangePolynomial(latitude_array, temperature_array);
    baseTemperatureDist = temperatureFit();
    base_T_average = definiteIntegral(baseTemperatureDist, -90, 90, 180) / 180;

    temperatureDist = (x) => {  return baseTemperatureDist(x) + (T_average_demanded - base_T_average);  }

    return temperatureDist;

}
