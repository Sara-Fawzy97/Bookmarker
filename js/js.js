var nameInput = document.getElementById('name');
var urlInput = document.getElementById('url');
var btn = document.getElementById('btn');
var alert = document.getElementById('alert');

var container;




if (localStorage.getItem("container") == null) {
    container = [];

} else {
    container = JSON.parse(localStorage.getItem("container"));
    display();
}


btn.onclick = function() {
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    //alert item || data
    var ai = " ";
    if (!nameInput.value || !urlInput.value) {
        ai += ' <div class="alert alert-success" role="alert"><h4 class="alert-heading">Note</h4><p>Please fill the form </p></div>';
        alert.innerHTML = ai;
    } else if (!urlInput.value.match(regex)) {
        ai += ' <div class="alert alert-success" role="alert"><h4 class="alert-heading">Note</h4><p> Check website url </p></div>';
        alert.innerHTML = ai;

    } else {
        add();
        display();

        //clear inputs 
        document.getElementById("form").reset();

    }

};

function add() {

    var bookmark = {
        nameInput: nameInput.value,
        urlInput: urlInput.value

    }
    container.push(bookmark);
    localStorage.setItem("container", JSON.stringify(container));

}


function display() {
    var ss = " ";

    for (var i = 0; i < container.length; i++) {
        ss += '<div class="well"> <h3>' + container[i].nameInput + '<a class="btn btn-default" href="' + container[i].urlInput +
            '">Visit</a><a class="btn btn-danger" onClick="Delete(' + i + ')" href="#"> Delete</a></h3></div>';

    }
    document.getElementById("results").innerHTML = ss;

}

function Delete(id) {
    container.splice(id, 1);
    localStorage.setItem("container", JSON.stringify(container));
    display();
}