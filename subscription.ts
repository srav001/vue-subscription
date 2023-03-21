import { dynamicallyExecuteFunction } from './utilities/helpers';
import type { DeepReadonly } from 'vue';

/**
 * It takes a value and returns an object with a value property that is a shallowRef of the value.
 * passed in, and Subscribers(function) are added to a Set of subscribers to be executed when the value is changed.
 * @param {T} value - T - The initial value of the subscription.
 * @returns A function that returns an object with a shallow reactive value, a subscriber and a
 * few extra methods.
 */
export function useSubscription<T>(value: T) {
  if (value === undefined) {
    throw new Error('No value provided, Initial value is required');
  }

  const _subRef = shallowRef(value);
  type SubType = typeof _subRef['value'];

  type Subscriber = (val: SubType) => Promise<void> | void | Promise<SubType> | SubType;
  const _subscriptions: Set<Subscriber> = new Set();
  /**
   * AddSubscriber() takes a function as an argument and adds it to the _subscriptions Set.
   * @param subscriber - Subscriber
   */
  function addSubscriber(subscriber: Subscriber) {
    if (typeof subscriber !== 'function') {
      throw new Error('Subscriber must be a function');
    }
    _subscriptions.add(subscriber);
  }
  /**
   * It deletes a custom effect from the subscriptions list.
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

  const extraHandlers = {
   
  };

  interface $Sub {
    triggerSubs: typeof extraHandlers['$triggerSubs'];
    /**
     * A Subscriber(function) is executed when the value is changed.
     * @param subscriber - type Subscriber = (val: SubType) => Promise<void> | void | Promise<SubType> | SubType;
     */
    subscriber: Subscriber;
    mutate: typeof extraHandlers['$mutate'];
    value: typeof _subRef['value'];
  }

  return {
    get value() {
      return _subRef.value;
    },
    set value(val) {
      _subRef.value = val;
      triggerSubscribers(val);
    },
    /** ReadOnly version of value. Wraps the shallow ref in readonly */
    $ref: readonly(_subRef),

    /**
     * A Subscriber(function) is executed when the value is changed.
     * @param subscriber - type Subscriber = (val: SubType) => Promise<void> | void | Promise<SubType> | SubType;
     */
    set $subscriber(subscriber: Subscriber) {
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
     * @param mutator - (val: SubType) => SubType
     */
    $mutate(mutator: (val: SubType) => SubType) {
      if (typeof _subRef.value !== 'object') {
        throw new Error('Value passed is not an typeof object! Patch only accepts typeof object');
      }
      _subRef.value = dynamicallyExecuteFunction(mutator, _subRef.value);
      triggerSubscribers(_subRef.value);
    }
    // Why must typescript be weird? Just to get intellisense for subscriptions.
  } as unknown as {
    $ref: DeepReadonly<$Sub['value']>;
    $subscriber: Subscriber;
    value: $Sub['value'];
    $sub: $Sub;
  } & typeof extraHandlers;
}
