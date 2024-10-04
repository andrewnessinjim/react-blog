import React from 'react';
import { Loader } from 'react-feather';
import { Wrapper } from './Spinner.styled';

const Spinner = ({ color="inherit", size="24" }) => {
  return (
    <Wrapper >
      <Loader color={color} size={size} />
    </Wrapper>
  );
};

export default Spinner;
