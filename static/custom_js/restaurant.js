$(document).ready(function(){

    toastr.options.fadeOut = 2500;
    toastr.options.timeOut = 2500;

    $(document).on("click","#add-restaurant-button",function(){
        var name= $("#name").val();
        var phoneNumber= $("#phoneNumber").val();
//        var numberOfTable= $("#numberOfTable").val();
//        var seatingCapacity= $("#seatingCapacity").val();
        var restaurantAddress= $("#restaurantAddress").val();
        var adminName= $("#adminName").val();
        var adminEmail= $("#adminEmail").val();
        var adminNumber= $("#adminNumber").val();
        var myFile = $('#image').prop('files');
        if(name.trim()==""){
            toastr.error("Please enter restaurant name");
            return false;
        }else if(phoneNumber.trim()==""){
            toastr.error("Please enter phone number");
            return false;
        }else if(!validatePhoneNumber(phoneNumber)){
            toastr.error("Please enter valid phone number");
            return false;
        }if(adminName.trim()==""){
            toastr.error("Please enter Admin's name");
            return false;
        }else if(adminEmail.trim() == ""){
            toastr.error("Please enter your email");
            return false;
        }else if(!validateEmail(adminEmail)){
            toastr.error("Please enter valid email");
            return false;
        }
        else if(adminNumber.trim()==""){
            toastr.error("Please enter phone number");
            return false;
        }else if(!validatePhoneNumber(adminNumber)){
            toastr.error("Please enter valid phone number for admin");
            return false;
        }
        else if(restaurantAddress.trim() == ""){
            toastr.error("Please enter address");
            return false;
        }else if(myFile.length == 0){
             toastr.error("Please upload a picture");
            return false;
        }else{
            addRestaurantApi(name,phoneNumber,restaurantAddress,myFile[0],adminName,adminEmail,adminNumber)
        }

    });

    $(document).on("click",".edit-restaurant",function(){
        var id = $(this).attr("data-id");
        getRestaurant(id);
    })

    $(document).on("change","#edit-image",function(event){
        var myFile = $('#edit-image').prop('files');
        console.log(myFile[0].name);
        $("#edit-image-name").val(myFile[0].name);
    })


    $(document).on("change","#image",function(event){
        var myFile = $('#image').prop('files');
        console.log(myFile[0].name);
        $("#add-image-name").val(myFile[0].name);
    })


    $(document).on("click",".restaurant-name",function(){
        var id = $(this).attr("data-id");
        var name = $(this).attr("data-name");
        setRestaurantSession(id,name)
    })

    $(document).on("click","#edit-restaurant-btn",function(){
        var id = $(this).attr("data-id");
        var img = $(this).attr("data-img");
        var name =  $("#edit-restaurant-name").val();
        var phoneNumber= $("#edit-restaurant-phone-number").val();
        var numberOfTable= $("#edit-restaurant-number-of-table").val();
        var seatingCapacity= $("#edit-restaurant-seating-capacity").val();
        var restaurantAddress= $("#edit-restaurant-address").val();
        var myFile = $('#edit-image').prop('files');
        console.log("===========")
        console.log(myFile.length)
        console.log("============")

        if(name.trim()==""){
            toastr.error("Please enter restaurant name");
            return false;
        }else if(phoneNumber.trim()==""){
            toastr.error("Please enter phone number");
            return false;
        }else if(!validatePhoneNumber(phoneNumber)){
            toastr.error("Please enter valid phone number");
            return false;
        }
        else if(numberOfTable.trim() == ""){
            toastr.error("Please enter number of table");
            return false;
        }else if(!validateNumber(numberOfTable)){
            toastr.error("Number of table can be number only");
            return false;
        }
        else if(numberOfTable < 0){
            toastr.error("Number of table must be greater than 0");
            return false;
        }
        else if(numberOfTable.toString()[0] == "+" ){
            toastr.error("Number of table can be number only");
            return false;
        }
        else if(seatingCapacity.trim() == ""){
            toastr.error("Please enter seating capacity")
            return false;

        }else if(!validateNumber(seatingCapacity)){
            toastr.error("Seating capacity can be number only");
            return false;
        }else if(seatingCapacity < 0){
            toastr.error("Seating capacity must be greater than 0");
            return false;
        }
        else if(seatingCapacity.toString()[0] == "+" ){
            toastr.error("Seating capacity can be number only");
            return false;
        }
        else if(restaurantAddress.trim() == ""){
            toastr.error("Please enter address");
            return false;
        }else{
            editRestaurantApi(id,name,phoneNumber, numberOfTable, seatingCapacity,restaurantAddress,myFile,img)
        }

    })


    function addRestaurantApi(name,phoneNumber, restaurantAddress,file,adminName,adminEmail,adminNumber){
        var formdata = new FormData();
        formdata.append("name",name);
        formdata.append("phoneNumber",phoneNumber);
        formdata.append("adminName",adminName);
        formdata.append("adminEmail",adminEmail);
        formdata.append("adminNumber",adminNumber);
        formdata.append("restaurantAddress",restaurantAddress);
        formdata.append("file",file);

        var token = $("#acess-token").val();

         $.ajax({
            headers: {"token": token},
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
                    toastr.error(data.message)
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


 function getRestaurant(id){
    var data = {
        "id" : id
    }

     $.ajax({
            url: '/get-restaurant-by-id',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (data) {

                if (data.status) {
                    console.log(data.value[0])
                    setEditModalValue(data.value[0]);
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


 function setEditModalValue(editObj){
    $("#edit-restaurant-name").val(editObj["name"]);
    $("#edit-restaurant-phone-number").val(editObj["phoneNumber"]);
    $("#edit-restaurant-number-of-table").val(editObj["numberOfTable"]);
    $("#edit-restaurant-seating-capacity").val(editObj["seatingCapacity"]);
    $("#edit-restaurant-address").val(editObj["address"]);
    $("#edit-restaurant-btn").attr("data-id",editObj["id"]);
    $("#edit-image-name").val(editObj["image"].split("/")[editObj["image"].split("/").length -1]);
    $("#edit-restaurant-btn").attr("data-img",editObj["image"]);

 }


 function editRestaurantApi(id,name,phoneNumber, numberOfTable, seatingCapacity,restaurantAddress,file,img){

    var formdata = new FormData();

    formdata.append("id",id);
    formdata.append("name",name);
    formdata.append("phoneNumber",phoneNumber);
    formdata.append("numberOfTable",numberOfTable);
    formdata.append("seatingCapacity",seatingCapacity);
    formdata.append("restaurantAddress",restaurantAddress);
    formdata.append("img",img);

    console.log("-----------")
    console.log(file.length)
    console.log(file)
    console.log("---------")


    if (file.length == 0){
        formdata.append("fileLen",false);
    }else{
        formdata.append("fileLen",true);
        formdata.append("file",file[0]);
    }
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
                 toastr.success("Restaurant edited successfully",'', {
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

 function setRestaurantSession(id,name){
    var data={
        "id":id,
        "name":name
    }
   $.ajax({
        url: '/set-restaurant-session',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(data),

        success: function (data) {


            if (data.status) {
                window.location.href ="/view-restaurant"
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

     function validateEmail(email){
        console.log("valid email");
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }








});