import React from 'react';

import { LoginCont, NoUserWrap } from '../../pageStyles/Profile/style'
import Button from '../Button'
import { Theme } from '../../styles/theme'

const LoginModal = ({ }) => {
  return (
    <NoUserWrap>
    <LoginCont>
      <h1>Please login or sign up to Replay to view the profile page.</h1>
      <Button text={'login/sign up'}
        height={'51px'}
        color={`${Theme.colors.orange}`}
        textColor={`${Theme.colors.white}`}
        onClick={() => { router.push('/Register') }}
      />
    </LoginCont>
    </NoUserWrap>
  );
}

export default LoginModal;