$(document).ready(function(){
    toastr.options.fadeOut = 2500;
    toastr.options.timeOut = 2500;

    $(document).on("click","#save-outlet",function(){
        var location= $("#location").val();
        var managerEmail= $("#manager-email").val();
        var phone= $("#phone").val();
        var managerName= $("#manager-name").val();
        var managerPhoneNumber= $("#manager-phone-number").val();
        if(location.trim()==""){
            toastr.error("Please enter outlet location");
            return false;
        }else if(phone.trim()==""){
            toastr.error("Please enter outlet's phone number");
            return false;
        }
        else if(managerName.trim()==""){
            toastr.error("Please enter manager's name");
            return false;
        }
        else if(!validatePhoneNumber(phone)){
            toastr.error("Please enter valid outlet phone number")
            return false;

        }else if(managerEmail.trim() == ""){
            toastr.error("Please enter manager's email");
            return false;
        }
        else if(!validateEmail(managerEmail)){
            toastr.error("Please enter valid email");
            return false;
        }else if(managerPhoneNumber.trim()==""){
            toastr.error("Please enter manager's phone number");
            return false;
        }
        else if(!validatePhoneNumber(managerPhoneNumber)){
            toastr.error("Please enter manager's phone number")
            return false;

        }
        else{
           addOutlet(location,managerEmail,phone,managerPhoneNumber,managerName)
        }

    });

    $(document).on("click",".edit-table",function(){
        var id = $(this).attr("data-id");
         getTable(id);
    })

    $(document).on("click",".outlet-location",function(){
        var id = $(this).attr("data-id");
        var address = $(this).attr("data-address");
        setOutletSession(id,address)
    })

    $(document).on("click",".outlet_status",function(){
        var id = $(this).attr("data-id");
        var val = $(this).prop("checked");
        updateOutletStatus(id, val);
    })




function validatePhoneNumber(phoneNumber){
  return String(phoneNumber)
    .match(
    /^([0-9][0-9]{9})$/
    );
}



function validateNumber(num){
    if (isNaN(num))
      {
        return false;
      }
      return true
 }





 function addTable(tableStatus,tableNumber,seatingCapacity){
    var data = {
        "status":tableStatus,
        "tableNumber":tableNumber,
        "seatingCapacity":seatingCapacity,
    }

    $.ajax({
        url: '/add-table',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
         beforeSend: function (xhr, settings) {
                $("#btn-add-table").attr("disabled",true);
                $("#btn-add-table").text("Processing");
            },

        success: function (data) {
            $("#btn-add-table").attr("disabled",false);
            $("#btn-add-table").text("Add");


            if (data.status) {
                $("#btn-add-table").attr("disabled",true);
                toastr.success("Table added successfully",'', {
                        onHidden: function() {
                           window.location.href ="/outlets"
                        }
                });


            } else {
                toastr.error('error')
            }
        },
        error: function (err) {
             $("#btn-add-table").attr("disabled",false);
             $("#btn-add-table").text("Add");
             toastr.error('error'+err)
        }
    })




 }


  function setOutletSession(id,address){
    var data={
        "id":id,
        "address":address
    }
   $.ajax({
        url: '/set-outlet-session',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),

        success: function (data) {


            if (data.status) {
                window.location.href ="/outlet-details"
            } else {
                toastr.error('error')
            }
        },
        error: function (err) {
             toastr.error('error'+err)
        }
    })


 }
//addOutlet(location,managerEmail,phone,managerPhoneNumber)

 function  addOutlet(location,managerEmail,phone,managerPhoneNumber,managerName){
       var data = {
        "outletLocation":location,
        "managerEmail":managerEmail,
        "outletPhone":phone,
        "managerPhoneNumber":managerPhoneNumber,
        "managerName":managerName,
    }
     var token = $("#acess-token").val();

    $.ajax({
        headers: {"token": token},
        url: '/add-outlet',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
         beforeSend: function (xhr, settings) {

                $("#save-outlet").attr("disabled",true);
                $("#save-outlet").text("Processing");
            },

        success: function (data) {
            $("#save-outlet").attr("disabled",false);
            $("#save-outlet").text("Save");


            if (data.status) {
                toastr.success("Outlet added successfully",'', {
                        onHidden: function() {
                            window.location.href ="/view-restaurant"
                        }
                });

            } else {
                toastr.error('error')
            }
        },
        error: function (err) {
             $("#save-outlet").attr("disabled",false);
             $("#save-outlet").text("Save");
             toastr.error('error'+err)
        }
    })
 }

 function updateOutletStatus(id, val){
    var data = {
        "id" : id,
        "value":val
    }

   var token = $("#acess-token").val();
    $.ajax({
            headers: {"token": token},
            url: '/update-outlet-status',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (data) {

                if (data.status) {
                   toastr.success("Status updated successfully");
                    console.log("done");
                } else {
                    toastr.error('error')
                }
            },
            error: function (err) {
                toastr.error('error'+err)
            }

        })

 }


  function getTable(id){
    var data = {
        "id" : id
    }

     $.ajax({
            url: '/get-table-by-id',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (data) {

                if (data.status) {
                    console.log(data.value[0])
                    setEditTableModalValue(data.value[0]);
                    console.log("done");
                } else {
                    toastr.error('error')
                }
            },
            error: function (err) {
                toastr.error('error'+err)
            }

        })

 }

  function validateEmail(email){
        console.log("valid email");
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }








});