$(document).ready(function(){

    toastr.options.fadeOut = 2500;
    toastr.options.timeOut = 2500;

    $(document).on("click","#btn-add-table",function(){
        var tableStatus= $('#tableStatus').find(":selected").text();
        var tableNumber= $("#tableNumber").val();
        var seatingCapacity= $("#seatingCapacity").val();
        console.log(tableStatus);
        console.log(tableNumber);
        console.log(seatingCapacity);
        if(tableStatus==""){
            toastr.error("Please select table status");
            return false;
        }else if(tableNumber.trim()==""){
            toastr.error("Please enter table number");
            return false;

        }else if(!validateNumber(tableNumber)){
            toastr.error("Table number should be number only");
            return false;
        }else if(tableNumber<0){
            toastr.error("Table's number cannot be negative");
            return false;
        }else if(tableNumber.toString()[0] == "+" ){
            toastr.error("Table number should be number only");
            return false;
        }
        else if(seatingCapacity.trim() == ""){
            toastr.error("Please enter seating capacity")
            return false;

        }else if(!validateNumber(seatingCapacity)){
            toastr.error("Seating capacity can be number only");
            return false;
        } else if(seatingCapacity<0){
            toastr.error("Seating capacity cannot be negative")
            return false;
        }else if(seatingCapacity.toString()[0] == "+" ){
            toastr.error("Seating capacity can be number only");
            return false;
        }
        else{
           addTable(tableStatus,tableNumber,seatingCapacity)
        }

    });

    $(document).on("click",".edit-table",function(){
        var id = $(this).attr("data-id");
         getTable(id);
    })


    $(document).on("click",".restaurant-name",function(){
        var id = $(this).attr("data-id");
        setRestaurantSession(id)
    })


    $(document).on("click","#edit-table",function(){
        var id= $(this).attr("data-id");
        var tableStatus= $('#editTableStatus').find(":selected").text();
        var tableNumber= $("#editTableNumber").val();
        var seatingCapacity= $("#editSeatingCapacity").val();
        if(tableStatus==""){
            toastr.error("Please select table status");
            return false;
        }else if(tableNumber.trim()==""){
            toastr.error("Please enter table number");
            return false;

        }else if(!validateNumber(tableNumber)){
            toastr.error("Please enter valid input");
            return false;
        }else if(tableNumber<0){
            toastr.error("Table's number cannot be negative");
            return false;
        }else if(tableNumber.toString()[0] == "+" ){
            toastr.error("Table number should be number only");
            return false;
        }
        else if(seatingCapacity.trim() == ""){
            toastr.error("Please enter seating capacity")
            return false;

        }else if(!validateNumber(seatingCapacity)){
            toastr.error("Please enter valid input");
            return false;
        }else if(seatingCapacity<0){
            toastr.error("Seating capacity cannot be negative")
            return false;
        }else if(seatingCapacity.toString()[0] == "+"){
            toastr.error("Seating capacity can be number only");
            return false;
        }
        else{
           editTable(id,tableStatus,tableNumber,seatingCapacity);
        }

    });


    function addRestaurantApi(name,phoneNumber, numberOfTable, seatingCapacity,restaurantAddress,file){
        var formdata = new FormData();
        formdata.append("name",name);
        formdata.append("phoneNumber",phoneNumber);
        formdata.append("numberOfTable",numberOfTable);
        formdata.append("seatingCapacity",seatingCapacity);
        formdata.append("restaurantAddress",restaurantAddress);
        formdata.append("file",file);



         $.ajax({
            url: '/add-restaurant',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formdata,
             beforeSend: function (xhr, settings) {
                    $("#add-restaurant-button").attr("disabled",true);
                    $("#add-restaurant-button").text("Processing");
                },


            success: function (data) {
                    $("#add-restaurant-button").attr("disabled",false);
                    $("#add-restaurant-button").text("Add");
                    $("#close-btn").click();

                if (data.status) {
                    $("#add-restaurant-button").attr("disabled",true);
                     toastr.success("Restaurant added successfully",'', {
                        onHidden: function() {
                            window.location.href = "/restaurant";
                        }
                });

                } else {
                    toastr.error('error')
                }
            },
            error: function (err) {
                 $("#add-restaurant-button").attr("disabled",false);
                    $("#add-restaurant-button").text("Add");
                toastr.error('error'+err)
            }

        })




    }

    function userLoginApi( email, password){
        var data = {
            "email":email,
            "password":password
        }

         $.ajax({
            url: '/user-login',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (data) {

                if (data.status) {



                    window.location.href = "/dashboard";
                } else {
                    toastr.error('error')
                }
            },
            error: function (err) {
                toastr.error('error'+err)
            }

        })

    }


function clearAddRestaurantModal(){
    $("#name").val("");
    $("#phoneNumber").val("");
    $("#numberOfTable").val("");
    $("#seatingCapacity").val("");
    $("#restaurantAddress").val("");
}

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


 function setEditTableModalValue(editObj){
    $("#editTableNumber").val(editObj["tableNumber"]);
    $("#editSeatingCapacity").val(editObj["seatingCapacity"]);
    $("#edit-table").attr("data-id",editObj["id"]);
    if(editObj["restaurantStatus"]){
    $("#editTableStatus option[value=1]").attr('selected','selected');
    }else{
     $("#editTableStatus option[value=0]").attr('selected','selected');
    }

 }


 function editRestaurantApi(id,name,phoneNumber, numberOfTable, seatingCapacity,restaurantAddress,file){

    var formdata = new FormData();

    formdata.append("id",id);
    formdata.append("name",name);
    formdata.append("phoneNumber",phoneNumber);
    formdata.append("numberOfTable",numberOfTable);
    formdata.append("seatingCapacity",seatingCapacity);
    formdata.append("restaurantAddress",restaurantAddress);
    formdata.append("file",file);

    $.ajax({
        url: '/edit-restaurant',
        type: 'POST',
        processData: false,
        contentType: false,
        data: formdata,
         beforeSend: function (xhr, settings) {
                $("#edit-restaurant-btn").attr("disabled",true);
                $("#edit-restaurant-btn").text("Processing");
            },
        success: function (data) {
                $("#edit-restaurant-btn").attr("disabled",false);
                $("#edit-restaurant-btn").text("Save");
                $("#close-btn").click();

            if (data.status) {
                 $("#edit-restaurant-btn").attr("disabled",true);
                 toastr.success("Restaurant added successfully",'', {
                        onHidden: function() {
                            window.location.href = "/restaurant";
                        }
                });

            } else {
                toastr.error('error')
            }
        },
        error: function (err) {
             $("#edit-restaurant-btn").attr("disabled",false);
             $("#edit-restaurant-btn").text("Save");
             toastr.error('error'+err)
        }
    })

 }


 function addTable(tableStatus,tableNumber,seatingCapacity){
    var data = {
        "status":tableStatus,
        "tableNumber":tableNumber,
        "seatingCapacity":seatingCapacity,
    }

     var token = $("#acess-token").val();

    $.ajax({
        headers: {"token": token},
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
                            window.location.href ="/outlet-details"
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
 function  editTable(id,tableStatus,tableNumber,seatingCapacity){
       var data = {
        "id":id,
        "status":tableStatus,
        "tableNumber":tableNumber,
        "seatingCapacity":seatingCapacity,
    }

    $.ajax({
        url: '/edit-table',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),
         beforeSend: function (xhr, settings) {
                $("#edit-table").attr("disabled",true);
                $("#edit-table").text("Processing");
            },

        success: function (data) {
            $("#edit-table").attr("disabled",false);
            $("#edit-table").text("Add");


            if (data.status) {
                 $("#edit-table").attr("disabled",true);
                 toastr.success("Table edited added successfully",'', {
                        onHidden: function() {
                             window.location.href ="/restaurant-details"
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








});