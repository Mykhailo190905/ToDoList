"use strict";

function addCloseButton(li) {
  var span = $("<SPAN>").addClass("close btn btn-danger btn-sm float-end").text("×");
  li.append(span);
  span.on("click", function (event) {
    event.stopPropagation();
    li.remove();
    saveListToStorage();
  });
}
function openModal(task) {
  var modal = new bootstrap.Modal($("#taskModal")[0]);
  var taskTitle = $("#taskTitle");
  var taskDescription = $("#taskDescription");
  var saveButton = $("#saveTask");
  taskTitle.val(task.find('.task-text').text());
  taskDescription.val(task.data("description") || "");
  saveButton.on("click", function () {
    task.find('.task-text').text(taskTitle.val());
    task.data("description", taskDescription.val());
    modal.hide();
    saveListToStorage();
  });
  modal.show();
}
function newElement() {
  var inputValue = $("#myInput").val().trim();
  if (!inputValue) {
    alert("Please write something!");
    return;
  }
  var li = $("<li>").addClass("list-group-item");
  var spanText = $("<SPAN>").addClass("task-text").text(inputValue);
  li.append(spanText);
  li.data("description", "");
  addCloseButton(li);
  li.on("click", function () {
    return openModal(li);
  });
  $("#myUl").append(li);
  $("#myInput").val("");
  saveListToStorage();
}
function saveListToStorage() {
  var todos = [];
  $("li").each(function () {
    var text = $(this).find('.task-text').text();
    todos.push({
      text: text,
      description: $(this).data("description") || "",
      checked: $(this).hasClass("checked")
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function loadListFromStorage() {
  var storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    var todos = JSON.parse(storedTodos);
    todos.forEach(function (todo) {
      var li = $("<li>").addClass("list-group-item");
      var spanText = $("<SPAN>").addClass("task-text").text(todo.text);
      li.append(spanText);
      li.data("description", todo.description);
      if (todo.checked) {
        li.addClass("checked");
      }
      addCloseButton(li);
      li.on("click", function () {
        return openModal(li);
      });
      $("#myUl").append(li);
    });
  }
}
$(document).ready(function () {
  loadListFromStorage();
  $("#addBtn").on("click", newElement);
});