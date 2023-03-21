/**
 * It takes a function and an argument, and if the function is an async function, it executes it with
 * the argument, otherwise it returns a resolved promise with the result of the function
 * @param {Function} func - The function to execute.
 * @param {T} arg - The argument to pass to the function.
 * @returns A promise that resolves to the result of the function.
 */
export async function dynamicallyExecuteFunction<T>(func: Function, arg: T) {
  if (func.constructor.name === 'AsyncFunction') {
    return func(arg);
  }

  return Promise.resolve(func(arg));
}
