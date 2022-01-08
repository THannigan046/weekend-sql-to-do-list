console.log('js');

$(document).ready(function () {
    console.log('JQ');
    //clickListeners()
    getTasks();
    $(document).on('click', '.deleteButton', deleteTask);

});

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
        $('#taskList').append(`
        <tr>
        <td class= "tablerow">${tasks.name}</td>
        <td class= "tablerow">${tasks.complete}</td>
        <td class= "tablerow"><button id="deleteButton">delete</button></td>
        <td class= "tablerow"><button class="completeButton">complete</button></td>
        </tr>
        `)
    }
}

function deleteTask(){

}