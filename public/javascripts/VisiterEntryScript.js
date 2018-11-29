//get approval token //

$("#approvalToken").click(function(){
 var escort_id=$("#escort_empid").val();
 var visitor_id=$("#visitor_empid").val();
 if(escort_id != "" &&  visitor_id != "")
 {
    $.ajax(
      {
        url: "/getApprovalToken",
        type:"Post",
        data: {
            escort_id: $("#escort_empid").val()           
          },
       success: function(result){
           var getToken=prompt("Please verify approval token :" +result);
        if (getToken) {
            
            $.ajax(
                {
                  url: "/visitorApproved",
                  type:"POST",
                  data: {
                    visitor_id: $("#visitor_empid").val() ,getToken: getToken, escort_id: $("#escort_empid").val()        
                  },
                 success: function(result){
                
                  if(result)
                  {
                  alert("Visitor approved !!");
                  document.location.href="/";
                  }
                  else{

                    alert("Error while updating record. Please try again !!");
                    document.location.href="/";
                  }
              }
              }
              ); 
              
        } else {
            document.location.href="/";
        }
      
    }
    }
 

    ); 
}
else{
    alert("Please enter required details!!");
} 
});


//Validate user from database//

$("#validateEscort").click(function(){
    
       $.ajax(
         {
           url: "/validateEscort",
           type:"Post",
           data: {
            escort_id: $("#escort_id").val()           
             },
          success: function(result){
           
            if(result)
            {
           alert("Form validated.Press ok to submit form !!");
           $(this).attr('disabled',true);
           $("#submit").attr('disabled',false);
            }
            else{

                alert("Escort does not exist.Please try agin!!");
                $("#submit").attr('disabled',true);
                $(this).attr('disabled',false);
               // document.location.href="/";
            }        
       }
       }
       );  
   });


   $("#visitor_id").keyup(function(){
    if($("#visitor_id").val() != "")
     $("#validateVisitor").attr('disabled',false);
     else
     $("#validateVisitor").attr('disabled',true);
   });

   //get the current status of visitor//

   $("#getStatus").click(function(){
    
       $.ajax(
         {
           url: "/validateVisitor",
           type:"Post",
           data: {
               visitor_id: $("#visitor_empid").val()           
             },
          success: function(data){
           
            if(data != "null")
            {
               if(data == "pending")
               {
                document.getElementById("progressbar").style.display = "block";
                document.getElementById("progress-bar").style.backgroundColor="#f9fac4";
                document.getElementById("progress-bar").style.color="black";
                document.getElementById("progress-bar").style.width="50%";
                document.getElementById("progress-bar").innerText="Pending";
               }
               else if(data == "Approved")
               {
                //$('.progressbar').toggle("slide");
                document.getElementById("progressbar").style.display = "block";
                document.getElementById("progress-bar").style.width="100%";
                document.getElementById("progress-bar").style.backgroundColor="#78d3a8";
                document.getElementById("progress-bar").innerText="Approved";
               }
              

               
                  
            }
            else{

                alert("user does not exist.Please try agin!!");
                document.location.href="/";
            }        
       }
       }
       );  
   });

 // redirect to home page //
 $("#home").click(function(){  
        
    document.location.href="/"
   
  });

//redirect to list page//
   $("#visitorGrid").click(function(){  
        
     document.location.href="/visitorGrid"
    
   });

   //redirect to status page //
   $("#status").click(function(){  
        
    document.location.href="/status"
   
  });


  // bind visitor record //
   function bindGrid(){

    $.ajax(
        {
          url: "/visitorRecord",
          type:"Post",
          data: {
                         
            },
            contentType: "application/json; charset=utf-8",
           
         success: function(result){
             var items=JSON.parse(result);
             for(var i=0; i<items.length;i++)
             {
                 var date=((items[i].escort_date).substring(0,10)).split('-').reverse().join('-');
                 
                 items[i].escort_date=date;
             }
         
           if(result)
           {
            $('#myGrid').DataTable({
                "aaData": items,
                "scrollX": true,
                "scrollY": "500px",
                "scrollCollapse": true,
                "columns": [{ "data": "visitor_empid" }, 
                { "data": "visitor_name" },
                { "data": "visitor_company" }, 
                { "data": "visitor_unit" },
                { "data": "visitor_smartcard" }, 
                { "data": "visitor_access" },
                { "data": "visitor_assetId" },
                 { "data": "visitor_purpose" },
                 { "data": "escort_empid" }, 
                 { "data": "escort_name" },
                 { "data": "escort_unit" },
                 { "data": "escort_smartcard" }, 
                 { "data": "escort_date",type: 'dd-mm-yyyy', targets: 0 },
                 { "data": "escort_time_from" }, 
                 { "data": "escort_time_to" },
                 { "data": "approvalStatus" },
                 { "data": "dayCount" },
                
            ]
            });
            
           
   }
}   
        });
    }

   //dataGrid Binding //

   function gridBind(items){
    
    jQuery("#myGrid").jqGrid({
        data: items,
        datatype: "jsonstring",
        height: 150,
         //insert data from the data object we created abov
        

        colNames: ['visitorID','visitor_name','visitor_company','visitor_unit','visitor_smartcard','visitor_access','visitor_assetId','visitor_purpose','escort_empid','escort_name','escort_unit','escort_smartcard','escort_date','escort_time_from','escort_time_to','approvalStatus','dayCount'],
        colModel: [
            { name: "visitorempid", key:true, width: 50 },
            { name: "visitor_name",  width: 200},
            { name: "visitor_company", width: 75 },
            { name: "visitor_unit", width: 75},
            { name: "visitor_smartcard",key:true, width: 50 },
            { name: "visitor_access",  width: 200},
            { name: "visitor_assetId", width: 75 },
            { name: "visitor_purpose", width: 75},
            { name: "escort_empid", key:true, width: 50 },
            { name: "escort_name",  width: 200},
            { name: "escort_unit",  width: 75 },
            { name: "escort_smartcard", width: 75},
            { name: "escort_date",  width: 75},
            { name: "escort_time_from",key:true, width: 50 },
            { name: "escort_time_to",  width: 200},
            { name: "approvalStatus",  width: 75 },
            { name: "dayCount",  width: 75}
        ],
        viewrecords: true,
        pager: jQuery('#pager'),
        rowNum: 10,
        rowList: [10, 20, 30],
        viewrecords: true,
        caption: 'Visitor Record'

    });

   }

   
   
