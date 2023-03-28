/**
 * It takes a function and an argument, and if the function is an async function, it executes it with
 * the argument, otherwise it returns a resolved promise with the result of the function
 * @param {Function} func - The function to execute.
 * @param {T} arg - The argument to pass to the function.
 * @returns A promise that resolves to the result of the function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export async function dynamicallyExecuteFunction<T>(func: Function, arg: T) {
	try {
		const result = func(arg);
		if (result instanceof Promise) {
			return await result;
		} else {
			return result;
		}
	} catch (err) {
		throw new Error('Function failed to run', { cause: err });
	}
}
