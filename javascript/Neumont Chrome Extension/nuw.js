$(document).ready(function() {
    $('button').hide();

    var siteURL = "https://lms.neumont.edu";
    // var token = "1~XggyFfURWxejADHEMC61i933hMgsp1P8SaZdFyIBEJJrqsP6Fi5F15p25wOFSzIW";
    var courses = "";
    var coursesArray = [];
    var assignments = {};
    var feedback = {};
    var token = {};

    $('#tokenBox').bind("input", function() {
        text = $(this).val();
        chrome.storage.local.set({
            'theToken': text
        });

        chrome.storage.local.get('theToken', function(storage) {
            token = storage.theToken;
        });
    }).trigger("input");
    $("#submit").click(function() {

        $.ajax({
            type: "GET",
            url: siteURL + "/api/v1/courses?access_token=" + token,
            success: function(requestResult) {
                // alert("successful");
                var courseStartDate = '2015-01-05';
                courses = requestResult;
                for (var i = 0; i < courses.length; i++) {
                    if (courses[i].start_at >= courseStartDate) {
                        coursesArray.push(courses[i].id);
                    };
                }
                console.log(coursesArray);

            },
            error: function(request, status, error) {
                console.log("request: " + request.responseText + " | status: " + status + " | error: " + error);
                console.log(request.status);

            }
        });

        for (var i = 0; i < coursesArray.length; i++) {
            $.ajax({
                type: "GET",
                url: siteURL + "/api/v1/courses/" + coursesArray[i] + "/assignments?access_token=" + token,
                success: function(requestResult) {
                    // alert("successful");
                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth() + 1;
                    var yyyy = today.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd;
                    }
                    if (mm < 10) {
                        mm = "0" + mm;
                    }
                    today = yyyy + '-' + mm + '-' + dd;

                    assignments = requestResult;
                    var anAssignment = "";

                    for (var i = 0; i < assignments.length; i++) {
                        if (assignments[i].due_at > today) {
                            console.log(assignments[i].name);
                            $('.to-do-list').append('<li><a>' + assignments[i].name + '<br><button class="notes">Notes</button><button class="questions">?</button> </a></li>');
                            $('button').hide();
                            showToDoList();
                        };
                    }
                },
                error: function(request, status, error) {
                    console.log("request: " + request.responseText + " | status: " + status + " | error: " + error);
                    console.log(request.status);
                }
            });
        }
    });

    function showToDoList() {
        $('.to-do-list li a').mouseenter(function() {
            var textArea = $(this).children('textarea');
            if (textArea !== undefined || textArea.val().length < 1) {
                $(this).children('button').show();
            } else {
                $('.notes').hide();
                console.log("no textbox");
            }
        });
        $('.to-do-list a').click(function() {
            console.log($(this).children('textarea'));
            if ($(this).children('textarea').length !== 0) {
                return;
            }
            var textArea = $('<textarea></textarea>');
            $(this).eq(0).append(textArea);
            $('.notes', $(this)).fadeTo('slow', .30);
            textArea.bind("input", function() {
                text = $(this).val();
            }).trigger("input");
        });

        $('.to-do-list li a').mouseleave(function() {
            $('.notes, .questions').hide();
        });
    };

    function showComingUp() {
        $('.coming_up li a').mouseenter(function() {
            var textArea = $(this).children('textarea');
            if (textArea !== undefined || textArea.val().length < 1) {
                $(this).children('button').show();
            } else {
                $('.notes').hide();
            }
        });
        $('.coming_up a').click(function() {
            console.log($(this).children('textarea'));
            if ($(this).children('textarea').length !== 0) {
                return;
            }
            var textArea = $('<textarea></textarea>');
            $(this).eq(0).append(textArea);
            $('.notes', $(this)).fadeTo('slow', .30);
            textArea.bind("input", function() {
                text = $(this).val();
            }).trigger("input");
        });

        $('.coming_up li a').mouseleave(function() {
            $('.notes, .questions').hide();
        });
    };

    function showRecentFeedback() {
        $('.recent_feedback li a').mouseenter(function() {
            var textArea = $(this).children('textarea');
            if (textArea !== undefined || textArea.val().length < 1) {
                $(this).children('button').show();
            } else {
                $('.notes').hide();
            }
        });
        $('.recent_feedback a').click(function() {
            console.log($(this).children('textarea'));
            if ($(this).children('textarea').length !== 0) {
                return;
            }
            var textArea = $('<textarea></textarea>');
            $(this).eq(0).append(textArea);
            $('.notes', $(this)).fadeTo('slow', .30);
            textArea.bind("input", function() {
                text = $(this).val();
            }).trigger("input");
        });

        $('.recent_feedback li a').mouseleave(function() {
            $('.notes, .questions').hide();
        });
    };
});
