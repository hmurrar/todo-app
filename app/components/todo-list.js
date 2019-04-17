import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class TodoListComponent extends Component {
    newTodo = Ember.Object.create({
        title: '',
        isCompleted: false,
    });

    todos = [
        Ember.Object.create({
            title: '1',
            isCompleted: false,
        }),
        Ember.Object.create({
            title: '2',
            isCompleted: true,
        }),
        Ember.Object.create({
            title: '3',
            isCompleted: false,
        }),
    ];

    todoIndexToEdit;

    @tracked isEditFormHidden = true;

    @action onTitleChange(value) {
        this.newTodo.set('title', value);
    }

    @action onCompleteChange(value) {
        this.newTodo.set('isCompleted', value);
    }

    @action toggleEditForm(index) {
        this.todoIndexToEdit = index;
        const toEditTodo = this.todos[index];
        this.newTodo.set('title', toEditTodo.get('title'));
        this.newTodo.set('isCompleted', toEditTodo.get('isCompleted'));
        this.isEditFormHidden = false;
    }

    @action submitAddTodoForm() {
        const newTodo = Ember.Object.create({
            title: this.newTodo.get('title'),
            isCompleted: this.newTodo.get('isCompleted'),
        });
        if(this.isEditFormHidden) {
            this.todos.pushObject(newTodo);
        } else {
            this.todos[this.todoIndexToEdit].set('title', newTodo.title);
            this.todos[this.todoIndexToEdit].set('isCompleted', newTodo.isCompleted);
        }
        this.newTodo.set('title', '');
        this.newTodo.set('isCompleted', false);
        this.isEditFormHidden = true;
    } 
    
    @action toggleComplete(index) {
        const isCompleted = this.todos[index].isCompleted;
        this.todos[index].set('isCompleted', !isCompleted);
    }

    @action deleteTodo(index) {
        this.todos.removeAt(index, 1);
    }
}
