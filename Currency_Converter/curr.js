const exchange ={
    USD:1,
    EUR:0.92,
    GBP:0.79,
    JPY:145.77,
    RUPEE:82.60,
};

function convert(){
    const amount= parseFloat(document.getElementById('amount').value);
    const fromcurr = document.getElementById('fromcurr').value;
    const tocurr= document.getElementById('tocurr').value;

    if(exchange[fromcurr] && exchange[tocurr]){
        const convertedamount =(amount*exchange[tocurr])/exchange[fromcurr];
        // document.getElementById('result').textContent=amount.toFixed(2)+''+fromcurr+' is equal to '+convertedamount.toFixed(2)+''+tocurr;
        document.getElementById('result').textContent=convertedamount;
    }else{
        document.getElementById('result').textContent="Courrency not found in Exchange rates.";
    }

}