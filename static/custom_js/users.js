$(document).ready(function(){

    toastr.options.fadeOut = 2500;
    toastr.options.timeOut = 2500;

    $(document).on("click","#send-otp-btn",function(){
        var email= $("#email").val();
       if(email.trim() == ""){
            toastr.error("Please enter your email");
            return false;
        }else if(!validateEmail(email)){
            toastr.error("Please enter valid email");
            return false;
        }else{
            sendOtpApi(email);
        }
    })

     $(document).on("click",".admin_status",function(){
        var id = $(this).attr("data-id");
        var val = $(this).prop("checked");
        updateAdminStatus(id, val);
    })

    $(document).on("click",".delete_admin",function(){
        var id = $(this).attr("data-id");
        deleteAdmin(id);
    })


    $(document).on("click","#send-verification-otp",function(){
        var email= $("#email").val();
       if(email.trim() == ""){
           toastr.error("Please enter your email");
            return false;
        }else if(!validateEmail(email)){
            toastr.error("Please enter valid email");
            return false;
        }else{
            sendVerifyOtpApi(email);
        }
    })

    $(document).on("click","#forgot-password-btn",function(){
        var otp= $("#otp").val();
        var password= $("#new-password").val();
       if(otp.trim() == ""){
            toastr.error("Please enter OTP");
            return false;
        }else if(password.trim() == ""){
            toastr.error("Please enter password");
            return false;
        }else{
            changePasswordApi(otp,password);
        }
    })

    $(document).on("click","#btn-sign-up",function(){
        var username= $("#username").val();
        var email= $("#email").val();
        var password= $("#password").val();
        var phoneNumber= $("#phoeNumber").val();
        var termsCondition= $('#terms-conditions').is(":checked")




        if(username.trim() == ""){
            toastr.error("Username cannot be empty");
            return false;
        }else if(!validateUsername(username)){
            toastr.error("Username length must be greater than 8 and it must contain only letters and number");
            return false;
        }
        else if(email.trim() == ""){
            toastr.error("Please enter your email");
            return false;
        }else if(!validateEmail(email)){
            toastr.error("Please enter valid email");
            return false;
        }
        else if(phoneNumber.trim() == ""){
            toastr.error("Phone number cannot be empty");
            return false;
        }else if(!validatePhoneNumber(phoneNumber)){
            toastr.error("Please enter valid phone number");
            return false;
        }


        else if (password.trim() == ""){
            toastr.error("Password cannot be empty");
            return false;
        }
        else if (!validatePaswword(password)){
            toastr.error("Password length must be greater than 8 and it must contain number and lowercase charecter");
            return false;
        }else if(!termsCondition){
            toastr.error("Please agree terms and condition");
            return false;
        }else{
            registerUserApi(username, email,phoneNumber, password);
        }
    });


    $(document).on("click","#btn-sign-in",function(){
        var email= $("#email").val();
        var password= $("#password").val();
        if(email.trim() == ""){
            toastr.error("Please enter your email");
            return false;
        }else if(!validateEmail(email)){
            toastr.error("Please enter valid email");
            return false;
        }else if (password.trim() == ""){
            toastr.error("Password cannot be empty");
            return false;
        }else{
            userLoginApi( email, password);
        }
    });

    $(document).on("click","#btn-sign-in-sa",function(){
        var email= $("#email").val();
        var password= $("#password").val();
        if(email.trim() == ""){
            toastr.error("Email cannot be empty");
            return false;
        }else if(!validateEmail(email)){
            toastr.error("Please enter valid email");
            return false;
        }else if (password.trim() == ""){
            toastr.error("Password cannot be empty");
            return false;
        }else{
            superAdminLoginApi( email, password);
        }
    });

    $(document).on("click","#confirm-otp-btn",function(){
        var confirm_otp= $("#confirm-otp").val();
        if(confirm_otp.trim() == ""){
            toastr.error("Please enter OTP");
            return false;
        }else{
            confirmOtpApi(confirm_otp.trim());
        }
    });


    function registerUserApi(username, email, phoneNumber,password){
        var data = {
            "username":username,
            "email":email,
            "phoneNumber":phoneNumber,
            "password":password
        }

         $.ajax({
            url: '/sign-up',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#btn-sign-up").attr("disabled",true)
                    $("#btn-sign-up").text("Processing");
                },

            success: function (data) {

                $("#btn-sign-up").text("Sign Up");
                if (data.status) {
                    toastr.success("User registered sucessfully",'', {
                        onHidden: function() {
                            window.location.href = "/confirm-otp";
                        }
                        });



                } else {
                    toastr.error(data.message);
                }
            },
            error: function (err) {
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
             beforeSend: function (xhr, settings) {
                    $("#btn-sign-in").attr("disabled",true);
                    $("#btn-sign-in").text("Processing");
                },

            success: function (data) {
                 $("#btn-sign-in").attr("disabled",false)
                 $("#btn-sign-in").text("Sign in");

                if (data.status) {
                    window.location.href = "/dashboard";
                } else if(data.message=="Please verify your email"){
                    window.location.href = "/verify-email";
                }else{
                    toastr.error(data.message);
                }
            },
            error: function (err) {
                toastr.error('error'+err)
            }

        })




    }


    function confirmOtpApi(confirm_otp){
        var data = {
            "confirm-otp":confirm_otp,
        }
         $.ajax({
            url: '/verify-signup-otp',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#confirm-otp-btn").attr("disabled",true);
                    $("#confirm-otp-btn").text("Processing");
                },

            success: function (data) {

//                 $("#confirm-otp-btn").text("Submit");
                if (data.status) {
                    $("#confirm-otp-btn").attr("disabled",true);
                    $("#confirm-otp-btn").text("Submit");
                    toastr.success("OTP verified successfully",'', {
                        onHidden: function() {
                            window.location.href = "/login";
                        }
                        });
                } else {
                     $("#confirm-otp-btn").attr("disabled",false);
                    $("#confirm-otp-btn").text("Submit");
                    toastr.error(data.message)
                }
            },
            error: function (err) {
                 $("#confirm-otp-btn").attr("disabled",false);
                    $("#confirm-otp-btn").text("Submit");
                toastr.error('error'+err)
            }
        });
    }

    function sendOtpApi(email){
        var data = {
            "email":email
        }

        $.ajax({
            url: '/forgot-password-api',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#send-otp-btn").attr("disabled",true);
                    $("#send-otp-btn").text("Processing");
                },

            success: function (data) {
                if (data.status) {
                    $("#send-otp-btn").text("Send OTP");

                     toastr.success("OTP sent to your email id",'', {
                        onHidden: function() {
                             window.location.href = "/verify-otp";
                        }
                        });
                } else {
                    $("#send-otp-btn").attr("disabled",false);
                    $("#send-otp-btn").text("Send OTP");
                    toastr.error(data.message)
                }
            },
            error: function (err) {
                $("#send-otp-btn").attr("disabled",false);
                $("#send-otp-btn").text("Send OTP");
                toastr.error('error'+err)
            }
        });
    }

    function changePasswordApi(otp, password){
        var data = {
            "confirmation_Code":otp,
            "password":password,
        }
        $.ajax({
            url: '/confirm-forgot-password',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#forgot-password-btn").attr("disabled",true);
                    $("#forgot-password-btn").text("Processing");
                },

            success: function (data) {

                if (data.status) {
                 $("#forgot-password-btn").text("Submit");
                     toastr.success("Password changed successfully",'', {
                        onHidden: function() {
                            window.location.href = "/login";
                        }
                        });
                } else {
                     $("#forgot-password-btn").attr("disabled",false);
                    $("#forgot-password-btn").text("Submit");
                    toastr.error(data.message)
                }
            },
            error: function (err) {
                $("#forgot-password-btn").attr("disabled",false);
                $("#forgot-password-btn").text("Submit");
                toastr.error('error'+err)
            }
        });
    }

    function updateAdminStatus(id, val){
        var data = {
        "id" : id,
        "value":val
    }
         var token = $("#acess-token").val();

         $.ajax({
            headers: {"token": token},
            url: '/update-admin-status',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),

            success: function (data) {

                if (data.status) {
                   toastr.success(data.message);
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


    function superAdminLoginApi( email, password){
        var data = {
            "email":email,
            "password":password
        }
         $.ajax({
            url: '/super-admin-login',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#btn-sign-in-sa").attr("disabled",true);
                    $("#btn-sign-in-sa").text("Processing");
                },

            success: function (data) {
                 $("#btn-sign-in-sa").attr("disabled",false)
                 $("#btn-sign-in-sa").text("Sign in");

                if (data.status) {
                    window.location.href = "/dashboard";
                } else {
                    toastr.error(data.message);
                }
            },
            error: function (err) {
                toastr.error('error'+err)
            }

        })
    }

    function deleteAdmin(id){
        var data = {
            "id":id
        }
        var token = $("#acess-token").val();
        swal({
            title: "Are you sure?",
            text: "deleted admin can not be created again !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    $.ajax({
                            headers: {"token": token},
                            url: "/delete-admin",
                            method: "POST",
                            processData: false,
                             contentType: "application/json",
                                data: JSON.stringify(data),
                            success: function (data) {
                                if(data['status']){
                                     swal("Admin deleted", {
                                            icon: "success",
                                     });
                                      window.location.href="/employee-list";
                                 }else{

                                    }
                                }
                            });
                } else {
                    swal("Admin's data is safe");
                }
            });
    }

    function sendVerifyOtpApi(email){
         var data = {
            "email":email
        }

        $.ajax({
            url: '/send-verification-otp',
            type: 'POST',
            processData: false,
            contentType: "application/json",
            data: JSON.stringify(data),
             beforeSend: function (xhr, settings) {
                    $("#send-verification-otp").attr("disabled",true);
                    $("#send-verification-otp").text("Processing");
                },

            success: function (data) {

                if (data.status) {
                $("#send-verification-otp").text("Send OTP");
                    toastr.success("OTP successfully sent to your email ID",'', {
                        onHidden: function() {
                            window.location.href = "/login";
                        }
                        });
                    window.location.href = "/confirm-otp";
                } else {
                    $("#send-verification-otp").attr("disabled",false);
                    $("#send-verification-otp").text("Send OTP");
                    toastr.error(data.message)
                }
            },
            error: function (err) {
                $("#send-verification-otp").attr("disabled",false);
                $("#send-verification-otp").text("Send OTP");
                toastr.error('error'+err)
            }
        });

    }

    function validateEmail(email){
        console.log("valid email");
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }


    function validatePhoneNumber(phoneNumber){
      return String(phoneNumber)
        .match(
        /^([0-9][0-9]{9})$/
        );
    }

    function validatePaswword(phoneNumber){
      return String(phoneNumber)
        .match(
        /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9!@#$%^&*]{8,50}$/
        );
    }


    function validateUsername(phoneNumber){
      return String(phoneNumber)
        .match(
       /^([a-zA-Z0-9]{8,30})$/
        );
    }


});