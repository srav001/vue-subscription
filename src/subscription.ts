import { dynamicallyExecuteFunction } from './functions/helpers';
import { ref, shallowRef, readonly } from 'vue';
import type { Ref, ShallowRef } from 'vue';

/**
 * It takes a value and returns an object with a value property that is a shallowRef/ref of the value
 * passed in and Subscribers(function) are added to a list to be executed when the value is changed.
 * @example useSubscription<T>(value: T, deep = false)
 * @param {T} value - T - The initial value of the subscription.
 * @param {boolean} deep - T - If it should be deep reactivity. By default it is Shallow.
 * @returns A function that returns an object with a shallow/deep reactive value, a subscriber and a
 * few extra methods.
 */
export function useSubscription<T, D extends boolean = false>(value: T, deep: D = false as D) {
	if (value === undefined) {
		throw new Error('No value provided, Initial value is required');
	}

	type SubType = D extends false ? ShallowRef<T> : Ref<T>;
	const _subRef = (deep === false ? shallowRef(value) : ref(value)) as SubType;
	type SubValue = SubType['value'];

	type Subscriber = (val: SubType) => Promise<void> | void;
	const _subscriptions: Set<Subscriber> = new Set();
	/**
	 * It loops through the Set of subscribers and executes each function with the value passed in as
	 * an argument
	 * @param {SubType} val - The value that is being passed to the subscribers.
	 */
	function triggerSubscribers(val: SubValue) {
		_subscriptions.forEach(dep => dynamicallyExecuteFunction(dep, val));
	}

	function setValue(val: T) {
		_subRef.value = val;
		triggerSubscribers(val);
	}
	return {
		get $value(): SubValue {
			return _subRef.value;
		},
		set $value(val: T) {
			setValue(val);
		},

		$get(): SubValue {
			return _subRef.value;
		},
		$set<V extends SubValue | ((val: SubValue) => SubValue)>(val: V) {
			if (typeof val === 'function') setValue(val(_subRef.value));
			else setValue(val as SubValue);
		},

		/** ReadOnly version of value. Wraps the ref in readonly */
		$read: readonly(_subRef),

		/**
		 * A Subscriber(function) is executed when the value is changed.
		 * @param subscriber - type Subscriber = (val: T) => Promise<void> | void;
		 */
		$addSub(subscriber: Subscriber) {
			if (typeof subscriber !== 'function') {
				throw new Error('Subscriber must be a function');
			}
			_subscriptions.add(subscriber);
		},
		/**
		 * A method that allows you to delete a subscriber from the Set of subscribers.
		 * @param subscriber - Subscriber
		 */
		$deleteSub(subscriber: Subscriber) {
			_subscriptions.delete(subscriber);
		},
		/**
		 * Manually trigger subscribers. Shouldn't be used unless explicity needed (rarely).
		 */
		$triggerSubs() {
			triggerSubscribers(_subRef.value);
		},
		/**
		 * Clears all subscribers. Easy for cleanup in beforeUnmount.
		 */
		$clearSubs() {
			_subscriptions.clear();
		},

		/**
		 * It mutates the value of the object.
		 * @param mutator - (val: T) => T
		 * @param mutator - (val: T) => Promise<T>
		 */
		async $mutate(mutator: (val: SubValue) => SubValue | Promise<SubValue>) {
			if (typeof _subRef.value !== 'object') {
				throw new Error('Value passed is not an typeof object! $mutate only accepts `typeof object`');
			}
			if (typeof mutator !== 'function') {
				throw new Error('Mutator must be a function');
			}
			_subRef.value = await dynamicallyExecuteFunction(mutator, _subRef.value);
			triggerSubscribers(_subRef.value);

			return _subRef.value;
		}
	};
}
