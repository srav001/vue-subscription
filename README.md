# vue-subscription

A type-safe 🔥, tiny ⭐️ & fast ⚡️ replacement for EventBus in Vue 💚. Compatible with Vue 2 ( 2.7.0 and above ) and Vue 3. Provides ESM and Common JS exports.

Find it on `npm` - https://www.npmjs.com/package/vue-subscription.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Type-Definition](#type-definition)
- [TLDR](#tldr)
- [Demo](#demo)

## Introduction

This [package](#https://www.npmjs.com/package/vue-subscription) provides a simple way to create reactive subscriptions that can be used to observe changes to a value and execute a list of subscribers when the value changes. It also includes methods to mutate the value and trigger subscribers manually. Only 1.26 kB or gzip: 0.63 kB.

The [useSubscription](#tldr) function takes an initial value and returns an object with a reactive value that is by default shallow and only deep when explicitly enabled. In addition to a value property, also provides `explicit getter and setter` if you like more control over the data.

## Installation

To use this package, you can install it via npm (or yarn or pnpm):

```sh
# In your console
npm install vue-subscription
```

```typescript
// In your file
import { useSubscription } from 'vue-subscription';
const $mySubscription = useSubscription('hello'); // Type will be string
```

## API

### $value / $get()

This property/method returns the current value of the subscription.

```typescript
const value = $mySubscription.$value;
const value = $mySubscription.$get();
```

### $value = val / $set(val)

This property/method sets the current value of the subscription.

```typescript
$mySubscription.$value = 42;
$mySubscription.$set(42);
```

The $set method can also accept a mutator function that takes the current value as an argument and returns the new value:

```typescript
$mySubscription.$set(value => value + 1);
```

### $read

This is a read-only version of the subscription value. It wraps the subscription in a readonly ref.

```typescript
const readonlySubscription = $mySubscription.$read;
console.log(readonlySubscription.value);
```

### $addSub

This method adds a subscriber to the subscription. A subscriber is a function that takes the new value as an argument and is executed whenever the value changes. The subscriber can be an `async` function.

```typescript
function logValue(value) {
	console.log(`New value: ${value}`);
}

$mySubscription.$addSub(logValue);
```

### $deleteSub

This method removes a subscriber from the subscription.

```typescript
subscription.$deleteSub(logValue);
```

### $triggerSubs

This method manually triggers all subscribers to the subscription. Should only be needed rarely.

```typescript
subscription.$triggerSubs();
```

### $mutate

This method mutates the subscription value with a mutator function. The mutator function takes the current value as an argument and returns the new value.

```typescript
subscription.$mutate(value => {
	value.name = 'John';
	return value;
});
```

## Usage

All examples given below can be copy pasted into a file and tried out if needed.

### Basic Example

```typescript
const $mySubscription = useSubscription('hello'); // Type will be string

// Get the current value
console.log($mySubscription.$value); // 'hello'

// Subscribers can `async`
async function mySubscriber(value: string) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`The value is now: ${value}`);
		}, 1);
	});
}

// Add a subscriber
$mySubscription.$addSub(mySubscriber);
// Manually trigger the subscribers if needed(rarely)
$mySubscription.$triggerSubs(); // 'The value is now: hello'

// Set the value
$mySubscription.$value = 'world';

// Subscriber runs here -  'The value is now: world'

// Remove a subscriber (can be used in onBeforeUnmount or beforeRouteLeave etc)
$mySubscription.$deleteSub(mySubscriber);

// Use the readonly version of the value
const myReadonlyValue = $mySubscription.$read;
console.log(myReadonlyValue.value); // 'world'
```

### Complex state

Example uses a complex objects which won't be tracked deeply by default. Unless the subscription is used in template, watch, watchEffect or computed you don't need to add the deep flag.

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

### Destructured ( Getter and Setter )

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

## Type-Definition

`T` is a generic.

```typescript
function useSubscription<T>(
	value: T,
	deep?: boolean
): {
	$value: T;
	$get: () => T;
	$set: (value: T | ((value: T) => T)) => void;
	$read: Readonly<Ref<T>>;
	$addSub: (subscriber: (value: T) => Promise<void> | void) => void;
	$deleteSub: (subscriber: (value: T) => Promise<void> | void) => void;
	$triggerSubs: () => void;
	$mutate: (mutator: (value: T) => T) => void;
};
```

## TLDR

### Arguments

value - The initial value of the subscription. Throws an error if value is absent.

deep (optional) - Whether to create a shallow or deep reactive subscription. Defaults to false. Unless the subscription is used in template, watch, watchEffect or computed you don't need to add the deep flag.

### Return Value

An object with the following properties (Type def above):

- $value - The current value of the subscription.
- $get - A function that returns the current value of the subscription.
- $set - A function that sets the value of the subscription. If a function is passed, it will receive the current value of the subscription as its argument and should return the new value.
- $read - A readonly reactive reference to the current value of the subscription.
- $addSub - A method for adding a subscriber to the subscription. It can be `async`. The subscriber is a function that will be executed whenever the value of the subscription changes. It can take the new value of the subscription as its argument.
- $deleteSub - A method for removing a subscriber from the subscription.
- $triggerSubs - A method for manually triggering all subscribers. Should only be needed rarely.
- $mutate - A method for updating the value of the subscription with a function that takes the current value as its argument and returns the new value. This should only be used for updating complex objects.

## Demo

The demo shows the subscription being used with the eventBus APIs. You can checkout the demo to test locally or on StackBlitz. Make sure to run `npm install` in the root folder or copy the Vue components over from the demo here :-  
https://github.com/srav001/vue-subscription/tree/main/demo
