import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    console.log('[HomePage.tsx] Rendering homepage with links.');
    return (
        <div className="home-container">
            <header className="home-header">
                <h1>QO-DEMO 프로젝트</h1>
                <p>전체 데모 페이지 링크 목록</p>
                <p className="comment">각 페이지는 아이폰 프레임 안에서 보여집니다.</p>
            </header>

            <main>
                <section id="customer-pages">
                    <h2>👥 고객용 페이지 (QO-C)</h2>
                    <ul>
                        <li><span className="page-id">QO-C001</span> <Link to="/qo-c-001">Landing/Welcome Page</Link></li>
                        <li><span className="page-id">QO-C002</span> <Link to="/qo-c-002">Menu Catalog</Link></li>
                        <li><span className="page-id">QO-C003</span> <Link to="/qo-c-003">Item Details</Link></li>
                        <li><span className="page-id">QO-C004</span> <Link to="/qo-c-004">Shopping Cart</Link></li>
                        <li><span className="page-id">QO-C005</span> <Link to="/qo-c-005">Checkout</Link></li>
                        <li><span className="page-id">QO-C006</span> <Link to="/qo-c-006">Payment</Link></li>
                        <li><span className="page-id">QO-C007</span> <Link to="/qo-c-007">Order Status</Link></li>
                        <li><span className="page-id">QO-C008</span> <Link to="/qo-c-008">Order Confirmation</Link></li>
                    </ul>
                </section>

                <section id="staff-pages">
                    <h2>🛠️ 직원용 페이지 (QO-S)</h2>
                    <ul>
                        <li><span className="page-id">QO-S001</span> <Link to="/qo-s-001">Staff Login</Link></li>
                        <li><span className="page-id">QO-S002</span> <Link to="/qo-s-002">Staff Dashboard</Link></li>
                        <li><span className="page-id">QO-S003</span> <Link to="/qo-s-003">Order Management</Link></li>
                        <li><span className="page-id">QO-S004</span> <Link to="/qo-s-004">Kitchen Display</Link></li>
                        <li><span className="page-id">QO-S005</span> <Link to="/qo-s-005">Menu Management</Link></li>
                        <li><span className="page-id">QO-S006</span> <Link to="/qo-s-006">Table Management</Link></li>
                        <li><span className="page-id">QO-S007</span> <Link to="/qo-s-007">Customer Service</Link></li>
                        <li><span className="page-id">QO-S008</span> <Link to="/qo-s-008">Staff Analytics</Link></li>
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default HomePage;
