import { MdOutlinePassword } from 'react-icons/md'
import { getAuthInfo } from '../../../../../../actions/auth'
import { OctagonX } from 'lucide-react'
import { Metadata } from 'next';
import Link from 'next/link';


export default async function AccountSettingsDisplay() {
    return (
        <div className=' flex flex-col gap-4'>
            <Link href={"account-settings/reset-password"} className=" flex flex-row gap-6 items-center rounded-[10px] py-[15px] px-[20px] bg-secondary w-full">
                <div className="">
                    <MdOutlinePassword className=' w-6 h-6' />
                </div>
                <div className="">
                    <p className=' font-bold text-[18px]'>Reset Password</p>
                    <p className=' text-accent text-[13px]'>Manage your account's password</p>
                </div>

            </Link>
            <div className=" flex flex-row gap-6 items-center rounded-[10px] py-[15px] px-[20px] bg-secondary w-full">
                <div className="">
                    <OctagonX className=' w-6 h-6' />
                </div>
                <div className="">
                    <p className=' font-bold text-[18px]'>Delete Account</p>
                    <p className=' text-accent text-[13px]'>Manage your account's deletion and disabling</p>
                </div>

            </div>
        </div>
    )
}
