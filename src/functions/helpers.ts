/**
 * It takes a function and an argument, and if the function is an async function, it executes it with
 * the argument, otherwise it returns a resolved promise with the result of the function
 * @param {Function} func - The function to execute.
 * @param {T} arg - The argument to pass to the function.
 * @returns A promise that resolves to the result of the function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export async function dynamicallyExecuteFunction<T = unknown>(func: Function, arg: unknown) {
	try {
		const result = func(arg);
		if (result instanceof Promise) {
			return (await result) as T;
		} else {
			return result as T;
		}
	} catch (err) {
		throw new Error('Function failed to run', { cause: err });
	}
}
