 import React from 'react'

 import { getLoggedInUser } from '@/lib/actions/user.actions'

 import HeaderBox from '@/components/HeaderBox'
 import TotalBalanceBox from '@/components/TotalBalanceBox'
 import RightSidebar from '@/components/RightSidebar'

const Home = async () => {
  const loggedIn = await getLoggedInUser()

  console.log('loggedIn', loggedIn)

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type='greeting'
            title='Welcome'
            user={loggedIn?.name || 'Guest'}
            subtext='Access and manage your account and transactions efficiently. '
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        recent transactions
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 123.45 }, { currentBalance: 870.15 }]}
      />
    </section>
  )
}

export default Home
