import AccountSettingsDisplay from '@/components/pages/user/me/profile/account-settings-display';
import Header from '@/components/shared/layout/header';
import { getCurrentUser } from '../../../../../../actions/auth';
import { getUserByID } from '../../../../../../actions/user';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Account Settings",
};

export default async function AccountSettings() {
    const me = await getCurrentUser();
    const user = await getUserByID(me?.id ?? "");
    return (
        <div>
            <Header hasBack title={"Account Settings"} user={user} />
            <div className=" px-[10px] pt-[70px]">
                <AccountSettingsDisplay />
            </div>
        </div>
    )
}
