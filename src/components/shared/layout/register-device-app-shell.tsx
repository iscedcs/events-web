"use client";

import { useRegisterPushDevice } from "@/hooks/useRegisterPushDevice";

export function RegisterDeviceAppShell({ children }: React.PropsWithChildren) {
	const { error } = useRegisterPushDevice();

	return <>{children}</>;
}
