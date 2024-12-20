window.addEventListener('load', () => {
    const form = document.querySelector('#new-task-form');
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector('#tasks');

    // Load existing tasks when the page loads
    loadTasks();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;

        if (!task) {
            alert('Please fill out a task');
            return;
        }

        // Add the new task
        addTask(task);
        
        // Clear the input
        input.value = '';
    });

    function addTask(taskText) {
        // Create task elements
        const task_el = document.createElement('div');
        task_el.classList.add("task");

        const task_content_el = document.createElement('div');
        task_content_el.classList.add("content");
        
        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        const task_action_el = document.createElement('div');
        task_action_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerHTML = 'Edit';

        const task_del_el = document.createElement('button');
        task_del_el.classList.add('delete');
        task_del_el.innerHTML = 'Delete';

        // Construct the task element
        task_content_el.appendChild(task_input_el);
        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_del_el);
        task_el.appendChild(task_content_el);
        task_el.appendChild(task_action_el);
        list_el.appendChild(task_el);

        // Add edit functionality
        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === 'edit') {
                task_input_el.removeAttribute('readonly');
                task_input_el.focus();
                task_edit_el.innerText = 'Save';
            } else {
                task_input_el.setAttribute('readonly', 'readonly');
                task_edit_el.innerText = 'Edit';
                saveTasks(); // Save when editing is complete
            }
        });

        // Add delete functionality
        task_del_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            saveTasks(); // Save after deletion
        });

        // Save the new task list
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task .text').forEach(task => {
            tasks.push(task.value);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTask(task));
    }
});