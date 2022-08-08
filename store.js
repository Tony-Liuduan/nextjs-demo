import { observable, action } from 'mobx';

class IndexStore {
	@observable count = 0;
	@action changeCount(val) {
		this.count += val;
	}
}

export default new IndexStore();
