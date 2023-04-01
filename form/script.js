function validation (event) {
    event.preventDefault();
    var firstname=document.getElementById("fname").value;
    var lastname=document.getElementById("lname").value;
    var address=document.getElementById("inputAddress").value;
    var gender=document.getElementsByName("Gender");
    for(let i=0;i<gender.length;i++)
    {
        if(gender[i].checked)
        {
           var Gender=gender[i].value;
        }
    }
    var count=0;
    k=0;
    var f=document.getElementById("food");
    let options=f.options;
    let arr=[];
    for(let i=0;i<options.length;i++)
    {
        if(options[i].selected)
        {
           arr.push(options[i].value);
        }
        
    }
    const len=arr.length;
    if(len<2)
    {
        window.alert("Select atleast two items");                
    }
    var state=document.getElementById("inputstate").value;
    var country=document.getElementById("inputcountry").value;
    console.log(firstname);
    console.log(lastname);
    console.log(address);
    console.log(Gender);
    console.log(arr);
    console.log(state);
    console.log(country);
    document.getElementById("table").style.display="block";
    var table=document.getElementById("table");
    var row=table.insertRow(-1);
    var fname=row.insertCell(0);
    var lname=row.insertCell(1);
    var Address=row.insertCell(2);
    var pin=row.insertCell(3);
    var gender=row.insertCell(4);
    var foo=row.insertCell(5);
    var sta=row.insertCell(6);
    var coun=row.insertCell(7);
    const form = document.getElementById('formId');
    fname.innerHTML=firstname;
    lname.innerHTML=lastname;
    Address.innerHTML=address;
    pin.innerHTML=document.getElementById("inputpincode").value;
    gender.innerHTML=Gender;
    foo.innerHTML=arr;
    sta.innerHTML=state;
    coun.innerHTML=country;
    if(len >= 2) {
    form.reset();
    }

}