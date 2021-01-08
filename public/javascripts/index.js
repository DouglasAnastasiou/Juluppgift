console.log("Juluppgiften");
document.getElementById("readNote").style.display = "none"; 
document.getElementById("newNote").style.display = "none";

var userId;    
var notes;

function chooseUser(user) {
    userId = user;
    filterNotes(user);
    
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "none";
    document.getElementById("notesPage").style.display = "block";
    document.getElementById("newNote").style.display = "block";
    loadNote();
}

function showNotes() {
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "none";
    document.getElementById("notesPage").style.display = "block";
    document.getElementById("newNote").style.display = "block";
}

function loadData() {
    fetch("https://api.airtable.com/v0/appwTblDhsVN1pgvy/Table%201?api_key=keyv10w8g7DNwdSe1")
        .then(response => response.json())
        .then(data => notes = data.records)
}

function filterNotes(user) {
    var dummyNotes = [];
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].fields.userId == user) {
            
            dummyNotes.push(notes[i]);
        }
    }
    notes = dummyNotes; 
}

function loadNote() {
    
    var List = document.getElementById("notes");
    
    for (var i = 0; i < notes.length; i++) { 
        
        var note = document.createElement("div");
        var title = document.createElement("h3");
        var created = document.createElement("p");
        var edited = document.createElement("p");
        var titleNode = document.createTextNode(notes[i].fields.title);
        var createdNode = document.createTextNode("created: " + notes[i].fields.created);
        var editedNode = document.createTextNode("edit: " + notes[i].fields.edit);
    
        title.appendChild(titleNode);
        created.appendChild(createdNode);
        edited.appendChild(editedNode);
        note.appendChild(title);
        note.appendChild(created);
        note.appendChild(edited);
        note.setAttribute("onclick","openEditor(" + i + ")");
        note.setAttribute("class", "notes");
        note.className = "col-sm-6 notering";
        
        List.appendChild(note);
        
    }
}

function openEditor(id) {
    if (id=="new") {
       
       
        document.getElementById("Content").value = "";
        
        document.getElementById("save").setAttribute("onclick", "createNote()");
    } else {
        
        
        document.getElementById("Content").value = notes[id].fields.content;
        document.getElementById("save").setAttribute("onclick", "editNote(" + id + ")");
    }
   
    document.getElementById("users").style.display = "none";
    document.getElementById("readNote").style.display = "block";
    document.getElementById("notesPage").style.display = "none";
}

function createNote() {
   
    fetch(`https://api.airtable.com/v0/appwTblDhsVN1pgvy/Table%201?api_key=keyv10w8g7DNwdSe1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "records": [
                  {
                      "fields": {
                          "Name": "created with code",
                          "title": document.getElementById("Title").value,
                          "content": document.getElementById("Content").value,
                          "created" : Date.now(),
                          "edit": Date.now(),
                          "userId":  userId
                      }
                  }
              ]
          })
        })
        .then(response => response.json())
        loadData();
}

function editNote(id) {
    fetch(`https://api.airtable.com/v0/appwTblDhsVN1pgvy/Table%201?api_key=keyv10w8g7DNwdSe1`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "records": [
                  {
                        "id": notes[id].id,
                        "fields": {
                          "Name": "created with code",
                          "title": document.getElementById("Title").value,
                          "content": document.getElementById("Content").value,
                          "edit": Date.now(),
                          "userId":  userId
                      }
                  }
              ]
          })
        })
        .then(response => response.json())
}

window.onload = loadData;