import { observable, computed, action, autorun } from 'mobx';
import { observer } from 'mobx-react';
import { configure } from 'mobx';

configure({
	enforceActions: 'never',
});

class ObservableTodoStore {
	@observable todos = [];
	@observable pendingRequests = 0;

	constructor() {
		// makeObservable(this, {
		// 	todos: observable,
		// 	pendingRequests: observable,
		// 	completedTodosCount: computed,
		// 	report: computed,
		// 	addTodo: action,
		// });
		autorun(() => console.log(this.report));
	}

	@computed get completedTodosCount() {
		console.log('completedTodosCount fn');
		return this.todos.filter(todo => todo.completed === true).length;
	}

	@computed get report() {
		console.log('report fn');
		if (this.todos.length === 0) return '<none>';
		const nextTodo = this.todos.find(todo => todo.completed === false);
		return (
			`Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
			`Progress: ${this.completedTodosCount}/${this.todos.length}`
		);
	}

	@atciton addTodo(task) {
		this.todos.push({
			task: task,
			completed: false,
			assignee: null,
		});
		store.pendingRequests++;
		setTimeout(
			action(() => {
				this.todos.push({
					task: 'Random Todo ' + Math.random(),
					completed: false,
					assignee: null,
				});
				this.pendingRequests--;
			}),
			2000
		);
	}
}

const store = new ObservableTodoStore();

store.addTodo('read MobX tutorial');
store.addTodo('try MobX');
store.todos[0].completed = true;
store.todos[1].task = 'try MobX in own project';
store.todos[0].task = 'grok MobX tutorial';

const peopleStore = observable([{ name: 'Michel' }, { name: 'Me' }]);
store.todos[0].assignee = peopleStore[0];
store.todos[1].assignee = peopleStore[1];
peopleStore[0].name = 'Michel Weststrate';
console.log(store.todos);

const TodoList = observer(() => {
	const onNewTodo = () => {
		store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
	};

	return (
		<div>
			{store.report}
			<ul>
				{store.todos.map((todo, idx) => (
					<TodoView todo={todo} key={idx} />
				))}
			</ul>
			{store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
			<button onClick={onNewTodo}>New Todo</button>
			<small> (double-click a todo to edit)</small>
			{/* <RenderCounter /> */}
		</div>
	);
});

const TodoView = observer(({ todo }) => {
	const onToggleCompleted = () => {
		todo.completed = !todo.completed;
	};

	const onRename = () => {
		todo.task = prompt('Task name', todo.task) || todo.task;
	};

	return (
		<li onDoubleClick={onRename}>
			<input type='checkbox' checked={todo.completed} onChange={onToggleCompleted} />
			{todo.task}
			{todo.assignee ? <small> ({todo.assignee.name}) </small> : null}
			{/* <RenderCounter /> */}
		</li>
	);
});

export default TodoList;
