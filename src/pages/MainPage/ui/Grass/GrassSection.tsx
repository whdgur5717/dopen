import { useQuery } from '@tanstack/react-query';
import { getDaysInMonth, isAfter, parseISO, startOfMonth } from 'date-fns';
import { timerQueries } from 'entities/timer/api/timer.queries';
import { Grass } from 'shared/ui/Grass';

const GrassSection = ({ id }: { id: string | undefined }) => {
  const { data } = useQuery({
    ...timerQueries.getUserTimerList(id!),
    enabled: !!id,
    select: (data) => {
      return data?.map((v) => {
        const iso = parseISO(v.created_at);
        return {
          date: iso,
          suc: v.duration,
        };
      });
    },
  });
  return (
    <div style={{ width: '200px' }}>
      <Grass>
        {(currentDate) => {
          const filtered = data
            ?.filter(
              (timer) => isAfter(timer.date, startOfMonth(currentDate)), //기준이 되는 달에 진행한 건지 필터링
            )
            .map(({ date, suc }) => {
              return {
                day: date.getDate(),
                suc,
              };
            });

          const days = Array.from(
            Array(getDaysInMonth(currentDate)),
            (_, i) => i + 1,
          );
          return days.map((day) => {
            const matchingRecord = filtered?.find(
              (record) => record.day === day,
            );
            const opacity = matchingRecord ? 1 : 0.2;
            return <Grass.Cell key={day} opacity={opacity}></Grass.Cell>;
          });
        }}
      </Grass>
    </div>
  );
};

export default GrassSection;
