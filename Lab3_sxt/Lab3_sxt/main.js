var prodRows = document.getElementById("tbodyRows") ;
var prodRequest = new XMLHttpRequest( ) ;
var prodData ;
var prodRowData="" ;
var selectedProducts = "" ;
var prodObj = [] ;
var prodJSON ;
var prodID,prodQty;
var sortOrder = "D" ;
prodRequest.open("GET", "products.json") ;
prodRequest.send( ) ;
prodRequest.onload = function( )
{
prodData = JSON.parse(prodRequest.responseText) ;
renderTable(prodData) ;
}
function renderTable(data)
{
prodRowData = "" ;
for (i = 0; i<data.length; i++)
{
prodRowData += "<tr><td class='prod' id='prodID"+i+"'>" + data[i].prodID + "</td><td class='prod'>" + "<img src=" + data[i].prodImg + "/>" + "</td><td class='prod' id='prodName"+i+"'>"
+ data[i].prodName + "</td> <td class='prod' id='prodDesc"+i+"'>" + data[i].prodDesc + "</td><td class='prod'>" +
data[i].prodPrice + "</td><td class='prod'>" + "<input type='number' min ='0' max = '9' id='ProdQty"+i+"' value='0'" + "</td></tr>";}
prodRows.innerHTML = prodRowData ;
}
function confirmQty( )
{
for (i = 0; i<prodData.length; i++)
{
var rowNum = i.toString( ) ;
var columnID = "ProdQty" + rowNum ;
var iQty = document.getElementById(columnID).value;
if(iQty > 0)
{
columnID = "prodName" + rowNum ;
productID = "prodID" + rowNum ;
selectedProducts += document.getElementById(productID).innerText + " " + document.getElementById(columnID).innerText + ": Qty " + iQty + "\n";
prodObj.push({ "prodID":document.getElementById(productID).innerText,"prodQty":iQty});
}

}



if (selectedProducts > "" && selectedProducts != null)
{let text= "You have selected the following products: \n" + selectedProducts;
if(confirm("Are you sure you want to order the following: \n" + selectedProducts)==true){
alert("Thank you! Your order has been placed.");
}
}




prodJSON = JSON.stringify(prodObj);

localStorage.setItem("prodJSON", prodJSON);
}

function resetConfirm(){
if (confirm("Are you sure you want to cancel your selections?")) {
    document.querySelectorAll("input[type='number']").forEach(elm => elm.value = 0);
}
}



{
for (i = 0; i<prodData.length; i++)
{

var rowNum = i.toString( ) ;

var columnID = "ProdQty" + rowNum ;

var iQty = document.getElementById(columnID).value;

if(iQty > 0)
{
confirm("Are you sure you want to clear your selections?");
}
}
}



function sortByID()
{



if (sortOrder == "A")
{
prodData.sort(function(a,b)
{
return a.prodID - b.prodID ;
} ) ;
sortOrder = "D" ;
}
else
{
prodData.sort(function(a,b)
{
return b.prodID - a.prodID ;
}) ;
sortOrder = "A" ;
}
renderTable(prodData) ;
}



function sortByName()
{
if (sortOrder == "A")
{
prodData.sort(function(a,b)
{
if (a.prodName < b.prodName)
{
return -1 ;
}
} ) ;
sortOrder = "D" ;
}
else
{
prodData.sort(function(a,b)
{
if (a.prodName > b.prodName)
{
return -1
}
} ) ;
sortOrder = "A" ;
}
renderTable(prodData) ;
}



function sortByPrice()
{
if (sortOrder == "A")
{
prodData.sort(function(a,b)
{
return a.prodPrice - b.prodPrice ;
} ) ;
sortOrder = "D" ;
}
else
{
prodData.sort(function(a,b)
{
return b.prodPrice - a.prodPrice ;
}) ;
sortOrder = "A" ;
}
renderTable(prodData) ;
}

