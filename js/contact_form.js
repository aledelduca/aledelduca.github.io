/*!
    * Start Bootstrap - Resume v6.0.1 (https://startbootstrap.com/template-overviews/resume)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
    */
    
$.fn.serializeObject = function()
{
    let o = {};
    let a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            if (this.name !== 'g-recaptcha-response') {
                o[this.name] = this.value || '';
            }
        }
    });

    return o;
};



$(document).ready(function() {
    $("#contact-form").validate({
        rules: {
            fullName : {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 30,
                maxlength: 5000
            },
            consent: {
                required: true
            }
        }
    });
});


jQuery.validator.setDefaults({
    errorElement: 'span',
    errorPlacement: function(error, element) {
        error.addClass('invalid-feedback');
        element.closest('.form-group').append(error)
    },
    highlight: function(element, errorClass, validClass){
        $(element).addClass('is-invalid');
    },
    unhighlight: function(element, errorClass, validClass){
        $(element).removeClass('is-invalid');
    }
})

let contactForm = $( "#contact-form[name!=g-recaptcha-response]" );


function contactSuccess(data){
    let thanksDiv = $("#thanks");
    thanksDiv.append(`<p>Hi, ${data.fullName}. Thank you for getting in touch.</p>`);
    thanksDiv.append(`<p>Your inquiry has correctly been sent. I will write you back in the next couple of days.</p>`);
    $("#contact-form").hide();
    thanksDiv.show();
}


$(document).ready(function(){
    contactForm.on("submit", function(e){
        e.preventDefault();

        if(!contactForm.valid()) {
            e.preventDefault();
            return false;
        }
        if (hcaptcha.getResponse() === "") {
            e.preventDefault();
            $('#hcaptcha').addClass('is-invalid');
            return false;
        }

        let raw_data = contactForm.serializeObject();
        let data = JSON.stringify(raw_data);

        let {fullName, email} = raw_data;
        let t_data = {fullName, email};

        $.ajax({
            type: 'POST',
            url: 'https://on05xi21z3.execute-api.eu-central-1.amazonaws.com/verifyContactForm',
            data: data,
            success: contactSuccess(t_data),
            contentType: "application/json",
            dataType: 'json'
        });

        // console.log(data)

    });
});

function hcaptchaCallback() {
    $('#hcaptcha').removeClass('is-invalid');
}
