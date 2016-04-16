var track = function(event_name, data) {
    data["event_type"] = event_name;
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: "/event",
        data: JSON.stringify(data),
        success: function(data, status, xhr) {
            console.log(data);
        },
        error: function(xhr, status, error) {
            console.error(status + " " + error);
        }
    });
}

module.exports = { track };
