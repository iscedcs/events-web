import React from 'react'
import { getAuthInfo, getCurrentUser } from '../../../../../../../actions/auth';
import { getUserByID } from '../../../../../../../actions/user';
import Header from '@/components/shared/layout/header';
import { Input } from '@/components/ui/input';
import { comparePassowrd } from '@/lib/utils';
import { useAuthInfo } from '@/hooks/use-auth-info';
import ResetPasswordForm from '@/components/forms/reset-password/reset-password-form';

export default async function ResetPassword() {
    const me = await getCurrentUser();
    const user = await getUserByID(me?.id ?? "");
    const session = await getAuthInfo()


    return (
        <div>
            <Header hasBack title={"Reset Password"} user={user} />
            <ResetPasswordForm hash={session?.user?.password ?? ""} />
        </div>
    )
}
