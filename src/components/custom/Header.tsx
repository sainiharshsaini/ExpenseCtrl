import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '../ui/button'
import { checkUser } from '@/lib/checkUser'
import Link from 'next/link'

const Header = async () => {
  await checkUser(); // i am calling it here because its a first component it will check the user and save the user details in the db

  return (
    <header className="fixed top-0 w-full flex justify-end items-center p-4 gap-4 h-16 border-b z-50 bg-white shadow-2xs">
      <nav>
        <Link href={"/"}>ExpenseCtrl</Link>
      </nav>
      <SignedIn>
        <Link href={"/dashboard"}>
        Dashboard
        </Link>
      </SignedIn>
      <SignedOut>
        {/* this forceRedirectUrl redirect the user to its dashboard after login */}
        <SignInButton forceRedirectUrl="/dashboard"> 
        <Button variant={'outline'}>Login</Button>
        </SignInButton>
        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}

export default Header