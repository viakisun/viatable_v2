import React from 'react';
import IphoneFrame from '../components/IphoneFrame';
import { CheckCircle, Users, Link as LinkIcon, Star, Tv, Languages, DollarSign, Smartphone } from 'lucide-react';

// Import all page components
import QoC001 from './qo_c001_landing';
import QoC002 from './qo_c002_menu';
import QoC003 from './qo_c003_item_details';
import QoC004 from './qo_c004_cart';
import QoC005 from './qo_c005_checkout';
import QoC006 from './qo_c006_payment';
import QoC007 from './qo_c007_order_status';
import QoC008 from './qo_c008_confirmation';

const customerPages = [
  { id: 'QO-C001', title: 'Landing/Welcome Page', description: 'QR 스캔 후 첫 화면. 언어 선택(EN/KO), 테이블 정보, 실시간 시계, 핵심 기능 미리보기를 제공합니다.', Component: QoC001 },
  { id: 'QO-C002', title: 'Menu Catalog', description: '메뉴 카탈로그. 카테고리 필터, 검색, 실시간 가격 변환(AUD/KRW), 평점/리뷰를 표시합니다.', Component: QoC002 },
  { id: 'QO-C003', title: 'Item Details', description: '메뉴 상세 정보, 옵션 커스터마이징(빵, 계란 등), 수량 선택 및 특별 요청사항을 입력합니다.', Component: QoC003 },
  { id: 'QO-C004', title: 'Shopping Cart', description: '장바구니 관리, 수량 조절, 프로모 코드 적용 및 예상 조리시간을 표시합니다.', Component: QoC004 },
  { id: 'QO-C005', title: 'Checkout', description: '고객 정보 입력, 서비스 유형 선택, 다양한 결제 방법(Apple/Google Pay 등)을 선택합니다.', Component: QoC005 },
  { id: 'QO-C006', title: 'Payment', description: '실제 결제 처리. 카드 정보 마스킹, 256비트 SSL, 생체 인증(Touch/Face ID)을 지원합니다.', Component: QoC006 },
  { id: 'QO-C007', title: 'Order Status', description: '주문 상태(확인/조리중/픽업대기)를 실시간으로 추적하고 직원을 호출합니다.', Component: QoC007 },
  { id: 'QO-C008', title: 'Order Confirmation', description: '주문 완료 확인, QR 추적 코드, 로열티 포인트를 제공하며 재주문 기능을 지원합니다.', Component: QoC008 },
];

const ShowcaseItem = ({ id, title, description, Component }) => (
  <div className="showcase-item">
    <div className="page-title-container">
      <h3 className="page-title">{id}: {title}</h3>
      <p className="page-description">{description}</p>
    </div>
    <div className="frame-container">
      <IphoneFrame>
        <Component />
      </IphoneFrame>
    </div>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <div className="feature-icon">{icon}</div>
    <strong>{title}</strong>
    <p>{description}</p>
  </div>
);

const JourneyStep = ({ number, title, pageId }) => (
  <div className="journey-step">
    <div className="step-number">{number}</div>
    <div className="step-details">
      <div className="step-title">{title}</div>
      <div className="step-page-id">{pageId}</div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  console.log('[HomePage.tsx] Rendering showcase page...');
  return (
    <div className="showcase-container">
      <header className="showcase-header">
        <h1>QO-DEMO Application Showcase</h1>
        <p className="intro-text">A modern, QR-based smart dining solution designed to streamline the ordering process for both customers and staff.</p>
      </header>
      <main>
        <section className="showcase-section">
          <h2 className="section-title">🌟 Key Features</h2>
          <div className="features-grid">
            <FeatureCard icon={<Languages />} title="다국어 지원" description="영어/한국어 실시간 전환" />
            <FeatureCard icon={<DollarSign />} title="다중 통화" description="AUD/KRW 자동 변환" />
            <FeatureCard icon={<Smartphone />} title="모바일 최적화" description="스마트폰 우선 반응형 디자인" />
            <FeatureCard icon={<Tv />} title="실시간 기능" description="가격, 재고, 상태 실시간 업데이트" />
            <FeatureCard icon={<Users />} title="사용자 친화적" description="직관적 UI/UX, 이모지 활용" />
            <FeatureCard icon={<CheckCircle />} title="보안 강화" description="결제 보안, 생체 인증 지원" />
          </div>
        </section>

        <section className="showcase-section">
          <h2 className="section-title">🔄 완전한 고객 여정 (Customer Journey)</h2>
          <div className="journey-grid">
            <JourneyStep number="1" title="QR 스캔" pageId="QO-C001 환영 페이지" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="2" title="메뉴 탐색" pageId="QO-C002 메뉴 카탈로그" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="3" title="상품 선택" pageId="QO-C003 상품 상세" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="4" title="장바구니 관리" pageId="QO-C004 장바구니" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="5" title="정보 입력" pageId="QO-C005 체크아웃" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="6" title="결제 처리" pageId="QO-C006 결제" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="7" title="주문 추적" pageId="QO-C007 주문 상태" />
            <div className="journey-arrow">→</div>
            <JourneyStep number="8" title="완료 확인" pageId="QO-C008 주문 확인" />
          </div>
        </section>

        <section className="showcase-section">
          <h2 className="section-title">📱 고객용 페이지 (QO-C)</h2>
          {customerPages.map(page => <ShowcaseItem key={page.id} {...page} />)}
        </section>

        {/* The staff pages are not included in this showcase as per the user's provided text,
            but the structure is here if needed in the future. */}
      </main>
    </div>
  );
};

export default HomePage;
