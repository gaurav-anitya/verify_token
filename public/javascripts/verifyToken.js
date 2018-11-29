$("#Verify_token").click(function(){
    var userName=sessionStorage.getItem("userName");
    
    $.ajax(
      {
        url: "/verifyApprovalToken",
        type:"Post",
        data: {
            token_key: $("#token_key").val() ,userName: userName         
          },
       success: function(data){
        
         if(data)
         {
           alert("Your approval token is :"+data);
          // document.location.href="/login";
         }
         else{

             alert("Error while generating token");
            // document.location.href="/login";
         }        
    }
    }
    );  
});

$("#inputPassword").keyup(function(){
  
  var userName=$("#inputusername").val();
  sessionStorage.setItem("userName", userName);
});