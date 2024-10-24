import { useMutation } from '@tanstack/react-query';
import { client } from 'shared/supabase';

import type { TimerStampType } from '../model';

export const useTimerStampMutation = () => {
  return useMutation({
    mutationFn: (data: Omit<TimerStampType, 'id'>) =>
      client.timerStamp.createTimerStamp(data),
  });
};
