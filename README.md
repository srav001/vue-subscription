# vue-subscription

This is a TypeScript module for Vue.js, which provides a function `useSubscription` that returns an object with a reactive value, a subscriber, and a few extra methods.

The `useSubscription` function takes an initial value and returns an object with a reactive value of the initial value passed in, and Subscriber functions can be added to a Set of subscribers to be executed when the value is changed.

The module also includes methods to add, delete and trigger the subscribers as well as a method to mutate the value if it is a more complex datatype(typeof object).

## Usage

```typescript
const $mySubscription = useSubscription('hello'); // Type will be string

// Get the current value
console.log($mySubscription.$value); // 'hello'

function mySubscriber(value: string) {
	console.log(`The value is now: ${value}`);
}

// Add a subscriber
$mySubscription.$addSub(mySubscriber);
// Manually trigger the subscribers if needed(rarely)
$mySubscription.$triggerSubs(); // 'The value is now: hello'

// Set the value
$mySubscription.$value = 'world';

// Subscriber runs here -  'The value is now: world'

// Remove a subscriber (can be used in Unmount, beforeRouteLeave etc)
$mySubscription.$deleteSub(mySubscriber);

// Use the readonly version of the value
const myReadonlyValue = $mySubscription.$read;
console.log(myReadonlyValue.value); // 'world'
```

Example when using complex objects which won't be tracked deeply by default. Unless the subscriber is used in templates, watch, watchEffect and template you don't need to add the deep flag.

```typescript
const $mySubscription = useSubscription(
	{
		user: {
			name: 'John',
			isActive: false
		}
	},
	// You can pass `true` as the deep flag to make the subscription deeply reactive if used in templates
	true
);
// Add a subscriber
$mySubscription.$addSub(data => {
	console.log(`The data is now: ${JSON.stringify(data)}`);
});

function myMutator(data: typeof $mySubscription.$value) {
	data.user.isActive = true;
	return data;
}

// Trigger the subscribers
$mySubscription.$triggerSubs(); // 'The data is now: { user: { name: 'John', isActive: false }}'

function tester() {
	// Mutate the value (only works if the value is an object)
	$mySubscription.$mutate(myMutator);
	// Subscriber runs here -  'The data is now: { user: { name: 'John', isActive: true }}'
}
tester();
```

You can also destructure the properties to have a seperate getter and setter.

```typescript
const { $get, $set, $read, $addSub } = useSubscription('hello');

// Get the current value
console.log($get()); // 'hello'

function mySubscriber(value: string) {
	console.log(`The value is now: ${value}`);
}

// Add a subscriber
$addSub(mySubscriber);

// Set the value
$set('world');

// Subscriber runs here -  'The value is now: world'

$set(val => `Hello ${val}`);
// Subscriber runs here -  'The value is now: Hello world'

// Use the readonly version of the value
console.log($read.value); // 'Hello world'
```
