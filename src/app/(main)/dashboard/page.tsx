import { getUserBankAccounts } from '@/actions/dashboard'
import { CreateAccountDrawer } from '@/components/custom/CreateAccountDrawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'
import UserBankAccountCard from './_components/UserBankAccountCard'

const DashboardPage = async () => {
  const userBankAccounts = await getUserBankAccounts();

  return (
    <div className='px-5'>
      <div>
        <CreateAccountDrawer>
          <Card>
            <CardContent>
              <Plus className='h-10 w-10' />
              <p className='text-sm font-medium'>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        {/* get all user's bank's accounts */}
        {(userBankAccounts ?? []).length > 0 && (userBankAccounts ?? []).map((account) => {
          return <UserBankAccountCard key={account.id} account={account} />
        })}
      </div>
    </div>
  )
}

export default DashboardPage