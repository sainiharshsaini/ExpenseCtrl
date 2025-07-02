import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className="fixed top-0 flex justify-end items-center p-4 gap-4 h-16">
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