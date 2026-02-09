let items = [ // Список предустановленных задач
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

function createItem(item) { // Функция создает template новой задачи
	const template = document.querySelector("#to-do__item-template");
	const task = template.content.querySelector(".to-do__item").cloneNode(true);
	addHandlers(task);
	task.querySelector(".to-do__item-text").textContent = item;
	return task;
}

function addTask(taskText) { // Функция добавляет новую задачу
	const taskList = document.querySelector(".to-do__list");
	taskList.prepend(createItem(taskText));
	saveTasks();
}

function addHandlers(task) { // Функция добавляет обработчики событий для новой задачи
	const textElement = task.querySelector(".to-do__item-text");
	const deleteButton = task.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = task.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = task.querySelector(".to-do__item-button_type_edit");

	deleteButton.addEventListener('click', function() {
		deleteButton.closest(".to-do__item").remove();
		saveTasks();
	});

	duplicateButton.addEventListener('click', function() {
		const taskText = duplicateButton.closest(".to-do__item").querySelector(".to-do__item-text").textContent;
		addTask(taskText);
	});

	editButton.addEventListener('click', function() {
		const taskText = editButton.closest(".to-do__item").querySelector(".to-do__item-text");
		taskText.setAttribute('contenteditable', 'true');
		taskText.focus();
	});

	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable', 'false');
		saveTasks();
	});
}

function saveTasks() { // Функция сохраняет список задач в localStorage
	const tasksText = document.querySelectorAll(".to-do__item-text");
	const tasksList = [];
	tasksText.forEach((item) => tasksList.unshift(item.textContent));
	localStorage.setItem('tasks', JSON.stringify(tasksList));
}

function loadTasks() { // Функция загружает список задач из localStorage
	const tasksList = JSON.parse(localStorage.getItem('tasks'));
	if (tasksList === null || tasksList.length === 0) items.forEach((item) => addTask(item)); // Если в списке нет задач, то загружаем предустановленные
	else tasksList.forEach((item) => addTask(item));
}

function loadPage() { // Функция загружает страницу при открытии или перезапуске
	const form = document.querySelector(".to-do__form");
	const taskInput = document.querySelector(".to-do__input");
	loadTasks();
	
	form.addEventListener('submit', (event) => {
		event.preventDefault();
		if (taskInput.value.length !== 0) {
			addTask(taskInput.value);
			form.reset();
		}
	});
}

loadPage(); // Загрузка страницы