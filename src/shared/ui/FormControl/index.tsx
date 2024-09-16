import styled from '@emotion/styled';

export const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #f88585;
  font-size: 16px;
  font-weight: bold;
  color: white;
  border-radius: 50px;
`;

export const Form = styled.form`
  & ul {
    margin-bottom: 32px;
    & > li:not(:last-child) {
      margin-bottom: 18px;
    }

    & > li {
      text-align: left;
      list-style: none;

      & > span {
        display: inline-block;
        margin-top: 10px;
        font-size: 12px;
        color: #f88585;
      }
    }
  }
`;

export const Input = styled.input<{ bgColor: string }>`
  width: 100%;
  height: 50px;
  font-size: 14px;
  border-radius: 5px;
  background-color: ${({ bgColor }) => bgColor};
  padding-left: 15px;
`;
