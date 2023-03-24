# vue-subscription

This is a TypeScript module for Vue.js, which provides a function `useSubscription` that returns an object with a shallow reactive value, a subscriber, and a few extra methods.

The `useSubscription` function takes an initial value and returns an object with a reactive value property that is a shallowRef of the initial value passed in, and Subscriber functions can be added to a Set of subscribers to be executed when the value is changed.

The module also includes methods to add, delete and trigger the subscribers as well as a method to mutate the value of the object. The `useSubscription` also returns an internal object named `$sub` with all the methods except readonly without the prefix `$`.

## Usage

```typescript
function mySubscriber(value: string) {
	console.log(`The value is now: ${value}`);
}

function example() {
	const $mySubscription = useSubscription('hello');

	// Get the current value
	console.log($mySubscription.value); // 'hello'

	// Add a subscriber
	$mySubscription.$subscriber = mySubscriber;

	// Set the value
	$mySubscription.value = 'world';

	// Subscriber runs here -  'The value is now: world'

	// Manually trigger the subscribers if needed(rarely)
	$mySubscription.$triggerSubs(); // 'The value is now: world'

	// Remove a subscriber (can be used in Unmount, beforeRouteLeave etc)
	$mySubscription.$deleteSub(mySubscriber);

	// Use the readonly version of the value
	const myReadonlyValue = $mySubscription.$ref;
	console.log(myReadonlyValue.value); // { name: 'world', age: 30 }
}
```

Example when using complex objects which won't be tracked deeply by default

```typescript
function mySubscriber(data: object) {
	console.log(`The data is now: ${data}`);
}

function myMutator(data: object) {
	data.isActive = true;
	return data;
}

function example() {
	const $mySubscription = useSubscription({
		user: {
			name: Sravan,
			isActive: false
		}
	});

	// Get the current value
	console.log($mySubscription.value); // '{ user: { name: Sravan, isActive: false }}'

	// Add a subscriber
	$mySubscription.$subscriber = mySubscriber;

	// Trigger the subscribers
	$mySubscription.$triggerSubs(); // 'The data is now: { user: { name: Sravan, isActive: false }}'

	// Mutate the value (only works if the value is an object)
	$mySubscription.$mutate(myMutator);

	// Subscriber runs here -  'The data is now: { user: { name: Sravan, isActive: true }}'

	console.log($mySubscription.value); // '{ user: { name: Sravan, isActive: true }}'
}
```
