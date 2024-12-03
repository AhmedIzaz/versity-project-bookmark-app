import Image from 'next/image'

 const AuthContainer = ({ children }: TChildren) =>  {
    return (
        <div className={'h-dvh w-full p-[26px]'}>
            <div className={'bg-[#FEFEFE] h-full rounded-2xl p-5 grid grid-cols-2'}>
                <div className={'relative h-full w-full rounded-2xl overflow-hidden'}>
                    <Image
                        src={'/logos/bookmark_app_logo.png'}
                        alt={'did_signage_cover_bg'}
                        fill={true}
                        objectFit={'cover'}
                        priority={true}
                    />
                </div>
                <div className={'p-4'}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthContainer