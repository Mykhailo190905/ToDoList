function addCloseButton(li) {
    const span = $("<SPAN>").addClass("close btn btn-danger btn-sm float-end").text("×");
    li.append(span);

    span.on("click", (event) => {
        event.stopPropagation(); 
        li.remove();
        saveListToStorage();
    });
}

function openModal(task) {
    const modal = new bootstrap.Modal($("#taskModal")[0]);
    const taskTitle = $("#taskTitle");
    const taskDescription = $("#taskDescription");
    const saveButton = $("#saveTask");

    taskTitle.val(task.find('.task-text').text());
    taskDescription.val(task.data("description") || "");

    saveButton.on("click", () => {
        task.find('.task-text').text(taskTitle.val());
        task.data("description", taskDescription.val());

        modal.hide(); 
        saveListToStorage(); 
    });

    modal.show();
}

function newElement() {
    const inputValue = $("#myInput").val().trim();

    if (!inputValue) {
        alert("Please write something!");
        return;
    }

    const li = $("<li>").addClass("list-group-item");

    const spanText = $("<SPAN>").addClass("task-text").text(inputValue);
    li.append(spanText);

    li.data("description", "");

    addCloseButton(li);

    li.on("click", () => openModal(li));

    $("#myUl").append(li);

    $("#myInput").val("");
    saveListToStorage(); 
}

function saveListToStorage() {
    const todos = [];

    $("li").each(function () {
        const text = $(this).find('.task-text').text();
        todos.push({
            text: text,
            description: $(this).data("description") || "",
            checked: $(this).hasClass("checked"),
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadListFromStorage() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const todos = JSON.parse(storedTodos);

        todos.forEach((todo) => {
            const li = $("<li>").addClass("list-group-item");

            const spanText = $("<SPAN>").addClass("task-text").text(todo.text);
            li.append(spanText);

            li.data("description", todo.description);

            if (todo.checked) {
                li.addClass("checked");
            }

            addCloseButton(li);

            li.on("click", () => openModal(li));

            $("#myUl").append(li);
        });
    }
}

$(document).ready(function () {
    loadListFromStorage();

    $("#addBtn").on("click", newElement);
});
