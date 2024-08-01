import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateLayout, PublicLayout } from '@/layouts';
import FieldsSettings from '@/components/Admin/FieldsSettings';

const HomePage = lazy(() => import('@/pages/Public/Home'));
const ResultsPage = lazy(() => import('@/pages/Public/Results'));
const CheckoutPage = lazy(() => import('@/pages/Public/Checkout'));
const FaqPage = lazy(() => import('@/pages/Public/Faq'));
const ContactPage = lazy(() => import('@/pages/Public/Contact'));
const PrivacyPage = lazy(() => import('@/pages/Public/Privacy'));
const LoginPage = lazy(() => import('@/pages/Public/Login'));
const ForgotPage = lazy(() => import('@/pages/Public/Forgot'));
const ResetPage = lazy(() => import('@/pages/Public/Reset'));
const SearchesPage = lazy(() => import('@/pages/Public/Searches'));
const ThankYouPage = lazy(() => import('@/pages/Public/ThankYou'));
const Terms = lazy(() => import('@/pages/Public/Terms'));

const OrdersPage = lazy(() => import('@/pages/Private/Orders'));
const CouponsPage = lazy(() => import('@/pages/Private/Coupons'));
const SettingsPage = lazy(() => import('@/pages/Private/Settings'));
const UsersPage = lazy(() => import('@/pages/Private/Users'));
const ContactsPage = lazy(() => import('@/pages/Private/Contacts'));
const PagesPage = lazy(() => import('@/pages/Private/Pages'));
const PageEditorPage = lazy(() => import('@/pages/Private/Pages/Editor'));

const NotFoundPage = lazy(() => import('@/pages/Error/NotFound'));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="fields" element={<FieldsSettings />} />
          <Route path="resultados" element={<ResultsPage />} />
          <Route path="pagamento" element={<CheckoutPage />} />
          <Route path="muito-obrigado" element={<ThankYouPage />} />
          <Route path="perguntas-frequentes" element={<FaqPage />} />
          <Route path="termos-de-uso" element={<Terms />} />
          <Route path="minhas-consultas" element={<SearchesPage />} />
          <Route path="contato" element={<ContactPage />} />
          <Route path="politica-de-privacidade" element={<PrivacyPage />} />
          <Route path="minhas-consultas" element={<SearchesPage />} />
          <Route path="admin" element={<LoginPage />} />
          <Route path="esqueci-minha-senha" element={<ForgotPage />} />
          <Route path="alterar-senha/:token" element={<ResetPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/app" element={<PrivateLayout />}>
          <Route index element={<OrdersPage />} />
          <Route path="cupons" element={<CouponsPage />} />
          <Route path="contatos" element={<ContactsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
          <Route path="paginas" element={<PagesPage />} />
          <Route path="paginas/:pageId" element={<PageEditorPage />} />
          <Route path="configuracoes" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
