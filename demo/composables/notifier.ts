import { useSubscription } from '../../src/subscription';

const notifier = useSubscription(0);

export function useNotifier() {
	return {
		$on: notifier.$addSub,
		$off: notifier.$deleteSub,
		$emit: notifier.$set,
		$state: notifier.$read
	};
}
