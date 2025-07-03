import CreateAccountDrawer from '@/components/custom/CreateAccountDrawer'
import { Card, CardContent } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import React from 'react'

const DashboardPage = () => {
  return (
    <div className='px-5'>
      <div>
        <CreateAccountDrawer>
          <Card>
            <CardContent>
              <Plus className='h-10 w-10'/>
              <p className='text-sm font-medium'>Add New Account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>
      </div>
    </div>
  )
}

export default DashboardPage