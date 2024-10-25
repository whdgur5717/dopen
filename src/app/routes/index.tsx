import { createFileRoute } from '@tanstack/react-router';
import MainPage from 'pages/MainPage';
import supabaseClient from 'shared/supabase';

export const Route = createFileRoute('/')({
  loader: async () => {
    await supabaseClient.auth.getUser();
  },
  component: () => <MainPage />,
});
