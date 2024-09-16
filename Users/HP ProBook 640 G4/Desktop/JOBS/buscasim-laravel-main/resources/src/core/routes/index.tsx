import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PrivateLayout, PublicLayout } from '@/layouts';
import FieldsSettings from '@/components/Admin/FieldsSettings';
import PuckEditor from '@/pages/Private/Pages/Editor';
import { PuckRender } from '@/pages/Public';


const CheckoutPage = lazy(() => import('@/pages/Public/Checkout'));
const LoginPage = lazy(() => import('@/pages/Public/Login'));
const ForgotPage = lazy(() => import('@/pages/Public/Forgot'));
const ResetPage = lazy(() => import('@/pages/Public/Reset'));
const SearchesPage = lazy(() => import('@/pages/Public/Searches'));

const OrdersPage = lazy(() => import('@/pages/Private/Orders'));
const CouponsPage = lazy(() => import('@/pages/Private/Coupons'));
const SettingsPage = lazy(() => import('@/pages/Private/Settings'));
const UsersPage = lazy(() => import('@/pages/Private/Users'));
const ContactsPage = lazy(() => import('@/pages/Private/Contacts'));
const PagesPage = lazy(() => import('@/pages/Private/Pages'));

const NotFoundPage = lazy(() => import('@/pages/Error/NotFound'));

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<PublicLayout />}>
          <Route path="/:slug?" element={<PuckRender />} />
          <Route path="fields" element={<FieldsSettings />} />

          <Route path="pagamento" element={<CheckoutPage />} />
          <Route path="minhas-consultas" element={<SearchesPage />} />

          <Route path="admin" element={<LoginPage />} />
          <Route path="esqueci-minha-senha" element={<ForgotPage />} />
          <Route path="alterar-senha/:token" element={<ResetPage />} />
        </Route>
        <Route path="/app" element={<PrivateLayout />}>
          <Route index element={<OrdersPage />} />
          <Route path="cupons" element={<CouponsPage />} />
          <Route path="contatos" element={<ContactsPage />} />
          <Route path="usuarios" element={<UsersPage />} />
          <Route path='paginas'>
            <Route index element={<PagesPage />} />
            <Route path="edit/:pageId" element={<PuckEditor />} />
          </Route>
          <Route path="configuracoes" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
