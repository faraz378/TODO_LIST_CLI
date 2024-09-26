#! /usr/bin/env node

import inquirer from "inquirer";

let todos: string[] = [];
let condition = true;

while(condition) {
        let todo_choices = await inquirer.prompt([
            {
                name: 'select',
                type: 'list',
                message: 'Select an option:',
                choices:["Add Items", "Update Todo List", "View Todo List", "Delete Items", "Exit form List"],
            },
        ]);

        if (todo_choices.select === "Add Items") {
            let addTodo = await inquirer.prompt({
                name: 'todo',
                type: 'input',
                message: 'Add Items in the List',
                validate: function (input) {
                    if (input.trim() == "") {
                        return "Pleace Enter a non-empty items."
                    }
                    return true;
                },
            });
            if (addTodo.todo.trim() !== "") {
                todos.push(addTodo.todo);
                todos.forEach((todo) => console.log());
            }
        }

        if (todo_choices.select === "Update Todo List") {
            let updateTodo = await inquirer.prompt({
                name: 'todo',
                type: 'list',
                message: 'Update Items in the List',
                choices:todos.map((item) => item),
            });
            let addTodo =await inquirer.prompt({
                name: 'todo',
                type: 'input',
                message: 'Add Items in the List',
            });
            let newTodo =todos.filter((val) => val !== updateTodo.todo);
            todos = [...newTodo, addTodo.todo];
            todos.forEach((todo) => console.log());
        }

        if (todo_choices.select === "View Todo List") {
            console.log('<<< TO-DO LIST>>>');
            todos.forEach((todo) => console.log(todo));
        }

        if (todo_choices.select === "Delete Items") {
            let deleteTodo = await inquirer.prompt({
                name: 'todo',
                type: 'list',
                message: 'Select Item to Delete',
                choices: todos.map((item) => item),
            });
            let newTodo = todos.filter((val) => val !== deleteTodo.todo);
            todos = [...newTodo];
            todos.forEach((todo) => console.log(todo));
        }

        if (todo_choices.select === "Exit form List") {
            console.log("Exiting program");
            condition = false;
        }
}