import React from 'react';
import OrderHistory from './OrderHistory';
import AccountInformation from './AccountInformation';
import Wishlist from './Wishlist';

interface AccountOverviewProps { }

const AccountOverview: React.FC<AccountOverviewProps> = () => {
    return (
        <div>
            <h1>My Account</h1>
            <nav>
                <ul>
                    <li><a href="#order-history">Order History</a></li>
                    <li><a href="#account-information">Account Information</a></li>
                    <li><a href="#wishlist">Wishlist</a></li>
                </ul>
            </nav>
            <section id="order-history">
                <OrderHistory />
            </section>
            <section id="account-information">
                <AccountInformation />
            </section>
            <section id="wishlist">
                <Wishlist />
            </section>
        </div>
    );
};

export default AccountOverview;