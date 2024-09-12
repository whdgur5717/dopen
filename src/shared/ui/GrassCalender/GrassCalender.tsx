import { Grid, GridProps, HStack, Icon, Text, Tooltip } from '@chakra-ui/react';
import { useMemo } from 'react';
import { MdCalendarMonth } from 'react-icons/md';
import { calcGrassPercentage } from 'shared/utils/calcGrassPercentage';

import GrassCell from './GrassCell';

const getLastDate = (today: Date) => {
  return new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
};

const LOCALE_OPTION = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
} as const;
interface GrassProps extends GridProps {
  data: { time: string; createdAt: string }[]; // 추후 TimerPost[]로 변경필요
}

const GrassCalender = ({ data = [] }: GrassProps) => {
  const today = new Date();
  const lastDay = getLastDate(today);
  //회고 게시글을 이번 달 기준으로 filter해서 가져온다. 글 존재하면 percentage계산해서 배열화하면 됨
  const thisMonthTimerData = useMemo(() => {
    const tempData = Array(lastDay).fill(0);
    data.forEach(({ time, createdAt }) => {
      const [hours] = time.split(':').map(Number);
      const [createdYear, createdMonth, createdDay] = new Date(createdAt)
        .toLocaleDateString('en-CA', LOCALE_OPTION)
        .split('-');

      tempData[+createdDay - 1] = {
        percentage: calcGrassPercentage(hours),
        time: `${createdYear}년 ${createdMonth}월 ${createdDay}일`,
      };
    });

    return tempData;
  }, [data, lastDay]);

  const [year, month] = today
    .toLocaleDateString('en-CA', LOCALE_OPTION)
    .split('-');

  return (
    <>
      <HStack justify="center" mb="10px">
        <Text
          fontSize="1.8rem"
          fontWeight="bold"
        >{`${year}년 ${month}월`}</Text>
        <Icon as={MdCalendarMonth} boxSize="20px" />
      </HStack>
      <Grid
        templateColumns="repeat(7, fit-content(20px))"
        gap="5px"
        justifyContent="center"
      >
        {thisMonthTimerData.map(({ percentage, time }, index) => (
          <Tooltip key={`day-${index}`} label={time ? time : '회고 기록 없음'}>
            <GrassCell percentage={percentage} borderRadius="2px" />
          </Tooltip>
        ))}
      </Grid>
    </>
  );
};

export default GrassCalender;
