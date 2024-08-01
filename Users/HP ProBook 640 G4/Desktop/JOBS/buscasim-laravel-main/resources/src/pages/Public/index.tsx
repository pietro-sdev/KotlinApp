import { lazy } from 'react';
import { Render } from "@measured/puck";
import { PageLoader } from '@/components/__commons';
import Config ,{ UserConfig } from '@/pages/Private/Pages/Editor/Config';
import { usePageBySlug } from '@/core/services/pages';
import { useParams } from 'react-router-dom';
const NotFoundPage = lazy(() => import('@/pages/Error/NotFound'));
import { GetIconsByName as _icon  } from '@/pages/Private/Pages/Editor/Config/Fields/Icons';


export function PuckRender() {
    const { slug } = useParams();
    const { data, isLoading } = usePageBySlug(slug)

    if (isLoading) {
      return <PageLoader />;
    }

    if(!data || !data?.content){
      return <NotFoundPage />;
    }


    return <Render<UserConfig> config={Config} data={JSON.parse(data.content)} />;
}

