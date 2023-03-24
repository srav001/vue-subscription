import { useSubscription } from '../../src/subscription';

const myEventBus = useSubscription(0);

export function useEventBus() {
	return {
		$on: myEventBus.$addSub,
		$off: myEventBus.$deleteSub,
		$emit: myEventBus.$set,
		$state: myEventBus.$read
	};
}
