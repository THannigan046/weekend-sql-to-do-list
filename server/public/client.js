console.log('js');

$(document).ready(function () {
    console.log('JQ');
    clickListeners()
    getTasks();
    $(document).on('click', '.deleteButton', deleteTask);

});

function clickListeners() {
    $('#addButton').on('click', function(){
        let name = $('#nameIn').val()
        if (name === ''){
            alert('make a task, ya dingus')
            return
        }
        let taskToSend = {
            name: name,
            complete: false
        }
        console.log('taskToSend is', taskToSend)
        $.ajax({
            method: 'POST',
            url: '/tasks', 
            data: taskToSend
        }).then((response) => {
            $('#nameIn').val('')
            getTasks()
        }).catch((error) => {
            console.log('post failed', error);
            
        })


    })
    $(document).on('click', '.deleteButton', deleteTask);

    $(document).on('click', '.completeButton', function() {
    console.log('in completeTask');
        let taskId = $(this).parents('tr').data('id');
        let complete = $(this).parents('tr').data('complete')
        $.ajax({
            method: 'PUT',
            url: `tasks/${taskId}`,
            data: {
                complete: true
            }
        }).then((response) => {
            console.log('put success', response);
            getTasks() 
        }).catch((err) => {
            console.log('put failed', err);
            
        })
    
    } )
}


function getTasks() {
console.log('in getTasks');
$.ajax({
    method: 'GET',
    url: '/tasks'
}).then((response) => {
    console.log('response is', response);
    renderTasks(response)
}).catch((error) => {
    console.log('get error', error);
    
});

} //end getTasks

function renderTasks(task) {
$('#taskList').empty();
console.log('task is', task);
    for (let i = 0; i < task.length; i += 1){
     let tasks = task[i]
     if (tasks.complete === false){
        $('#taskList').append(`
        <tr class= complete data-id = "${tasks.id}" data-complete = "${tasks.complete}">
        <td class= "tablerow">${tasks.name}</td>
        <td class= "tablerow">${tasks.complete}</td>
        <td class= "tablerow"><button class="completeButton">complete</button></td>
        <td class= "tablerow"><button class="deleteButton">delete</button></td>
        </tr>
        `)
     }
     else {
         $('#taskList').append(`
        <tr class= incomplete data-id = "${tasks.id}" data-complete = "${tasks.complete}">
        <td class= "tablerow">${tasks.name}</td>
        <td class= "tablerow">${tasks.complete}</td>
        <td class= "tablerow"><button class="deleteButton">delete</button></td>
        </tr>
        `)
     }
    }
}

function deleteTask(){
    let taskId = $(this).parents('tr').data('id');
    Swal.fire({
        title: 'Are you sure you want to delete this task?',
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't save`,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            $.ajax({
                method: 'DELETE', 
                url: `/tasks/${taskId}`
            }).then((response) => {
                console.log('delete success');
                getTasks();
            }).catch((err) => {
                console.log('delete failed', err);
                
            })
        } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info')
        }
    })


}

/* function completeTask() {

} */