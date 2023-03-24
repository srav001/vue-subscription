import { dynamicallyExecuteFunction } from './functions/helpers';
import { ref, shallowRef, readonly } from 'vue';

/**
 * It takes a value and returns an object with a value property that is a shallowRef of the value.
 * passed in, and Subscribers(function) are added to a list to be executed when the value is changed.
 * @param {T} value - T - The initial value of the subscription.
 * @returns A function that returns an object with a shallow reactive value, a subscriber and a
 * few extra methods.
 */
export function useSubscription<T>(value: T, deep = false) {
	if (value === undefined) {
		throw new Error('No value provided, Initial value is required');
	}

	const _subRef = deep === false ? shallowRef(value) : ref(value);
	type SubType = typeof _subRef.value;

	type Subscriber = (val: SubType) => Promise<void> | void;
	const _subscriptions: Set<Subscriber> = new Set();
	/**
	 * Takes a function as an argument and adds it to the subscriber list.
	 * @param subscriber - Subscriber
	 */
	function addSubscriber(subscriber: Subscriber) {
		if (typeof subscriber !== 'function') {
			throw new Error('Subscriber must be a function');
		}
		_subscriptions.add(subscriber);
	}
	/**
	 * It deletes an event/subscriber from the subscriptions list.
	 * @param subscriber - Subscriber
	 */
	function deleteSubscriber(subscriber: Subscriber) {
		_subscriptions.delete(subscriber);
	}
	/**
	 * It loops through the Set of subscribers and executes each function with the value passed in as
	 * an argument
	 * @param {SubType} val - The value that is being passed to the subscribers.
	 */
	function triggerSubscribers(val: SubType) {
		_subscriptions.forEach(dep => dynamicallyExecuteFunction(dep, val));
	}
	type ValueMutator = (val: SubType) => SubType;
	/**
	 * It mutates the $value - for complex types that are typeof object.
	 * @param mutator - (val: T) => T
	 */
	async function mutateSubscriber(mutator: ValueMutator) {
		if (typeof mutator !== 'function') {
			throw new Error('Mutation must be a function');
		}
		_subRef.value = await dynamicallyExecuteFunction(mutator, _subRef.value);
		triggerSubscribers(_subRef.value);
	}

	function setValue(val: SubType) {
		_subRef.value = val;
		triggerSubscribers(val);
	}

	return {
		get $value(): SubType {
			return _subRef.value;
		},
		set $value(val) {
			setValue(val);
		},

		$get(): SubType {
			return _subRef.value;
		},
		$set(val: SubType | ValueMutator) {
			if (typeof val === 'function') setValue(val(_subRef.value));
			else setValue(val);
		},

		/** ReadOnly version of value. Wraps the shallow ref in readonly */
		$read: readonly(_subRef),

		/**
		 * A Subscriber(function) is executed when the value is changed.
		 * @param subscriber - type Subscriber = (val: T) => Promise<void> | void;
		 */
		$addSub(subscriber: Subscriber) {
			addSubscriber(subscriber);
		},
		/**
		 * A method that allows you to delete a subscriber from the Set of subscribers.
		 * @param subscriber - Subscriber
		 */
		$deleteSub(subscriber: Subscriber) {
			deleteSubscriber(subscriber);
		},
		/**
		 * Manually trigger subscribers. Shouldn't be used unless explicity needed (rarely).
		 */
		$triggerSubs() {
			triggerSubscribers(_subRef.value);
		},

		/**
		 * It mutates the value of the object.
		 * @param mutator - (val: T) => T
		 */
		$mutate(mutator: ValueMutator) {
			if (typeof _subRef.value !== 'object') {
				throw new Error('Value passed is not an typeof object! Patch only accepts typeof object');
			}
			mutateSubscriber(mutator);
		}
	};
}
