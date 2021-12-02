import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface UserProps {}

const StyledUser = styled.div`
  color: pink;
`;

export function User(props: UserProps) {
  return (
    <StyledUser>
      <h1>Welcome to User!</h1>
    </StyledUser>
  );
}

export default User;
