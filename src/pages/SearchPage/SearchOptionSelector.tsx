import { DEFAULT_PAGE_PADDING } from '@/constants/style';
import { Box, Select, SelectProps } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SearchOptionSelectorProps extends SelectProps {
  setSearchOption: Dispatch<SetStateAction<string>>;
  SELETE_OPTION: string[];
}

const SearchOptionSelector = ({
  SELETE_OPTION = [],
  setSearchOption,
  ...props
}: SearchOptionSelectorProps) => {
  return (
    <Box p={`0 ${DEFAULT_PAGE_PADDING}`}>
      <Select
        placeholder="검색 조건"
        onChange={(e) => setSearchOption(e.target.value)}
        {...props}
      >
        {SELETE_OPTION.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </Select>
    </Box>
  );
};

export default SearchOptionSelector;
