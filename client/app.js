const fetchChirps = () => {
    $("#chirp-container").empty();
    $.ajax({
        url: "/api/chirps",
        dataType: "json"
    })
        .then(chirpArr => {
            chirpArr.forEach(chirp => {
                // generate a card for each chirp
                $("#chirp-container").append(`
                <div class="card my-3">
                    <div class="card-body">
                        <h5 class="card-title">${chirp.user}</h5>
                        <p class="card-text">${chirp.message}</p>
                    </div>
                    <svg onclick="deleteChirp(${chirp.id})" width="1em" height="1em" viewBox="0 0 16 16" class="delete-icon bi bi-trash float-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>

                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#launch-modal-${chirp.id}">
                        Edit
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="launch-modal-${chirp.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="edit-user-${chirp.id}">${chirp.user}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <textarea id="edit-message-${chirp.id}" class="form-text">${chirp.message}</textarea>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="editChirp(${chirp.id})">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            })
        })
}

const createChirp = () => {
    const newChirp = {
        user: $("#username").val(),
        message: $("#message").val()
    }

    $.ajax({
        url: "/api/chirps",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(newChirp)
    }).then(res => fetchChirps());
};

const deleteChirp = id => {
    $.ajax({
        url: `/api/chirps/${id}`,
        type: "DELETE"
    }).then(res => fetchChirps());
}

const editChirp = id => {
    console.log($(`#edit-user-${id}`).text())
    const newChirp = {
        user: $(`#edit-user-${id}`).text(),
        message: $(`#edit-message-${id}`).val()
    }

    $.ajax({
        url: `/api/chirps/${id}`,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(newChirp)
    })
        .then(res => {
            fetchChirps();
            $(`#launch-modal-${id}`).modal("hide");
        })
}

fetchChirps();
$("#create-chirp-btn").click(createChirp);